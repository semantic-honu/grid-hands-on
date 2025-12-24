package com.semahonu.backend.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.semahonu.backend.dto.BookRequestDTO;
import com.semahonu.backend.exception.ResourceNotFoundException;
import com.semahonu.backend.model.Book;
import com.semahonu.backend.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAllByOrderByIdAsc();
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public ResponseEntity<Void> deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw ResourceNotFoundException.forBook(id);
        }
        bookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public boolean existsById(Long id) {
        return bookRepository.existsById(id);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forBook(id));
    }

    public Book updateBook(Long id, BookRequestDTO updatedBook) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forBook(id));

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setPublicationDate(updatedBook.getPublicationDate());

        return bookRepository.save(existingBook);
    }
}
