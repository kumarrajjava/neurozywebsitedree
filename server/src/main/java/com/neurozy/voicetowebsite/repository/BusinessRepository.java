package com.neurozy.voicetowebsite.repository;

import com.neurozy.voicetowebsite.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, String> {
    List<Business> findByUserId(String userId);
    Optional<Business> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
