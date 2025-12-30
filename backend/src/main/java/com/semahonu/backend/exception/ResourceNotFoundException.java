package com.semahonu.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException forBook(Long id) {
        return new ResourceNotFoundException("Book not found with id: " + id);
    }

    public static ResourceNotFoundException forReview(Long id) {
        return new ResourceNotFoundException("Review not found with id: " + id);
    }
}
