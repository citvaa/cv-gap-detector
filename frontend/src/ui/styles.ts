import type { GapSeverity, GapType, OverallClassification } from '../types/api'

// Centralizovane Tailwind klase za boje prema zahtevima iz zadatka.

export const CLASSIFICATION_STYLE: Record<
  OverallClassification,
  { label: string; card: string; text: string; chip: string }
> = {
  RELIABLE_CV: {
    label: 'Pouzdan CV',
    card: 'bg-green-50 border-green-300',
    text: 'text-green-800',
    chip: 'bg-green-600 text-white',
  },
  MINOR_INCONSISTENCIES: {
    label: 'Manje nedoslednosti',
    card: 'bg-yellow-50 border-yellow-300',
    text: 'text-yellow-800',
    chip: 'bg-yellow-500 text-white',
  },
  SIGNIFICANT_GAPS: {
    label: 'Znacajni nedostaci',
    card: 'bg-orange-50 border-orange-300',
    text: 'text-orange-800',
    chip: 'bg-orange-500 text-white',
  },
  UNRELIABLE_CV: {
    label: 'Nepouzdan CV',
    card: 'bg-red-50 border-red-300',
    text: 'text-red-800',
    chip: 'bg-red-600 text-white',
  },
}

export const GAP_TYPE_STYLE: Record<GapType, { label: string; chip: string }> = {
  OVERSTATED: { label: 'OVERSTATED', chip: 'bg-red-600 text-white' },
  MATCHED: { label: 'MATCHED', chip: 'bg-green-600 text-white' },
  UNDERSTATED: { label: 'UNDERSTATED', chip: 'bg-blue-600 text-white' },
}

export const SEVERITY_STYLE: Record<GapSeverity, string> = {
  NONE: 'bg-slate-200 text-slate-700',
  MINOR: 'bg-yellow-200 text-yellow-900',
  MODERATE: 'bg-amber-300 text-amber-900',
  MAJOR: 'bg-orange-400 text-white',
  CRITICAL: 'bg-red-600 text-white',
}
