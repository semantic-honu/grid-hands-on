package com.semahonu.backend.dto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class BookRequestDTO {

    // @Pattern(regexp = "^[0-9]+$")
    // private Long id;

    @NotBlank(message = "タイトルがいります")
    private String title;

    @NotBlank(message = "著者がいります")
    private String author;

    private String isbn;
    private Date publicationDate;
}
