package com.ftn.sbnz.model.kb;

import com.ftn.sbnz.model.cv.ExpertiseLevel;

public class ExperienceLevelMapping {

    private int minYears;
    private int maxYears;
    private ExpertiseLevel level;

    public ExperienceLevelMapping() {}

    public ExperienceLevelMapping(int minYears, int maxYears, ExpertiseLevel level) {
        this.minYears = minYears;
        this.maxYears = maxYears;
        this.level = level;
    }

    public int getMinYears() { return minYears; }
    public void setMinYears(int minYears) { this.minYears = minYears; }

    public int getMaxYears() { return maxYears; }
    public void setMaxYears(int maxYears) { this.maxYears = maxYears; }

    public ExpertiseLevel getLevel() { return level; }
    public void setLevel(ExpertiseLevel level) { this.level = level; }

    @Override
    public String toString() {
        return "ExperienceLevelMapping{" + minYears + "-" + maxYears + " years → " + level + "}";
    }
}
