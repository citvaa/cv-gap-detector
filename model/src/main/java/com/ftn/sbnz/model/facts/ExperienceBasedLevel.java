package com.ftn.sbnz.model.facts;

import com.ftn.sbnz.model.cv.ExpertiseLevel;

import java.util.Objects;

public class ExperienceBasedLevel {

    private String candidateId;
    private String technology;
    private ExpertiseLevel level;

    public ExperienceBasedLevel() {}

    public ExperienceBasedLevel(String candidateId, String technology, ExpertiseLevel level) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.level = level;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public ExpertiseLevel getLevel() { return level; }
    public void setLevel(ExpertiseLevel level) { this.level = level; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExperienceBasedLevel)) return false;
        ExperienceBasedLevel that = (ExperienceBasedLevel) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "ExperienceBasedLevel{" + technology + " → " + level + "}";
    }
}
