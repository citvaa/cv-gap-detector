package com.ftn.sbnz.model.facts;

import java.util.Objects;

public class AverageScore {

    private String candidateId;
    private String technology;
    private double avgScore;

    public AverageScore() {}

    public AverageScore(String candidateId, String technology, double avgScore) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.avgScore = avgScore;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public double getAvgScore() { return avgScore; }
    public void setAvgScore(double avgScore) { this.avgScore = avgScore; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AverageScore)) return false;
        AverageScore that = (AverageScore) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "AverageScore{" + technology + " = " + String.format("%.2f", avgScore) + "}";
    }
}
