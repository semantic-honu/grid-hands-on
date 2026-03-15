package com.semahonu.backend.dto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookRequestDTO {

    @NotBlank(message = "タイトルがいります")
    private String title;

    @NotBlank(message = "著者がいります")
    private String author;

    private String isbn;
    private Date publicationDate;

    private Long userId;
}
