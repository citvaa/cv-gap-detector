package com.ftn.sbnz.service.service;

import com.ftn.sbnz.model.cv.CVTechnology;
import com.ftn.sbnz.model.cv.ExpertiseLevel;
import com.ftn.sbnz.model.interview.ConceptMentioned;
import com.ftn.sbnz.model.interview.QuestionScore;
import com.ftn.sbnz.service.dto.AnalysisRequest;
import org.springframework.stereotype.Component;

@Component
public class DemoDataProvider {

    private static final String CANDIDATE = "candidate-001";

    public AnalysisRequest buildProposalExample() {
        AnalysisRequest req = new AnalysisRequest();
        req.setCandidateId(CANDIDATE);

        req.getCv().add(new CVTechnology(CANDIDATE, "React", ExpertiseLevel.EXPERT, 5));
        req.getCv().add(new CVTechnology(CANDIDATE, "PostgreSQL", ExpertiseLevel.MID, 2));

        req.getMentionedConcepts().add(mention("React", "JSX", 1));
        req.getMentionedConcepts().add(mention("React", "useState", 2));
        req.getMentionedConcepts().add(mention("React", "props", 1));
        req.getMentionedConcepts().add(mention("React", "components", 1));

        req.getMentionedConcepts().add(mention("PostgreSQL", "SELECT", 1));
        req.getMentionedConcepts().add(mention("PostgreSQL", "JOIN", 2));
        req.getMentionedConcepts().add(mention("PostgreSQL", "WHERE", 1));
        req.getMentionedConcepts().add(mention("PostgreSQL", "GROUP BY", 2));
        req.getMentionedConcepts().add(mention("PostgreSQL", "INDEX", 3));
        req.getMentionedConcepts().add(mention("PostgreSQL", "subqueries", 3));
        req.getMentionedConcepts().add(mention("PostgreSQL", "EXPLAIN", 4));
        req.getMentionedConcepts().add(mention("PostgreSQL", "transactions", 4));
        req.getMentionedConcepts().add(mention("PostgreSQL", "ACID", 4));

        req.getQuestionScores().add(new QuestionScore(CANDIDATE, "React", "q1", 40));
        req.getQuestionScores().add(new QuestionScore(CANDIDATE, "React", "q2", 30));
        req.getQuestionScores().add(new QuestionScore(CANDIDATE, "React", "q3", 35));

        req.getQuestionScores().add(new QuestionScore(CANDIDATE, "PostgreSQL", "q1", 85));
        req.getQuestionScores().add(new QuestionScore(CANDIDATE, "PostgreSQL", "q2", 80));
        req.getQuestionScores().add(new QuestionScore(CANDIDATE, "PostgreSQL", "q3", 90));

        return req;
    }

    private ConceptMentioned mention(String tech, String concept, int weight) {
        return new ConceptMentioned(CANDIDATE, tech, concept, weight);
    }
}
