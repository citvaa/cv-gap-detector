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
  difficultyWeight: number
}

export interface QuestionScore {
  candidateId: string
  technology: string
  questionId: string
  score: number
}

export interface AnalysisRequest {
  candidateId: string
  cv: CVTechnology[]
  mentionedConcepts: ConceptMentioned[]
  questionScores: QuestionScore[]
}

export interface Gap {
  candidateId: string
  technology: string
  type: GapType
  severity: GapSeverity
  claimedLevel: ExpertiseLevel | null
  estimatedLevel: ExpertiseLevel | null
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
  conceptsToVerify: Record<string, string[]>
  summary: string
}

export interface AnalysisResponse {
  candidateId: string
  gaps: Gap[]
  overallAssessment: OverallAssessment | null
  mentorRecommendation: MentorRecommendation | null
}
