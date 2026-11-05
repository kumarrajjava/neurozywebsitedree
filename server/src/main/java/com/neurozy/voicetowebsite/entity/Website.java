package com.neurozy.voicetowebsite.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "websites")
public class Website {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String businessId;

    @Column(nullable = false, length = 50)
    private String templateId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 20)
    private String primaryColor = "#4F46E5";

    @Column(nullable = false, unique = true, length = 100)
    private String subdomain;

    private boolean isPublished = false;

    private int visitsCount = 0;

    private int whatsappClicksCount = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime publishedAt;

    public Website() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBusinessId() { return businessId; }
    public void setBusinessId(String businessId) { this.businessId = businessId; }

    public String getTemplateId() { return templateId; }
    public void setTemplateId(String templateId) { this.templateId = templateId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPrimaryColor() { return primaryColor; }
    public void setPrimaryColor(String primaryColor) { this.primaryColor = primaryColor; }

    public String getSubdomain() { return subdomain; }
    public void setSubdomain(String subdomain) { this.subdomain = subdomain; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }

    public int getVisitsCount() { return visitsCount; }
    public void setVisitsCount(int visitsCount) { this.visitsCount = visitsCount; }

    public int getWhatsappClicksCount() { return whatsappClicksCount; }
    public void setWhatsappClicksCount(int whatsappClicksCount) { this.whatsappClicksCount = whatsappClicksCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
}
