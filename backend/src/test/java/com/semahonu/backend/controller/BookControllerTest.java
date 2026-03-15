package com.semahonu.backend.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.semahonu.backend.exception.GlobalExceptionHandler;
import com.semahonu.backend.exception.ResourceNotFoundException;
import com.semahonu.backend.service.BookService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

@WebMvcTest({ BookController.class, GlobalExceptionHandler.class })
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean // ← @MockBean ではなく、こっち！
    private BookService bookService;

    @Test
    void タイトルと作者が空の場合は400を返す() throws Exception {
        String requestBody = """
                {
                    "title": "",
                    "author": "",
                    "isbn": "",
                    "publicationDate": ""
                }
                """;

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[*].field").value(hasItem("title")))
                .andExpect(jsonPath("$[*].message").value(hasItem("タイトルがいります")));

    }

    @ParameterizedTest
    @CsvSource({
            "'', 夏目漱石, title, タイトルがいります",
            "坊っちゃん, '', author, 著者がいります"
    })
    void バリデーションエラーのテスト(String title, String author, String field, String msg) throws Exception {
        String body = String.format("{\"title\": \"%s\", \"author\": \"%s\"}", title, author);

        performAndCheck(body, field, msg);
    }

    // 共通化メソッド
    private void performAndCheck(String json, String expectedField, String expectedMessage) throws Exception {
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[*].field").value(hasItem(expectedField)))
                .andExpect(jsonPath("$[*].message").value(hasItem(expectedMessage)));
    }

    @Test
    void 存在しないIDを削除しようとしたら404とエラーメッセージが返る() throws Exception {
        Long targetId = 1L;
        // ServiceのdeleteBookを呼び出したときに例外を投げるように設定
        when(bookService.deleteBook(targetId)).thenThrow(ResourceNotFoundException.forBook(targetId));

        mockMvc.perform(delete("/api/books/" + targetId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Book not found with id: 1"));
    }
}