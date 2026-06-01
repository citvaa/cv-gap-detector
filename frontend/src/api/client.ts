import type { AnalysisRequest, AnalysisResponse } from '../types/api'

// Sve ide kroz /api koji Vite proxy preusmerava na http://localhost:8080
// (vidi vite.config.ts).

export async function analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `Analiza nije uspela (HTTP ${res.status}). ${text || 'Da li je backend pokrenut na :8080?'}`,
    )
  }
  return (await res.json()) as AnalysisResponse
}

// Pomocni poziv - nije neophodan, ali korisno za "health check" demo endpoint-a.
export async function fetchDemoResult(): Promise<AnalysisResponse> {
  const res = await fetch('/api/demo')
  if (!res.ok) {
    throw new Error(`/api/demo nije dostupan (HTTP ${res.status}).`)
  }
  return (await res.json()) as AnalysisResponse
}
