package com.ftn.sbnz.model.cv;

import java.util.Objects;

public class CVTechnology {

    private String candidateId;
    private String technology;
    private ExpertiseLevel claimedLevel;
    private int yearsOfExperience;

    public CVTechnology() {}

    public CVTechnology(String candidateId, String technology, ExpertiseLevel claimedLevel, int yearsOfExperience) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.claimedLevel = claimedLevel;
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public ExpertiseLevel getClaimedLevel() { return claimedLevel; }
    public void setClaimedLevel(ExpertiseLevel claimedLevel) { this.claimedLevel = claimedLevel; }

    public int getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(int yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CVTechnology)) return false;
        CVTechnology that = (CVTechnology) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "CVTechnology{" +
                "candidateId='" + candidateId + '\'' +
                ", technology='" + technology + '\'' +
                ", claimedLevel=" + claimedLevel +
                ", yearsOfExperience=" + yearsOfExperience +
                '}';
    }
}
