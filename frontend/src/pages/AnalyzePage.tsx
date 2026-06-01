import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  AnalysisRequest,
  ConceptMentioned,
  CVTechnology,
  ExpertiseLevel,
  QuestionScore,
} from '../types/api'
import { EXPERTISE_LEVELS } from '../types/api'
import { PRESETS, clonePreset } from '../data/presets'
import {
  SUPPORTED_TECHNOLOGIES,
  conceptsForTechnology,
} from '../data/knowledgeBase'
import { analyze } from '../api/client'
import { addEntry } from '../storage/history'

const emptyRequest = (): AnalysisRequest => ({
  candidateId: '',
  cv: [],
  mentionedConcepts: [],
  questionScores: [],
})

const newCvRow = (): CVTechnology => ({
  candidateId: '',
  technology: '',
  claimedLevel: 'JUNIOR',
  yearsOfExperience: 0,
})

export default function AnalyzePage() {
  const navigate = useNavigate()
  const [req, setReq] = useState<AnalysisRequest>(emptyRequest)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cvTechs = useMemo(
    () =>
      Array.from(
        new Set(
          req.cv
            .map((c) => c.technology.trim())
            .filter((t) => t.length > 0),
        ),
      ),
    [req.cv],
  )

  useEffect(() => {
    setReq((prev) => {
      const techSet = new Set(
        prev.cv.map((c) => c.technology.trim()).filter(Boolean),
      )
      const mentioned = prev.mentionedConcepts.filter((m) =>
        techSet.has(m.technology),
      )
      const scores = prev.questionScores.filter((q) => techSet.has(q.technology))
      if (
        mentioned.length === prev.mentionedConcepts.length &&
        scores.length === prev.questionScores.length
      ) {
        return prev
      }
      return { ...prev, mentionedConcepts: mentioned, questionScores: scores }
    })
  }, [req.cv])

  const addCv = () => setReq((p) => ({ ...p, cv: [...p.cv, newCvRow()] }))
  const removeCv = (idx: number) =>
    setReq((p) => ({ ...p, cv: p.cv.filter((_, i) => i !== idx) }))
  const updateCv = (idx: number, patch: Partial<CVTechnology>) =>
    setReq((p) => ({
      ...p,
      cv: p.cv.map((c, i) => (i === idx ? { ...c, ...patch } : c)),
    }))

  const addConcept = (tech: string) =>
    setReq((p) => ({
      ...p,
      mentionedConcepts: [
        ...p.mentionedConcepts,
        { candidateId: '', technology: tech, concept: '', difficultyWeight: 1 },
      ],
    }))
  const updateConcept = (globalIdx: number, patch: Partial<ConceptMentioned>) =>
    setReq((p) => ({
      ...p,
      mentionedConcepts: p.mentionedConcepts.map((m, i) =>
        i === globalIdx ? { ...m, ...patch } : m,
      ),
    }))
  const removeConcept = (globalIdx: number) =>
    setReq((p) => ({
      ...p,
      mentionedConcepts: p.mentionedConcepts.filter((_, i) => i !== globalIdx),
    }))

  const addScore = (tech: string) =>
    setReq((p) => ({
      ...p,
      questionScores: [
        ...p.questionScores,
        {
          candidateId: '',
          technology: tech,
          questionId: `q${p.questionScores.filter((q) => q.technology === tech).length + 1}`,
          score: 0,
        },
      ],
    }))
  const updateScore = (globalIdx: number, patch: Partial<QuestionScore>) =>
    setReq((p) => ({
      ...p,
      questionScores: p.questionScores.map((q, i) =>
        i === globalIdx ? { ...q, ...patch } : q,
      ),
    }))
  const removeScore = (globalIdx: number) =>
    setReq((p) => ({
      ...p,
      questionScores: p.questionScores.filter((_, i) => i !== globalIdx),
    }))

  const prefillPreset = (key: string) => {
    setError(null)
    setReq(clonePreset(key))
  }

  const onAnalyze = async () => {
    setError(null)
    const candidateId = req.candidateId.trim()
    if (!candidateId) {
      setError('Unesi candidateId.')
      return
    }
    if (req.cv.length === 0 || cvTechs.length === 0) {
      setError('Dodaj bar jednu tehnologiju u CV.')
      return
    }
    const payload: AnalysisRequest = {
      candidateId,
      cv: req.cv.map((c) => ({
        ...c,
        candidateId,
        technology: c.technology.trim(),
        yearsOfExperience: Number(c.yearsOfExperience) || 0,
      })),
      mentionedConcepts: req.mentionedConcepts.map((m) => ({
        ...m,
        candidateId,
        concept: m.concept.trim(),
        difficultyWeight: Number(m.difficultyWeight) || 1,
      })),
      questionScores: req.questionScores.map((q) => ({
        ...q,
        candidateId,
        questionId: q.questionId.trim(),
        score: Number(q.score) || 0,
      })),
    }

    try {
      setSubmitting(true)
      const response = await analyze(payload)
      const entry = addEntry(payload, response)
      navigate(`/results/${entry.id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-slate-900">Analiza kandidata</h1>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={submitting}
          className="ml-auto px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-50"
        >
          {submitting ? 'Analiza u toku...' : 'Analyze'}
        </button>
      </div>

      <section className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
        <div className="text-sm font-medium text-slate-700">Ucitaj primer:</div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => prefillPreset(p.key)}
              title={p.expected}
              className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-medium hover:bg-slate-50 text-left"
            >
              <span className="block text-slate-900">{p.label}</span>
              <span className="block text-xs text-slate-400">{p.expected}</span>
            </button>
          ))}
        </div>
      </section>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 text-red-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <section className="bg-white rounded-lg border border-slate-200 p-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          candidateId
        </label>
        <input
          type="text"
          value={req.candidateId}
          onChange={(e) => setReq((p) => ({ ...p, candidateId: e.target.value }))}
          placeholder="npr. candidate-001"
          className="w-full max-w-sm rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </section>

      <section className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
        <div className="flex items-center">
          <h2 className="font-semibold text-slate-800">CV - navedene tehnologije</h2>
          <button
            type="button"
            onClick={addCv}
            className="ml-auto px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-sm font-medium"
          >
            + Dodaj tehnologiju
          </button>
        </div>

        {req.cv.length === 0 && (
          <p className="text-sm text-slate-400">Jos nema tehnologija.</p>
        )}

        <datalist id="known-technologies">
          {SUPPORTED_TECHNOLOGIES.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>

        <div className="space-y-2">
          {req.cv.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
            >
              <input
                type="text"
                list="known-technologies"
                value={row.technology}
                onChange={(e) => updateCv(idx, { technology: e.target.value })}
                placeholder="Tehnologija (React, PostgreSQL, Java...)"
                className="sm:col-span-5 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <select
                value={row.claimedLevel}
                onChange={(e) =>
                  updateCv(idx, { claimedLevel: e.target.value as ExpertiseLevel })
                }
                className="sm:col-span-3 rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
              >
                {EXPERTISE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                value={row.yearsOfExperience}
                onChange={(e) =>
                  updateCv(idx, { yearsOfExperience: Number(e.target.value) })
                }
                placeholder="godine"
                className="sm:col-span-3 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeCv(idx)}
                className="sm:col-span-1 px-2 py-2 rounded-md text-red-600 hover:bg-red-50 text-sm font-medium"
                title="Ukloni"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
        <h2 className="font-semibold text-slate-800">
          Spomenuti koncepti (po tehnologiji iz CV-a)
        </h2>
        {cvTechs.length === 0 ? (
          <p className="text-sm text-slate-400">
            Prvo dodaj tehnologiju u CV da bi mogao uneti koncepte.
          </p>
        ) : (
          cvTechs.map((tech) => (
            <TechGroup
              key={tech}
              tech={tech}
              onAdd={() => addConcept(tech)}
              addLabel="+ Dodaj koncept"
            >
              <datalist id={`concepts-${tech}`}>
                {conceptsForTechnology(tech).map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {req.mentionedConcepts.map((m, gi) =>
                m.technology !== tech ? null : (
                  <div
                    key={gi}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      list={`concepts-${tech}`}
                      value={m.concept}
                      onChange={(e) =>
                        updateConcept(gi, { concept: e.target.value })
                      }
                      placeholder="Koncept (npr. useState)"
                      className="sm:col-span-8 rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                    <select
                      value={m.difficultyWeight}
                      onChange={(e) =>
                        updateConcept(gi, {
                          difficultyWeight: Number(e.target.value),
                        })
                      }
                      className="sm:col-span-3 rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
                      title="Tezina (1-5)"
                    >
                      {[1, 2, 3, 4, 5].map((w) => (
                        <option key={w} value={w}>
                          tezina {w}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeConcept(gi)}
                      className="sm:col-span-1 px-2 py-2 rounded-md text-red-600 hover:bg-red-50 text-sm"
                      title="Ukloni"
                    >
                      ✕
                    </button>
                  </div>
                ),
              )}
            </TechGroup>
          ))
        )}
      </section>

      <section className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
        <h2 className="font-semibold text-slate-800">
          Rezultati pitanja (po tehnologiji iz CV-a)
        </h2>
        {cvTechs.length === 0 ? (
          <p className="text-sm text-slate-400">
            Prvo dodaj tehnologiju u CV da bi mogao uneti rezultate pitanja.
          </p>
        ) : (
          cvTechs.map((tech) => (
            <TechGroup
              key={tech}
              tech={tech}
              onAdd={() => addScore(tech)}
              addLabel="+ Dodaj pitanje"
            >
              {req.questionScores.map((q, gi) =>
                q.technology !== tech ? null : (
                  <div
                    key={gi}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={q.questionId}
                      onChange={(e) =>
                        updateScore(gi, { questionId: e.target.value })
                      }
                      placeholder="questionId (npr. q1)"
                      className="sm:col-span-7 rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={q.score}
                      onChange={(e) =>
                        updateScore(gi, { score: Number(e.target.value) })
                      }
                      placeholder="0-100"
                      className="sm:col-span-4 rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeScore(gi)}
                      className="sm:col-span-1 px-2 py-2 rounded-md text-red-600 hover:bg-red-50 text-sm"
                      title="Ukloni"
                    >
                      ✕
                    </button>
                  </div>
                ),
              )}
            </TechGroup>
          ))
        )}
      </section>
    </div>
  )
}

function TechGroup({
  tech,
  onAdd,
  addLabel,
  children,
}: {
  tech: string
  onAdd: () => void
  addLabel: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-slate-200 p-3 space-y-2 bg-slate-50">
      <div className="flex items-center">
        <span className="text-sm font-semibold text-slate-700">{tech}</span>
        <button
          type="button"
          onClick={onAdd}
          className="ml-auto px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-xs font-medium"
        >
          {addLabel}
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
