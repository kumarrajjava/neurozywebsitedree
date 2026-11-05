package com.neurozy.voicetowebsite.dto;

public class VoiceParseRequest {
    private String transcript;
    private String inputLanguage = "hi-IN";

    public VoiceParseRequest() {}

    public VoiceParseRequest(String transcript, String inputLanguage) {
        this.transcript = transcript;
        this.inputLanguage = inputLanguage;
    }

    public String getTranscript() { return transcript; }
    public void setTranscript(String transcript) { this.transcript = transcript; }

    public String getInputLanguage() { return inputLanguage; }
    public void setInputLanguage(String inputLanguage) { this.inputLanguage = inputLanguage; }
}

