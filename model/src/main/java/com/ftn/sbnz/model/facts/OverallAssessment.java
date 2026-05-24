package com.ftn.sbnz.model.facts;

import java.util.Objects;

public class OverallAssessment {

    private String candidateId;
    private OverallClassification classification;

    public OverallAssessment() {}

    public OverallAssessment(String candidateId, OverallClassification classification) {
        this.candidateId = candidateId;
        this.classification = classification;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public OverallClassification getClassification() { return classification; }
    public void setClassification(OverallClassification classification) { this.classification = classification; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OverallAssessment)) return false;
        OverallAssessment that = (OverallAssessment) o;
        return Objects.equals(candidateId, that.candidateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId);
    }

    @Override
    public String toString() {
        return "OverallAssessment{" + candidateId + " → " + classification + "}";
    }
}
