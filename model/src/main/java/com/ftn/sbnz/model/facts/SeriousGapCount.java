package com.ftn.sbnz.model.facts;

import java.util.Objects;

public class SeriousGapCount {

    private String candidateId;
    private int count;

    public SeriousGapCount() {}

    public SeriousGapCount(String candidateId, int count) {
        this.candidateId = candidateId;
        this.count = count;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SeriousGapCount)) return false;
        SeriousGapCount that = (SeriousGapCount) o;
        return Objects.equals(candidateId, that.candidateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId);
    }

    @Override
    public String toString() {
        return "SeriousGapCount{" + candidateId + " = " + count + "}";
    }
}
