package com.ftn.sbnz.model.facts;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

public class DemonstratedConcepts {

    private String candidateId;
    private String technology;
    private Set<String> conceptList;

    public DemonstratedConcepts() {
        this.conceptList = new HashSet<>();
    }

    public DemonstratedConcepts(String candidateId, String technology, Set<String> conceptList) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.conceptList = conceptList != null ? conceptList : new HashSet<>();
    }

    public DemonstratedConcepts(String candidateId, String technology, List<String> conceptList) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.conceptList = conceptList != null ? new HashSet<>(conceptList) : new HashSet<>();
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public Set<String> getConceptList() { return conceptList; }
    public void setConceptList(Set<String> conceptList) { this.conceptList = conceptList; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DemonstratedConcepts)) return false;
        DemonstratedConcepts that = (DemonstratedConcepts) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "DemonstratedConcepts{" + technology + ", " + conceptList + "}";
    }
}
