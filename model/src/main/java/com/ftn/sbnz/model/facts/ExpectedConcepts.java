package com.ftn.sbnz.model.facts;

import com.ftn.sbnz.model.cv.ExpertiseLevel;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class ExpectedConcepts {

    private String candidateId;
    private String technology;
    private ExpertiseLevel level;
    private Set<String> conceptList;

    public ExpectedConcepts() {
        this.conceptList = new HashSet<>();
    }

    public ExpectedConcepts(String candidateId, String technology, ExpertiseLevel level, Set<String> conceptList) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.level = level;
        this.conceptList = conceptList != null ? conceptList : new HashSet<>();
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public ExpertiseLevel getLevel() { return level; }
    public void setLevel(ExpertiseLevel level) { this.level = level; }

    public Set<String> getConceptList() { return conceptList; }
    public void setConceptList(Set<String> conceptList) { this.conceptList = conceptList; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExpectedConcepts)) return false;
        ExpectedConcepts that = (ExpectedConcepts) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "ExpectedConcepts{" + technology + "@" + level + ", size=" + conceptList.size() + "}";
    }
}
