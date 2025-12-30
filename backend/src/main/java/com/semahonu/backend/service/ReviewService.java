package com.semahonu.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.semahonu.backend.dto.ReviewRequestDTO;
import com.semahonu.backend.exception.ResourceNotFoundException;
import com.semahonu.backend.model.Book;
import com.semahonu.backend.model.Review;
import com.semahonu.backend.repository.BookRepository;
import com.semahonu.backend.repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    public ReviewService(ReviewRepository reviewRepository, BookRepository bookRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
    }

    public List<Review> getAllReviews(Long bookId) {
        return reviewRepository.findByBookIdOrderByIdAsc(bookId);
    }

    @Transactional
    public Review createReview(Long bookId, ReviewRequestDTO reviewRequestDTO) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> ResourceNotFoundException.forBook(bookId)); // なければ例外を投げてロールバック！

        Review review = new Review();
        review.setBook(book);
        review.setReviewer(reviewRequestDTO.getReviewer());
        review.setRating(reviewRequestDTO.getRating());
        review.setComment(reviewRequestDTO.getComment());

        return reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw ResourceNotFoundException.forReview(id); // 見つからなかったら例外を投げる
        }
        reviewRepository.deleteById(id);
    }

    @Transactional
    public Review updateReview(Long id, ReviewRequestDTO requestDTO) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forReview(id)); // 見つからなかったら例外を投げる

        review.setReviewer(requestDTO.getReviewer());
        review.setRating(requestDTO.getRating());
        review.setComment(requestDTO.getComment());

        return review;
    }
}
