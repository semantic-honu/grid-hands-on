package com.semahonu.backend.dto;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookResponseDTO {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private Date publicationDate;
    private String registeredBy; // Username
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
