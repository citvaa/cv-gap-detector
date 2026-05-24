package com.ftn.sbnz.model.facts;

import com.ftn.sbnz.model.cv.ExpertiseLevel;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Gap {

    private String candidateId;
    private String technology;
    private GapType type;
    private GapSeverity severity;
    private ExpertiseLevel claimedLevel;
    private ExpertiseLevel estimatedLevel;
    private Set<String> missingConcepts;
    private Set<String> bonusConcepts;

    public Gap() {
        this.missingConcepts = new HashSet<>();
        this.bonusConcepts = new HashSet<>();
    }

    public Gap(String candidateId, String technology, GapType type, GapSeverity severity) {
        this();
        this.candidateId = candidateId;
        this.technology = technology;
        this.type = type;
        this.severity = severity;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public GapType getType() { return type; }
    public void setType(GapType type) { this.type = type; }

    public GapSeverity getSeverity() { return severity; }
    public void setSeverity(GapSeverity severity) { this.severity = severity; }

    public ExpertiseLevel getClaimedLevel() { return claimedLevel; }
    public void setClaimedLevel(ExpertiseLevel claimedLevel) { this.claimedLevel = claimedLevel; }

    public ExpertiseLevel getEstimatedLevel() { return estimatedLevel; }
    public void setEstimatedLevel(ExpertiseLevel estimatedLevel) { this.estimatedLevel = estimatedLevel; }

    public Set<String> getMissingConcepts() { return missingConcepts; }
    public void setMissingConcepts(Set<String> missingConcepts) { this.missingConcepts = missingConcepts; }

    public Set<String> getBonusConcepts() { return bonusConcepts; }
    public void setBonusConcepts(Set<String> bonusConcepts) { this.bonusConcepts = bonusConcepts; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Gap)) return false;
        Gap gap = (Gap) o;
        return Objects.equals(candidateId, gap.candidateId) &&
               Objects.equals(technology, gap.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "Gap{" + technology + ": " + type + "/" + severity +
                ", claimed=" + claimedLevel + ", estimated=" + estimatedLevel + "}";
    }
}
