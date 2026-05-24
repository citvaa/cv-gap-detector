package com.ftn.sbnz.model.facts;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProblematicTechnologies {

    private String candidateId;
    private List<String> techList;

    public ProblematicTechnologies() {
        this.techList = new ArrayList<>();
    }

    public ProblematicTechnologies(String candidateId, List<String> techList) {
        this.candidateId = candidateId;
        this.techList = techList != null ? techList : new ArrayList<>();
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public List<String> getTechList() { return techList; }
    public void setTechList(List<String> techList) { this.techList = techList; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProblematicTechnologies)) return false;
        ProblematicTechnologies that = (ProblematicTechnologies) o;
        return Objects.equals(candidateId, that.candidateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId);
    }

    @Override
    public String toString() {
        return "ProblematicTechnologies{" + candidateId + " = " + techList + "}";
    }
}
