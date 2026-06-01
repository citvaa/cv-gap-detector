import type { AnalysisRequest } from '../types/api'

export interface Preset {
  key: string
  label: string
  expected: string
  request: AnalysisRequest
}

const EXAMPLE: AnalysisRequest = {
  candidateId: 'candidate-001',
  cv: [
    { candidateId: 'candidate-001', technology: 'React', claimedLevel: 'EXPERT', yearsOfExperience: 5 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', claimedLevel: 'MID', yearsOfExperience: 2 },
  ],
  mentionedConcepts: [
    { candidateId: 'candidate-001', technology: 'React', concept: 'JSX', difficultyWeight: 1 },
    { candidateId: 'candidate-001', technology: 'React', concept: 'useState', difficultyWeight: 2 },
    { candidateId: 'candidate-001', technology: 'React', concept: 'props', difficultyWeight: 1 },
    { candidateId: 'candidate-001', technology: 'React', concept: 'components', difficultyWeight: 1 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'SELECT', difficultyWeight: 1 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'JOIN', difficultyWeight: 2 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'WHERE', difficultyWeight: 1 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'GROUP BY', difficultyWeight: 2 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'INDEX', difficultyWeight: 3 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'subqueries', difficultyWeight: 3 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'EXPLAIN', difficultyWeight: 4 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'transactions', difficultyWeight: 4 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', concept: 'ACID', difficultyWeight: 4 },
  ],
  questionScores: [
    { candidateId: 'candidate-001', technology: 'React', questionId: 'q1', score: 40 },
    { candidateId: 'candidate-001', technology: 'React', questionId: 'q2', score: 30 },
    { candidateId: 'candidate-001', technology: 'React', questionId: 'q3', score: 35 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', questionId: 'q1', score: 85 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', questionId: 'q2', score: 80 },
    { candidateId: 'candidate-001', technology: 'PostgreSQL', questionId: 'q3', score: 90 },
  ],
}

const RELIABLE: AnalysisRequest = {
  candidateId: 'candidate-reliable',
  cv: [
    { candidateId: 'candidate-reliable', technology: 'React', claimedLevel: 'MID', yearsOfExperience: 3 },
  ],
  mentionedConcepts: [
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'JSX', difficultyWeight: 1 },
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'components', difficultyWeight: 1 },
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'props', difficultyWeight: 1 },
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'useState', difficultyWeight: 2 },
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'useEffect', difficultyWeight: 2 },
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'events', difficultyWeight: 2 },
    { candidateId: 'candidate-reliable', technology: 'React', concept: 'lifecycle', difficultyWeight: 2 },
  ],
  questionScores: [
    { candidateId: 'candidate-reliable', technology: 'React', questionId: 'q1', score: 80 },
    { candidateId: 'candidate-reliable', technology: 'React', questionId: 'q2', score: 85 },
    { candidateId: 'candidate-reliable', technology: 'React', questionId: 'q3', score: 75 },
  ],
}

const UNRELIABLE: AnalysisRequest = {
  candidateId: 'candidate-unreliable',
  cv: [
    { candidateId: 'candidate-unreliable', technology: 'React', claimedLevel: 'EXPERT', yearsOfExperience: 6 },
    { candidateId: 'candidate-unreliable', technology: 'PostgreSQL', claimedLevel: 'EXPERT', yearsOfExperience: 7 },
    { candidateId: 'candidate-unreliable', technology: 'Java', claimedLevel: 'EXPERT', yearsOfExperience: 8 },
  ],
  mentionedConcepts: [
    { candidateId: 'candidate-unreliable', technology: 'React', concept: 'JSX', difficultyWeight: 1 },
    { candidateId: 'candidate-unreliable', technology: 'React', concept: 'components', difficultyWeight: 1 },
    { candidateId: 'candidate-unreliable', technology: 'PostgreSQL', concept: 'SELECT', difficultyWeight: 1 },
    { candidateId: 'candidate-unreliable', technology: 'PostgreSQL', concept: 'INSERT', difficultyWeight: 1 },
    { candidateId: 'candidate-unreliable', technology: 'Java', concept: 'classes', difficultyWeight: 1 },
    { candidateId: 'candidate-unreliable', technology: 'Java', concept: 'methods', difficultyWeight: 1 },
  ],
  questionScores: [
    { candidateId: 'candidate-unreliable', technology: 'React', questionId: 'q1', score: 25 },
    { candidateId: 'candidate-unreliable', technology: 'React', questionId: 'q2', score: 30 },
    { candidateId: 'candidate-unreliable', technology: 'PostgreSQL', questionId: 'q1', score: 20 },
    { candidateId: 'candidate-unreliable', technology: 'PostgreSQL', questionId: 'q2', score: 35 },
    { candidateId: 'candidate-unreliable', technology: 'Java', questionId: 'q1', score: 30 },
    { candidateId: 'candidate-unreliable', technology: 'Java', questionId: 'q2', score: 25 },
  ],
}

export const PRESETS: Preset[] = [
  {
    key: 'example',
    label: 'Primer iz proposal-a',
    expected: 'Znacajni nedostaci (React precenjen, PostgreSQL potcenjen)',
    request: EXAMPLE,
  },
  {
    key: 'reliable',
    label: 'Pouzdan CV',
    expected: 'Pouzdan CV (prijavljen nivo odgovara znanju)',
    request: RELIABLE,
  },
  {
    key: 'unreliable',
    label: 'Nepouzdan CV',
    expected: 'Nepouzdan CV (sve EXPERT, slabi rezultati)',
    request: UNRELIABLE,
  },
]

export function clonePreset(key: string): AnalysisRequest {
  const preset = PRESETS.find((p) => p.key === key)
  const base = preset ? preset.request : EXAMPLE
  return JSON.parse(JSON.stringify(base)) as AnalysisRequest
}
