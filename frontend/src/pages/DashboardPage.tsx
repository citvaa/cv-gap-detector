import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearHistory, getHistory } from '../storage/history'
import type { HistoryEntry } from '../storage/history'
import { CLASSIFICATION_STYLE } from '../ui/styles'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState<HistoryEntry[]>(() => getHistory())

  const onClear = () => {
    clearHistory()
    setEntries([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          Mentor dashboard - istorija
        </h1>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="ml-auto px-3 py-2 rounded-md border border-red-300 text-red-700 bg-white text-sm font-medium hover:bg-red-50"
          >
            Clear history
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-500">
          <p>Jos nema analiziranih kandidata.</p>
          <Link
            to="/"
            className="inline-block mt-2 text-indigo-600 hover:underline text-sm"
          >
            Pokreni prvu analizu
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
          {entries.map((e) => {
            const cstyle = e.classification
              ? CLASSIFICATION_STYLE[e.classification]
              : null
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => navigate(`/results/${e.id}`)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 truncate">
                    {e.candidateId}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(e.analyzedAt).toLocaleString('sr-RS')}
                  </div>
                </div>
                {e.classification && cstyle && (
                  <span
                    className={`ml-auto px-2.5 py-1 rounded-full text-xs font-bold ${cstyle.chip}`}
                  >
                    {e.classification}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
