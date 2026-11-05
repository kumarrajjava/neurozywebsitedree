package com.neurozy.voicetowebsite.controller;

import com.neurozy.voicetowebsite.dto.BusinessExtractResponse;
import com.neurozy.voicetowebsite.dto.VoiceParseRequest;
import com.neurozy.voicetowebsite.service.VoiceExtractionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/voice")
@CrossOrigin(origins = "*")
public class VoiceController {

    private final VoiceExtractionService voiceExtractionService;

    public VoiceController(VoiceExtractionService voiceExtractionService) {
        this.voiceExtractionService = voiceExtractionService;
    }

    @PostMapping("/parse-transcript")
    public ResponseEntity<BusinessExtractResponse> parseTranscript(@RequestBody VoiceParseRequest request) {
        BusinessExtractResponse response = voiceExtractionService.extractFromTranscript(request.getTranscript());
        return ResponseEntity.ok(response);
    }
}

