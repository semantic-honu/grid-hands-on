package com.semahonu.backend.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.semahonu.backend.exception.GlobalExceptionHandler;
import com.semahonu.backend.service.BookService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.hamcrest.Matchers.hasItem;

@WebMvcTest({ BookController.class, GlobalExceptionHandler.class })
@WithMockUser
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

        mockMvc.perform(post("/api/books").with(csrf())
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
        mockMvc.perform(post("/api/books").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[*].field").value(hasItem(expectedField)))
                .andExpect(jsonPath("$[*].message").value(hasItem(expectedMessage)));
    }

    // @Test
    // void 存在しないIDを削除しようとしたら404とエラーメッセージが返る() throws Exception {
    //     Long targetId = 1L;
    //     // ServiceがNotFoundを投げる、もしくはControllerがexistsをチェックしてNotFoundになる設定
    //     when(bookService.existsById(anyLong())).thenReturn(false);

    //     mockMvc.perform(delete("/api/books/" + targetId).with(csrf()))
    //             .andDo(print())
    //             .andExpect(status().isNotFound())
    //             .andExpect(jsonPath("$.error").value("データが見つかりません"))
    //             .andExpect(jsonPath("$.details").value(containsString("Book not found with id: 1")));
    // }
}