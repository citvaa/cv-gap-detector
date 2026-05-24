package com.ftn.sbnz.service.controller;

import com.ftn.sbnz.service.dto.AnalysisRequest;
import com.ftn.sbnz.service.dto.AnalysisResponse;
import com.ftn.sbnz.service.service.CVAnalysisService;
import com.ftn.sbnz.service.service.DemoDataProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AnalysisController {

    private final CVAnalysisService analysisService;
    private final DemoDataProvider demoDataProvider;

    @Autowired
    public AnalysisController(CVAnalysisService analysisService, DemoDataProvider demoDataProvider) {
        this.analysisService = analysisService;
        this.demoDataProvider = demoDataProvider;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyze(@RequestBody AnalysisRequest request) {
        AnalysisResponse response = analysisService.analyze(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/demo")
    public ResponseEntity<AnalysisResponse> runDemo() {
        AnalysisRequest demoRequest = demoDataProvider.buildProposalExample();
        AnalysisResponse response = analysisService.analyze(demoRequest);
        return ResponseEntity.ok(response);
    }
}
