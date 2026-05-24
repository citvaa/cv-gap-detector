package com.ftn.sbnz.model.kb;

import com.ftn.sbnz.model.cv.ExpertiseLevel;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class TechnologyKnowledgeProfile {

    private String technology;
    private ExpertiseLevel level;
    private Set<String> expectedConcepts;

    public TechnologyKnowledgeProfile() {
        this.expectedConcepts = new HashSet<>();
    }

    public TechnologyKnowledgeProfile(String technology, ExpertiseLevel level, Set<String> expectedConcepts) {
        this.technology = technology;
        this.level = level;
        this.expectedConcepts = expectedConcepts != null ? expectedConcepts : new HashSet<>();
    }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public ExpertiseLevel getLevel() { return level; }
    public void setLevel(ExpertiseLevel level) { this.level = level; }

    public Set<String> getExpectedConcepts() { return expectedConcepts; }
    public void setExpectedConcepts(Set<String> expectedConcepts) { this.expectedConcepts = expectedConcepts; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TechnologyKnowledgeProfile)) return false;
        TechnologyKnowledgeProfile that = (TechnologyKnowledgeProfile) o;
        return Objects.equals(technology, that.technology) && level == that.level;
    }

    @Override
    public int hashCode() {
        return Objects.hash(technology, level);
    }

    @Override
    public String toString() {
        return "TechnologyKnowledgeProfile{" + technology + "@" + level + ", concepts=" + expectedConcepts.size() + "}";
    }
}
