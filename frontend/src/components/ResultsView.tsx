import type { AnalysisResponse, Gap } from '../types/api'
import {
  CLASSIFICATION_STYLE,
  GAP_TYPE_STYLE,
  SEVERITY_STYLE,
} from '../ui/styles'
import LevelCompare from './LevelCompare'

function Chip({ text, kind }: { text: string; kind: 'missing' | 'bonus' }) {
  const cls =
    kind === 'missing'
      ? 'bg-red-100 text-red-800 border border-red-200'
      : 'bg-blue-100 text-blue-800 border border-blue-200'
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${cls}`}>
      {text}
    </span>
  )
}

function GapCard({ gap }: { gap: Gap }) {
  const typeStyle = GAP_TYPE_STYLE[gap.type]
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-semibold text-slate-900 text-lg mr-1">
          {gap.technology}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeStyle.chip}`}
        >
          {typeStyle.label}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${SEVERITY_STYLE[gap.severity]}`}
        >
          {gap.severity}
        </span>
      </div>

      <LevelCompare
        claimedLevel={gap.claimedLevel}
        estimatedLevel={gap.estimatedLevel}
      />

      {gap.missingConcepts.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
            Missing concepts
          </div>
          <div className="flex flex-wrap gap-1.5">
            {gap.missingConcepts.map((c) => (
              <Chip key={c} text={c} kind="missing" />
            ))}
          </div>
        </div>
      )}

      {gap.bonusConcepts.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
            Bonus concepts
          </div>
          <div className="flex flex-wrap gap-1.5">
            {gap.bonusConcepts.map((c) => (
              <Chip key={c} text={c} kind="bonus" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ResultsView({
  response,
}: {
  response: AnalysisResponse
}) {
  const classification = response.overallAssessment?.classification ?? null
  const cstyle = classification ? CLASSIFICATION_STYLE[classification] : null
  const mentor = response.mentorRecommendation

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg border p-5 ${cstyle?.card ?? 'bg-white border-slate-200'}`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Kandidat
            </div>
            <div className="text-xl font-bold text-slate-900">
              {response.candidateId}
            </div>
          </div>
          {classification && cstyle && (
            <span
              className={`ml-auto px-3 py-1.5 rounded-full text-sm font-bold ${cstyle.chip}`}
            >
              {classification}
            </span>
          )}
        </div>
        {cstyle && (
          <p className={`mt-2 text-sm font-medium ${cstyle.text}`}>
            {cstyle.label}
          </p>
        )}
      </div>

      <div>
        <h2 className="font-semibold text-slate-800 mb-2">
          Gap analiza ({response.gaps.length})
        </h2>
        {response.gaps.length === 0 ? (
          <p className="text-sm text-slate-400">Nema gap-ova.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {response.gaps.map((g) => (
              <GapCard key={`${g.candidateId}-${g.technology}`} gap={g} />
            ))}
          </div>
        )}
      </div>

      {mentor && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
          <h2 className="font-semibold text-slate-800">
            Preporuka za mentora
          </h2>
          {mentor.summary && (
            <p className="text-sm text-slate-700">{mentor.summary}</p>
          )}

          {mentor.problematicTechnologies.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Problematicne tehnologije
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mentor.problematicTechnologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {Object.keys(mentor.conceptsToVerify).length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Koncepti za dodatnu proveru
              </div>
              {Object.entries(mentor.conceptsToVerify).map(([tech, concepts]) => (
                <div key={tech} className="text-sm">
                  <span className="font-semibold text-slate-700">{tech}:</span>{' '}
                  <span className="inline-flex flex-wrap gap-1.5 align-middle">
                    {concepts.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800 border border-red-200"
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
