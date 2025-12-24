package com.semahonu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.semahonu.backend.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    // Idでソート
    List<Book> findAllByOrderByIdAsc();


}
