package com.ftn.sbnz.model.interview;

public class QuestionScore {

    private String candidateId;
    private String technology;
    private String questionId;
    private double score;

    public QuestionScore() {}

    public QuestionScore(String candidateId, String technology, String questionId, double score) {
        this.candidateId = candidateId;
        this.technology = technology;
        this.questionId = questionId;
        this.score = score;
    }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    @Override
    public String toString() {
        return "QuestionScore{" + technology + ":" + questionId + " = " + score + "}";
    }
}
