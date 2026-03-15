package com.semahonu.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.semahonu.backend.dto.BookRequestDTO;
import com.semahonu.backend.dto.BookResponseDTO;
import com.semahonu.backend.exception.ErrorResponse;
import com.semahonu.backend.exception.ErrorResponsesWithField;
import com.semahonu.backend.exception.ResourceNotFoundException;
import com.semahonu.backend.model.Book;
import com.semahonu.backend.model.User;
import com.semahonu.backend.repository.UserRepository;
import com.semahonu.backend.service.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final UserRepository userRepository;

    // 全件取得
    @GetMapping
    public List<BookResponseDTO> getAllBooks() {
        return bookService.getAllBooks().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // 登録
    @PostMapping
    public BookResponseDTO createBook(@Valid @RequestBody BookRequestDTO requestDTO) {
        Book book = new Book();
        book.setTitle(requestDTO.getTitle());
        book.setAuthor(requestDTO.getAuthor());
        book.setIsbn(requestDTO.getIsbn());
        book.setPublicationDate(requestDTO.getPublicationDate());

        if (requestDTO.getUserId() != null) {
            User user = userRepository.findById(requestDTO.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + requestDTO.getUserId()));
            book.setUser(user);
        }

        Book savedBook = bookService.createBook(book);
        return convertToResponseDTO(savedBook);
    }

    // 削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        return bookService.deleteBook(id);
    }

    // 1件取得
    @GetMapping("/{id}")
    public BookResponseDTO getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return convertToResponseDTO(book);
    }

    // 更新
    @PutMapping("/{id}")
    public BookResponseDTO updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDTO requestDTO) {
        Book updatedBook = bookService.updateBook(id, requestDTO);
        return convertToResponseDTO(updatedBook);
    }

    private BookResponseDTO convertToResponseDTO(Book book) {
        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .publicationDate(book.getPublicationDate())
                .registeredBy(book.getUser() != null ? book.getUser().getUsername() : null)
                .createdAt(book.getCreatedAt())
                .updatedAt(book.getUpdatedAt())
                .build();
    }

    // データ重複違反例外ハンドラー
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ErrorResponse errorResponse = new ErrorResponsesWithField(
                "同じタイトルと著者の組み合わせは既に存在します",
                "title");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}
