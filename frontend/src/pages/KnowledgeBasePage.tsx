import { useMemo, useState } from 'react'
import { EXPERTISE_LEVELS } from '../types/api'
import {
  EXPERIENCE_MAPPING,
  KNOWLEDGE_BASE,
  SUPPORTED_TECHNOLOGIES,
} from '../data/knowledgeBase'

export default function KnowledgeBasePage() {
  const [copied, setCopied] = useState(false)

  const json = useMemo(() => JSON.stringify(KNOWLEDGE_BASE, null, 2), [])

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-900">Baza znanja</h1>

      <div className="rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-4 py-3 text-sm">
        <strong>Napomena:</strong> baza znanja je <em>hardkodirana u backendu</em>{' '}
        (<code>service/.../service/KnowledgeBaseSeeder.java</code>). Ovaj prikaz je
        samo read-only ogledalo te konfiguracije. Izmene ovde ne uticu na backend.
      </div>

      <section className="bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="font-semibold text-slate-800 mb-2">
          Mapiranje godina iskustva u nivo
        </h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {EXPERIENCE_MAPPING.map((m) => (
            <span
              key={m.level}
              className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
            >
              {m.min === m.max ? `${m.min}` : `${m.min}-${m.max}`} god:{' '}
              <strong>{m.level}</strong>
            </span>
          ))}
        </div>
      </section>

      {SUPPORTED_TECHNOLOGIES.map((tech) => (
        <section
          key={tech}
          className="bg-white rounded-lg border border-slate-200 p-4"
        >
          <h2 className="font-semibold text-slate-800 mb-3">{tech}</h2>
          <div className="space-y-2">
            {EXPERTISE_LEVELS.map((lvl) => (
              <div
                key={lvl}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start"
              >
                <div className="sm:col-span-2 text-sm font-semibold text-slate-600">
                  {lvl}
                </div>
                <div className="sm:col-span-10 flex flex-wrap gap-1.5">
                  {KNOWLEDGE_BASE[tech][lvl].map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-full text-xs bg-indigo-50 text-indigo-800 border border-indigo-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
        <div className="flex items-center">
          <h2 className="font-semibold text-slate-800">
            JSON pregled (pomoc developeru)
          </h2>
          <button
            type="button"
            onClick={copyJson}
            className="ml-auto px-3 py-1.5 rounded-md border border-slate-300 bg-white text-sm font-medium hover:bg-slate-50"
          >
            {copied ? 'Kopirano ✓' : 'Kopiraj JSON'}
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Korisno kao referenca pri rucnoj izmeni <code>KnowledgeBaseSeeder.java</code>.
        </p>
        <pre className="text-xs bg-slate-900 text-slate-100 rounded-md p-3 overflow-auto max-h-96">
          {json}
        </pre>
      </section>
    </div>
  )
}
