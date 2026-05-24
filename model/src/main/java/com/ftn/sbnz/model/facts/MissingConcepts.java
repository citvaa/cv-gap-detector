package com.ftn.sbnz.model.facts;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class MissingConcepts {

    private String candidateId;
    private String technology;
    private Set<String> missingList;
    private int expectedSize;

    public MissingConcepts() {
        this.missingList = new HashSet<>();
    }

    public MissingConcepts(String candidateId, String technology, Set<String> missingList, int expectedSize) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.missingList = missingList != null ? missingList : new HashSet<>();
        this.expectedSize = expectedSize;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public Set<String> getMissingList() { return missingList; }
    public void setMissingList(Set<String> missingList) { this.missingList = missingList; }

    public int getExpectedSize() { return expectedSize; }
    public void setExpectedSize(int expectedSize) { this.expectedSize = expectedSize; }

    public double getMissingRatio() {
        if (expectedSize == 0) return 0.0;
        return (double) missingList.size() / (double) expectedSize;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MissingConcepts)) return false;
        MissingConcepts that = (MissingConcepts) o;
        return Objects.equals(candidateId, that.candidateId) &&
               Objects.equals(technology, that.technology);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, technology);
    }

    @Override
    public String toString() {
        return "MissingConcepts{" + technology + ", " + missingList.size() + "/" + expectedSize +
                " (" + String.format("%.2f", getMissingRatio()) + "), " + missingList + "}";
    }
}
