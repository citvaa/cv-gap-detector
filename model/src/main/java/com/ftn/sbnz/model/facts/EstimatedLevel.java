package com.ftn.sbnz.model.facts;

import com.ftn.sbnz.model.cv.ExpertiseLevel;

import java.util.Objects;

public class EstimatedLevel {

    private String candidateId;
    private String technology;
    private ExpertiseLevel level;
    private int score;

    public EstimatedLevel() {}

    public EstimatedLevel(String candidateId, String technology, ExpertiseLevel level, int score) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.level = level;
        this.score = score;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public ExpertiseLevel getLevel() { return level; }
    public void setLevel(ExpertiseLevel level) { this.level = level; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EstimatedLevel)) return false;
        EstimatedLevel that = (EstimatedLevel) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "EstimatedLevel{" + technology + " → " + level + " (score=" + score + ")}";
    }
}
