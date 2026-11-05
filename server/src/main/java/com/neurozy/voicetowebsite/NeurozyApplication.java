package com.neurozy.voicetowebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NeurozyApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeurozyApplication.class, args);
        System.out.println("==================================================");
        System.out.println("  Neurozy Voice-to-Website Backend Service Online! ");
        System.out.println("  Tagline: Speak Your Business. Get Your Website.  ");
        System.out.println("  Port: http://localhost:8080                      ");
        System.out.println("==================================================");
    }
}
