package com.ftn.sbnz.service.dto;

import com.ftn.sbnz.model.facts.Gap;
import com.ftn.sbnz.model.facts.MentorRecommendation;
import com.ftn.sbnz.model.facts.OverallAssessment;

import java.util.ArrayList;
import java.util.List;

public class AnalysisResponse {

    private String candidateId;
    private List<Gap> gaps;
    private OverallAssessment overallAssessment;
    private MentorRecommendation mentorRecommendation;

    public AnalysisResponse() {
        this.gaps = new ArrayList<>();
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public List<Gap> getGaps() { return gaps; }
    public void setGaps(List<Gap> gaps) { this.gaps = gaps; }

    public OverallAssessment getOverallAssessment() { return overallAssessment; }
    public void setOverallAssessment(OverallAssessment overallAssessment) { this.overallAssessment = overallAssessment; }

    public MentorRecommendation getMentorRecommendation() { return mentorRecommendation; }
    public void setMentorRecommendation(MentorRecommendation mentorRecommendation) { this.mentorRecommendation = mentorRecommendation; }
}
