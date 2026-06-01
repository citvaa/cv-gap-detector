// TypeScript tipovi koji 1:1 odgovaraju backend DTO-ovima
// (service/.../dto/AnalysisRequest.java, AnalysisResponse.java i model/.../facts/*).

export type ExpertiseLevel =
  | 'BEGINNER'
  | 'JUNIOR'
  | 'MID'
  | 'SENIOR'
  | 'EXPERT'

export const EXPERTISE_LEVELS: ExpertiseLevel[] = [
  'BEGINNER',
  'JUNIOR',
  'MID',
  'SENIOR',
  'EXPERT',
]

// rank kao u model/cv/ExpertiseLevel.java (1..5) - koristi se za vizuelno poredjenje
export const LEVEL_RANK: Record<ExpertiseLevel, number> = {
  BEGINNER: 1,
  JUNIOR: 2,
  MID: 3,
  SENIOR: 4,
  EXPERT: 5,
}

export type GapType = 'OVERSTATED' | 'MATCHED' | 'UNDERSTATED'

export type GapSeverity = 'NONE' | 'MINOR' | 'MODERATE' | 'MAJOR' | 'CRITICAL'

export type OverallClassification =
  | 'RELIABLE_CV'
  | 'MINOR_INCONSISTENCIES'
  | 'SIGNIFICANT_GAPS'
  | 'UNRELIABLE_CV'

// ---- Request strane (AnalysisRequest) ----

export interface CVTechnology {
  candidateId: string
  technology: string
  claimedLevel: ExpertiseLevel
  yearsOfExperience: number
}

export interface ConceptMentioned {
  candidateId: string
  technology: string
  concept: string
  difficultyWeight: number // 1-5
}

export interface QuestionScore {
  candidateId: string
  technology: string
  questionId: string
  score: number // 0-100
}

export interface AnalysisRequest {
  candidateId: string
  cv: CVTechnology[]
  mentionedConcepts: ConceptMentioned[]
  questionScores: QuestionScore[]
}

// ---- Response strane (AnalysisResponse) ----

export interface Gap {
  candidateId: string
  technology: string
  type: GapType
  severity: GapSeverity
  claimedLevel: ExpertiseLevel | null
  estimatedLevel: ExpertiseLevel | null
  // Backend ih serijalizuje kao Set<String> -> JSON niz
  missingConcepts: string[]
  bonusConcepts: string[]
}

export interface OverallAssessment {
  candidateId: string
  classification: OverallClassification
}

export interface MentorRecommendation {
  candidateId: string
  problematicTechnologies: string[]
  // Map<String, Set<String>> -> objekat tech -> niz koncepata
  conceptsToVerify: Record<string, string[]>
  summary: string
}

export interface AnalysisResponse {
  candidateId: string
  gaps: Gap[]
  overallAssessment: OverallAssessment | null
  mentorRecommendation: MentorRecommendation | null
}
