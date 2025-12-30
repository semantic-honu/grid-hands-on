package com.semahonu.backend.controller;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.semahonu.backend.dto.ReviewRequestDTO;
import com.semahonu.backend.exception.ErrorResponse;
import com.semahonu.backend.exception.ErrorResponsesWithField;
import com.semahonu.backend.model.Review;
import com.semahonu.backend.service.ReviewService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // 全件取得
    @GetMapping("/books/{bookId}/reviews")
    public List<Review> getAllReviews(@PathVariable Long bookId) {
        return reviewService.getAllReviews(bookId);
    }

    // 登録 201
    @PostMapping("/books/{bookId}/reviews")
    public ResponseEntity<Review> createReview(@PathVariable Long bookId,
            @Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {
        Review savedReview = reviewService.createReview(bookId, reviewRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    // 削除 204
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // 更新 200
    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {

        Review updated = reviewService.updateReview(id, reviewRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    // データ重複違反例外ハンドラー
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ErrorResponse errorResponse = new ErrorResponsesWithField(
                "同じレビュアーのコメントは既に存在します",
                "reviewer");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}
