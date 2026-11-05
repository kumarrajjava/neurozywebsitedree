package com.neurozy.voicetowebsite.repository;

import com.neurozy.voicetowebsite.entity.Website;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebsiteRepository extends JpaRepository<Website, String> {
    Optional<Website> findBySubdomain(String subdomain);
    Optional<Website> findByBusinessId(String businessId);
    boolean existsBySubdomain(String subdomain);
}

