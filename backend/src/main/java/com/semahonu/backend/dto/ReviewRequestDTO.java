package com.semahonu.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ReviewRequestDTO {

        @NotBlank(message = "レビュアーがいります")
        private String reviewer;

        @Min(value = 1, message = "評価は1以上で入力してください")
        @Max(value = 5, message = "評価は5以下で入力してください")
        @NotNull(message = "評価がいります")
        private Integer rating;

        @NotBlank(message = "コメントがいります")
        private String comment;
}
