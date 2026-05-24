package com.ftn.sbnz.model.facts;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class BonusConcepts {

    private String candidateId;
    private String technology;
    private Set<String> bonusList;

    public BonusConcepts() {
        this.bonusList = new HashSet<>();
    }

    public BonusConcepts(String candidateId, String technology, Set<String> bonusList) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.bonusList = bonusList != null ? bonusList : new HashSet<>();
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public Set<String> getBonusList() { return bonusList; }
    public void setBonusList(Set<String> bonusList) { this.bonusList = bonusList; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BonusConcepts)) return false;
        BonusConcepts that = (BonusConcepts) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "BonusConcepts{" + technology + ", " + bonusList + "}";
    }
}
