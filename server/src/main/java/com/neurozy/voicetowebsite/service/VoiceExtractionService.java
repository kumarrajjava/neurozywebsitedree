package com.neurozy.voicetowebsite.service;

import com.neurozy.voicetowebsite.dto.BusinessExtractResponse;
import com.neurozy.voicetowebsite.dto.ProductDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class VoiceExtractionService {

    public BusinessExtractResponse extractFromTranscript(String transcript) {
        String text = transcript != null ? transcript.trim() : "";
        String lower = text.toLowerCase();

        // 1. Detect Category
        String category = "bakery";
        if (matchesAny(lower, "cloth", "boutique", "kapde", "saree", "kurti", "dress", "suit", "lehenga", "fashion", "chikankari")) {
            category = "clothing";
        } else if (matchesAny(lower, "salon", "parlour", "beauty", "makeup", "haircut", "facial", "spa", "grooming", "bridal")) {
            category = "salon";
        } else if (matchesAny(lower, "restaurant", "dhaba", "biryani", "cafe", "kebab", "food", "dine", "khana", "sweets", "mithai")) {
            category = "restaurant";
        } else if (matchesAny(lower, "coaching", "tuition", "institute", "academy", "classes", "neet", "jee", "cbse", "education")) {
            category = "coaching";
        } else if (matchesAny(lower, "service", "repair", "electrician", "plumber", "ac repair", "cleaning", "carpenter", "technician")) {
            category = "service";
        }

        // 2. Extract Business Name
        String name = extractBusinessName(text, category);

        // 3. Extract Indian 10-digit Phone / WhatsApp
        String phone = "9876543210";
        Pattern phonePattern = Pattern.compile("(?:\\+91[\\s-]?)?([6-9]\\d{9})");
        Matcher phoneMatcher = phonePattern.matcher(text);
        if (phoneMatcher.find()) {
            phone = phoneMatcher.group(1);
        }

        // 4. Extract Location
        String area = "Hazratganj";
        String city = "Lucknow";
        String[] lucknowAreas = {"Hazratganj", "Gomti Nagar", "Alambagh", "Aminabad", "Chowk", "Aliganj", "Indira Nagar", "Mahanagar"};
        for (String loc : lucknowAreas) {
            if (Pattern.compile("\\b" + loc + "\\b", Pattern.CASE_INSENSITIVE).matcher(text).find()) {
                area = loc;
                break;
            }
        }

        // 5. Generate Response
        BusinessExtractResponse response = new BusinessExtractResponse();
        response.setBusinessName(name);
        response.setCategory(category);
        response.setPhone(phone);
        response.setWhatsappNumber(phone);
        response.setCity(city);
        response.setAddress(area + ", " + city + ", Uttar Pradesh");
        
        String slug = name.toLowerCase().replaceAll("[^a-z0-9]", "-").replaceAll("-+", "-").replaceAll("^-|-$", "");
        if (slug.isEmpty()) slug = "my-business";
        response.setSubdomain(slug);

        Map<String, String> hours = new LinkedHashMap<>();
        hours.put("monday", "9:00 AM - 10:00 PM");
        hours.put("saturday", "9:00 AM - 10:30 PM");
        hours.put("sunday", "10:00 AM - 9:30 PM");
        response.setOperatingHours(hours);

        enrichCategoryMetadata(response, category, area, city);
        return response;
    }

    private boolean matchesAny(String text, String... keywords) {
        for (String kw : keywords) {
            if (text.contains(kw)) return true;
        }
        return false;
    }

    private String extractBusinessName(String text, String category) {
        Pattern p1 = Pattern.compile("([A-Z][A-Za-z0-9&'\\s]{2,25})\\s+(?:naam se|named|called)", Pattern.CASE_INSENSITIVE);
        Matcher m1 = p1.matcher(text);
        if (m1.find()) {
            return m1.group(1).replaceAll("(?i)(meri|hamari|humara|ek|ki|ka)", "").trim();
        }

        Map<String, String> defaults = Map.of(
            "bakery", "Sweet Bites Bakery",
            "clothing", "Royal Heritage Boutique",
            "salon", "Glow & Glam Unisex Salon",
            "restaurant", "Dawat-e-Khaas Restaurant",
            "coaching", "Apex Career Academy",
            "service", "FixMaster Pro Services"
        );
        return defaults.getOrDefault(category, "My Business");
    }

    private void enrichCategoryMetadata(BusinessExtractResponse res, String category, String area, String city) {
        switch (category) {
            case "bakery" -> {
                res.setTagline("Freshly Baked with Love in " + area + ", " + city);
                res.setDescription("Artisanal bakery crafting fresh eggless cakes, celebratory pastries, handmade cookies, and savory treats.");
                res.setRecommendedTemplateId("sweet-bites-bakery");
                res.setPrimaryColor("#E11D48");
                res.setProducts(List.of(
                    new ProductDto("p1", "Belgian Dark Chocolate Cake (1/2 kg)", "Rich Dutch cocoa sponge with dark chocolate ganache", new BigDecimal("499.00"), "Cakes", "https://images.unsplash.com/photo-1578985545062-69928b1d9587", true),
                    new ProductDto("p2", "Red Velvet Cream Cheese Pastry", "Crimson sponge with light cream cheese frosting", new BigDecimal("99.00"), "Pastries", "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b", true)
                ));
            }
            case "clothing" -> {
                res.setTagline("Elegance & Contemporary Fashion in " + city);
                res.setDescription("Curated collection of authentic Chikankari, festive ethnic wear, designer sarees, and modern readymade apparel.");
                res.setRecommendedTemplateId("royal-heritage-boutique");
                res.setPrimaryColor("#7C3AED");
                res.setProducts(List.of(
                    new ProductDto("p1", "Handcrafted Cotton Chikankari Kurti", "Fine shadow-work embroidery on pure cotton", new BigDecimal("1450.00"), "Kurtis", "https://images.unsplash.com/photo-1610030469983-98e550d6193c", true),
                    new ProductDto("p2", "Banarasi Silk Festive Saree", "Rich zari woven borders with traditional floral motifs", new BigDecimal("3499.00"), "Sarees", "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb", true)
                ));
            }
            default -> {
                res.setTagline("Quality & Professional Excellence in " + city);
                res.setDescription("Committed to delivering trusted quality products and friendly service to our valued customers.");
                res.setRecommendedTemplateId("sweet-bites-bakery");
                res.setPrimaryColor("#4F46E5");
                res.setProducts(List.of(
                    new ProductDto("p1", "Signature Offering", "Top-rated service with 100% satisfaction guarantee", new BigDecimal("299.00"), "Main", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5", true)
                ));
            }
        }
    }
}

