# Klasni dijagram

## Pregled

Model je organizovan u 4 paketa:

- **`com.ftn.sbnz.model.cv`** — ulazni podaci iz CV-a
- **`com.ftn.sbnz.model.interview`** — ulazni podaci iz intervjua
- **`com.ftn.sbnz.model.kb`** — domenska baza znanja
- **`com.ftn.sbnz.model.facts`** — činjenice koje pravila kreiraju kroz lančanje

Sve klase imaju `candidateId` polje koje se koristi kao primarni način
povezivanja činjenica u Drools pravilima (`when` uslovi po `candidateId == $cId`).

## Dijagram

<div align="center">

```mermaid
classDiagram
    direction LR

    %% ============ ENUMI ============
    class ExpertiseLevel {
        <<enumeration>>
        BEGINNER
        JUNIOR
        MID
        SENIOR
        EXPERT
        +int rank
        +getRank() int
    }

    class GapType {
        <<enumeration>>
        OVERSTATED
        MATCHED
        UNDERSTATED
    }

    class GapSeverity {
        <<enumeration>>
        NONE
        MINOR
        MODERATE
        MAJOR
        CRITICAL
    }

    class OverallClassification {
        <<enumeration>>
        RELIABLE_CV
        MINOR_INCONSISTENCIES
        SIGNIFICANT_GAPS
        UNRELIABLE_CV
    }

    %% ============ ULAZ: CV ============
    class CVTechnology {
        +String candidateId
        +String technology
        +ExpertiseLevel claimedLevel
        +int yearsOfExperience
    }

    %% ============ ULAZ: INTERVIEW ============
    class ConceptMentioned {
        +String candidateId
        +String technology
        +String concept
        +int difficultyWeight
    }

    class QuestionScore {
        +String candidateId
        +String technology
        +String questionId
        +double score
    }

    %% ============ BAZA ZNANJA ============
    class TechnologyKnowledgeProfile {
        +String technology
        +ExpertiseLevel level
        +Set~String~ expectedConcepts
    }

    class ExperienceLevelMapping {
        +int minYears
        +int maxYears
        +ExpertiseLevel level
    }

    %% ============ NIVO 1 - generisane činjenice ============
    class ExpectedConcepts {
        +String candidateId
        +String technology
        +ExpertiseLevel level
        +Set~String~ conceptList
    }

    class DemonstratedConcepts {
        +String candidateId
        +String technology
        +Set~String~ conceptList
    }

    class ExperienceBasedLevel {
        +String candidateId
        +String technology
        +ExpertiseLevel level
    }

    %% ============ NIVO 2 - generisane činjenice ============
    class MissingConcepts {
        +String candidateId
        +String technology
        +Set~String~ missingList
        +int expectedSize
        +getMissingRatio() double
    }

    class BonusConcepts {
        +String candidateId
        +String technology
        +Set~String~ bonusList
    }

    class EstimatedLevel {
        +String candidateId
        +String technology
        +ExpertiseLevel level
        +int score
    }

    class AverageScore {
        +String candidateId
        +String technology
        +double avgScore
    }

    %% ============ NIVO 3 - generisane činjenice ============
    class Gap {
        +String candidateId
        +String technology
        +GapType type
        +GapSeverity severity
        +ExpertiseLevel claimedLevel
        +ExpertiseLevel estimatedLevel
        +Set~String~ missingConcepts
        +Set~String~ bonusConcepts
    }

    %% ============ NIVO 4 - generisane činjenice ============
    class SeriousGapCount {
        +String candidateId
        +int count
    }

    class ProblematicTechnologies {
        +String candidateId
        +List~String~ techList
    }

    class OverallAssessment {
        +String candidateId
        +OverallClassification classification
    }

    class MentorRecommendation {
        +String candidateId
        +List~String~ problematicTechnologies
        +Map~String,Set~ conceptsToVerify
        +String summary
    }

    %% ============ Asocijacije ============
    CVTechnology --> ExpertiseLevel
    TechnologyKnowledgeProfile --> ExpertiseLevel
    ExperienceLevelMapping --> ExpertiseLevel
    ExpectedConcepts --> ExpertiseLevel
    ExperienceBasedLevel --> ExpertiseLevel
    EstimatedLevel --> ExpertiseLevel

    Gap --> GapType
    Gap --> GapSeverity
    Gap --> ExpertiseLevel

    OverallAssessment --> OverallClassification
```

