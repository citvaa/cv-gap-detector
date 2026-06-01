import type { AnalysisRequest, AnalysisResponse, OverallClassification } from '../types/api'

const STORAGE_KEY = 'cv-gap-detector.history'

export interface HistoryEntry {
  id: string
  candidateId: string
  analyzedAt: string
  classification: OverallClassification | null
  request: AnalysisRequest
  response: AnalysisResponse
}

function readAll(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : []
  } catch {
    return []
  }
}

function writeAll(entries: HistoryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function getHistory(): HistoryEntry[] {
  return readAll().sort((a, b) => b.analyzedAt.localeCompare(a.analyzedAt))
}

export function getEntry(id: string): HistoryEntry | undefined {
  return readAll().find((e) => e.id === id)
}

export function addEntry(
  request: AnalysisRequest,
  response: AnalysisResponse,
): HistoryEntry {
  const entry: HistoryEntry = {
    id: generateId(),
    candidateId: response.candidateId || request.candidateId,
    analyzedAt: new Date().toISOString(),
    classification: response.overallAssessment?.classification ?? null,
    request,
    response,
  }
  const all = readAll()
  all.push(entry)
  writeAll(all)
  return entry
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY)
}
