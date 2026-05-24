package com.ftn.sbnz.service.dto;

import com.ftn.sbnz.model.cv.CVTechnology;
import com.ftn.sbnz.model.interview.ConceptMentioned;
import com.ftn.sbnz.model.interview.QuestionScore;

import java.util.ArrayList;
import java.util.List;

public class AnalysisRequest {

    private String candidateId;
    private List<CVTechnology> cv;
    private List<ConceptMentioned> mentionedConcepts;
    private List<QuestionScore> questionScores;

    public AnalysisRequest() {
        this.cv = new ArrayList<>();
        this.mentionedConcepts = new ArrayList<>();
        this.questionScores = new ArrayList<>();
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public List<CVTechnology> getCv() { return cv; }
    public void setCv(List<CVTechnology> cv) { this.cv = cv; }

    public List<ConceptMentioned> getMentionedConcepts() { return mentionedConcepts; }
    public void setMentionedConcepts(List<ConceptMentioned> mentionedConcepts) { this.mentionedConcepts = mentionedConcepts; }

    public List<QuestionScore> getQuestionScores() { return questionScores; }
    public void setQuestionScores(List<QuestionScore> questionScores) { this.questionScores = questionScores; }
}