</div>

## Tok podataka kroz pravila

<div align="center">

```mermaid
flowchart TB
    %% Ulazni podaci
    CV([CVTechnology])
    CM([ConceptMentioned])
    QS([QuestionScore])
    KB1([TechnologyKnowledgeProfile])
    KB2([ExperienceLevelMapping])

    %% Nivo 1
    R11{R1.1 DetermineExpectedConcepts}
    R12{R1.2 DetermineExpectedLevelFromExperience}
    R13{R1.3 CollectDemonstratedConcepts}
    EC([ExpectedConcepts])
    DC([DemonstratedConcepts])
    EBL([ExperienceBasedLevel])

    CV --> R11
    KB1 --> R11
    R11 --> EC

    CV --> R12
    KB2 --> R12
    R12 --> EBL

    CV --> R13
    CM --> R13
    R13 --> DC

    %% Nivo 2
    R21{R2.1 ComputeMissingConcepts}
    R22{R2.2 ComputeUnexpectedlyKnownConcepts}
    R23{R2.3 EstimateActualLevel}
    R24{R2.4 ComputeAverageQuestionScore}
    MC([MissingConcepts])
    BC([BonusConcepts])
    EL([EstimatedLevel])
    AS([AverageScore])

    EC --> R21
    DC --> R21
    R21 --> MC

    EC --> R22
    DC --> R22
    R22 --> BC

    CM --> R23
    DC --> R23
    R23 --> EL

    DC --> R24
    QS --> R24
    R24 --> AS

    %% Nivo 3
    R3{R3.1-R3.5 Detect Gap}
    G([Gap])

    MC --> R3
    AS --> R3
    BC --> R3
    EL --> R3
    CV --> R3
    R3 --> G

    %% Nivo 4
    R41{R4.1 CountSeriousGaps}
    R42{R4.2 CollectProblematicTechnologies}
    R4cls{R4.3-R4.6 Classify}
    R47{R4.7 GenerateMentorRecommendation}
    SGC([SeriousGapCount])
    PT([ProblematicTechnologies])
    OA([OverallAssessment])
    MR([MentorRecommendation])

    G --> R41
    R41 --> SGC

    G --> R42
    R42 --> PT

    SGC --> R4cls
    G --> R4cls
    R4cls --> OA

    OA --> R47
    PT --> R47
    G --> R47
    R47 --> MR

    %% Styling
    classDef input fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#0d47a1,font-weight:bold
    classDef kb fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100,font-weight:bold
    classDef l1 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c,font-weight:bold
    classDef l2 fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#1b5e20,font-weight:bold
    classDef l3 fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c,font-weight:bold
    classDef l4 fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40,font-weight:bold

    class CV,CM,QS input
    class KB1,KB2 kb
    class EC,DC,EBL l1
    class MC,BC,EL,AS l2
    class G l3
    class SGC,PT,OA,MR l4
```

</div>

## Legenda

- 🟦 **Plavo** — ulazni podaci od korisnika (REST request)
- 🟧 **Narandžasto** — domenska baza znanja (seedovana pre svake analize)
- 🟪 **Ljubičasto** — činjenice Nivoa 1
- 🟩 **Zeleno** — činjenice Nivoa 2
- 🟥 **Crveno** — činjenice Nivoa 3 (Gap)
- 🩵 **Tirkizno (teal)** — činjenice Nivoa 4 (sumarna procena)
