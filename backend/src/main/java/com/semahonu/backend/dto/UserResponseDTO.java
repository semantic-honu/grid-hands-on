package com.semahonu.backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDTO {
    private Long id;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
