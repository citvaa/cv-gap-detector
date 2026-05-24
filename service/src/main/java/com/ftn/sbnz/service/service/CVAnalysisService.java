package com.ftn.sbnz.service.service;

import com.ftn.sbnz.model.facts.Gap;
import com.ftn.sbnz.model.facts.MentorRecommendation;
import com.ftn.sbnz.model.facts.OverallAssessment;
import com.ftn.sbnz.service.dto.AnalysisRequest;
import com.ftn.sbnz.service.dto.AnalysisResponse;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CVAnalysisService {

    private final KieContainer kieContainer;
    private final KnowledgeBaseSeeder seeder;

    @Autowired
    public CVAnalysisService(KieContainer kieContainer, KnowledgeBaseSeeder seeder) {
        this.kieContainer = kieContainer;
        this.seeder = seeder;
    }

    public AnalysisResponse analyze(AnalysisRequest request) {
        KieSession session = kieContainer.newKieSession("cvAnalysisSession");
        try {

            seeder.seedKnowledgeBase(session);

            request.getCv().forEach(session::insert);
            request.getMentionedConcepts().forEach(session::insert);
            request.getQuestionScores().forEach(session::insert);

            System.out.println("\n========================================");
            System.out.println("Pokrećem analizu za kandidata: " + request.getCandidateId());
            System.out.println("========================================\n");

            int firedRules = session.fireAllRules();
            System.out.println("\n>>> Ukupno okinutih pravila: " + firedRules + "\n");

            AnalysisResponse response = new AnalysisResponse();
            response.setCandidateId(request.getCandidateId());

            Collection<?> objects = session.getObjects();
            for (Object obj : objects) {
                if (obj instanceof Gap) {
                    Gap g = (Gap) obj;
                    if (request.getCandidateId().equals(g.getCandidateId())) {
                        response.getGaps().add(g);
                    }
                } else if (obj instanceof OverallAssessment) {
                    OverallAssessment oa = (OverallAssessment) obj;
                    if (request.getCandidateId().equals(oa.getCandidateId())) {
                        response.setOverallAssessment(oa);
                    }
                } else if (obj instanceof MentorRecommendation) {
                    MentorRecommendation mr = (MentorRecommendation) obj;
                    if (request.getCandidateId().equals(mr.getCandidateId())) {
                        response.setMentorRecommendation(mr);
                    }
                }
            }
            return response;
        } finally {
            session.dispose();
        }
    }
}
