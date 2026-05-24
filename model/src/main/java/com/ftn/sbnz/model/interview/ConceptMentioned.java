package com.ftn.sbnz.model.interview;

import java.util.Objects;

public class ConceptMentioned {

    private String candidateId;
    private String technology;
    private String concept;
    private int difficultyWeight;

    public ConceptMentioned() {}

    public ConceptMentioned(String candidateId, String technology, String concept, int difficultyWeight) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.concept = concept;
        this.difficultyWeight = difficultyWeight;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public String getConcept() { return concept; }
    public void setConcept(String concept) { this.concept = concept; }

    public int getDifficultyWeight() { return difficultyWeight; }
    public void setDifficultyWeight(int difficultyWeight) { this.difficultyWeight = difficultyWeight; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ConceptMentioned)) return false;
        ConceptMentioned that = (ConceptMentioned) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology) &&
               Objects.equals(concept, that.concept);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology, concept);
    }

    @Override
    public String toString() {
        return "ConceptMentioned{" + technology + ":" + concept + " (w=" + difficultyWeight + ")}";
    }
}
