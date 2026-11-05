package com.neurozy.voicetowebsite.dto;

import java.util.List;
import java.util.Map;

public class BusinessExtractResponse {
    private String businessName;
    private String category;
    private String tagline;
    private String description;
    private String phone;
    private String whatsappNumber;
    private String city;
    private String address;
    private String recommendedTemplateId;
    private String primaryColor;
    private String subdomain;
    private Map<String, String> operatingHours;
    private List<ProductDto> products;

    public BusinessExtractResponse() {}

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRecommendedTemplateId() { return recommendedTemplateId; }
    public void setRecommendedTemplateId(String recommendedTemplateId) { this.recommendedTemplateId = recommendedTemplateId; }

    public String getPrimaryColor() { return primaryColor; }
    public void setPrimaryColor(String primaryColor) { this.primaryColor = primaryColor; }

    public String getSubdomain() { return subdomain; }
    public void setSubdomain(String subdomain) { this.subdomain = subdomain; }

    public Map<String, String> getOperatingHours() { return operatingHours; }
    public void setOperatingHours(Map<String, String> operatingHours) { this.operatingHours = operatingHours; }

    public List<ProductDto> getProducts() { return products; }
    public void setProducts(List<ProductDto> products) { this.products = products; }
}
