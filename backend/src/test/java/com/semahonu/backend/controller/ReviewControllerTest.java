package com.semahonu.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.semahonu.backend.exception.GlobalExceptionHandler;
import com.semahonu.backend.service.ReviewService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasItem;

@WebMvcTest({ ReviewController.class, GlobalExceptionHandler.class })
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReviewService reviewService;

    @Test
    void レビュアーとコメントと評価が空の場合は400を返す() throws Exception {
        String requestBody = """
                {
                    "reviewer": "",
                    "comment": "",
                    "rating": null
                }
                """;

        mockMvc.perform(post("/api/books/1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[*].field").value(hasItem("reviewer")))
                .andExpect(jsonPath("$[*].message").value(hasItem("レビュアーがいります")))
                .andExpect(jsonPath("$[*].field").value(hasItem("comment")))
                .andExpect(jsonPath("$[*].message").value(hasItem("コメントがいります")))
                .andExpect(jsonPath("$[*].field").value(hasItem("rating")))
                .andExpect(jsonPath("$[*].message").value(hasItem("評価がいります")));
    }

    @Test
    void 評価が範囲外の場合は400を返す() throws Exception {
        String requestBody = """
                {
                    "reviewer": "テスト太郎",
                    "comment": "良い本です",
                    "rating": 6
                }
                """;

        mockMvc.perform(post("/api/books/1/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[*].field").value(hasItem("rating")))
                .andExpect(jsonPath("$[*].message").value(hasItem("評価は5以下で入力してください")));
    }
}
