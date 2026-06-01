import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { getEntry } from '../storage/history'
import ResultsView from '../components/ResultsView'

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>()
  // Rerender iskljucivo iz localStorage, bez novog API poziva.
  const entry = useMemo(() => (id ? getEntry(id) : undefined), [id])

  if (!entry) {
    return (
      <div className="space-y-4">
        <p className="text-slate-600">
          Rezultat nije pronadjen u istoriji.
        </p>
        <Link to="/" className="text-indigo-600 hover:underline text-sm">
          Nazad na analizu
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm">
        <Link to="/dashboard" className="text-indigo-600 hover:underline">
          Istorija
        </Link>
        <span className="text-slate-400">
          analizirano: {new Date(entry.analyzedAt).toLocaleString('sr-RS')}
        </span>
        <Link to="/" className="ml-auto text-indigo-600 hover:underline">
          Nova analiza
        </Link>
      </div>
      <ResultsView response={entry.response} />
    </div>
  )
}
