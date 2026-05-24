package com.ftn.sbnz.model.facts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

public class MentorRecommendation {

    private String candidateId;
    private List<String> problematicTechnologies;
    private Map<String, Set<String>> conceptsToVerify;
    private String summary;

    public MentorRecommendation() {
        this.problematicTechnologies = new ArrayList<>();
        this.conceptsToVerify = new HashMap<>();
    }

    public MentorRecommendation(String candidateId, List<String> problematicTechnologies,
                                 Map<String, Set<String>> conceptsToVerify, String summary) {
        this.candidateId = candidateId;
        this.problematicTechnologies = problematicTechnologies != null ? problematicTechnologies : new ArrayList<>();
        this.conceptsToVerify = conceptsToVerify != null ? conceptsToVerify : new HashMap<>();
        this.summary = summary;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public List<String> getProblematicTechnologies() { return problematicTechnologies; }
    public void setProblematicTechnologies(List<String> problematicTechnologies) { this.problematicTechnologies = problematicTechnologies; }

    public Map<String, Set<String>> getConceptsToVerify() { return conceptsToVerify; }
    public void setConceptsToVerify(Map<String, Set<String>> conceptsToVerify) { this.conceptsToVerify = conceptsToVerify; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MentorRecommendation)) return false;
        MentorRecommendation that = (MentorRecommendation) o;
        return Objects.equals(candidateId, that.candidateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId);
    }

    @Override
    public String toString() {
        return "MentorRecommendation{" + candidateId + ", " + problematicTechnologies + "}";
    }
}
