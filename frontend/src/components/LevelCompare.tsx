import type { ExpertiseLevel } from '../types/api'
import { EXPERTISE_LEVELS, LEVEL_RANK } from '../types/api'

// Vizuelno poredjenje claimed vs estimated nivoa (dve "lestvice" jedna pored druge).
function LevelBar({
  label,
  level,
  accent,
}: {
  label: string
  level: ExpertiseLevel | null
  accent: string
}) {
  const rank = level ? LEVEL_RANK[level] : 0
  return (
    <div className="flex-1">
      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </div>
      <div className="font-semibold text-slate-800 mb-1">{level ?? '-'}</div>
      <div className="flex gap-1">
        {EXPERTISE_LEVELS.map((lvl) => (
          <div
            key={lvl}
            title={lvl}
            className={`h-2 flex-1 rounded-sm ${
              LEVEL_RANK[lvl] <= rank ? accent : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function LevelCompare({
  claimedLevel,
  estimatedLevel,
}: {
  claimedLevel: ExpertiseLevel | null
  estimatedLevel: ExpertiseLevel | null
}) {
  return (
    <div className="flex gap-6 items-end">
      <LevelBar label="Claimed" level={claimedLevel} accent="bg-slate-700" />
      <div className="text-slate-400 pb-1 font-semibold">vs</div>
      <LevelBar
        label="Estimated"
        level={estimatedLevel}
        accent="bg-indigo-500"
      />
    </div>
  )
}
