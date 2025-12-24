package com.semahonu.backend.exception;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.exc.InvalidFormatException;

@RestControllerAdvice
public class GlobalExceptionHandler {

        // 引数違反例外ハンドラー
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<List<ErrorResponse>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
                List<ErrorResponse> errorResponses = ex.getBindingResult().getFieldErrors().stream()
                                .map(error -> new ErrorResponsesWithField(
                                                error.getDefaultMessage(),
                                                error.getField()))
                                .collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponses);
        }

        // データ重複違反例外ハンドラー
        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
                ErrorResponse errorResponse = new ErrorResponsesWithField(
                                "同じタイトルと著者の組み合わせは既に存在します",
                                "title");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }

        // リソース未発見例外ハンドラー
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
                ErrorResponse errorResponse = new ErrorResponse(
                                ex.getMessage());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        // JSONパース例外ハンドラー
        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<?> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {

                Throwable cause = ex.getCause();

                if (cause instanceof InvalidFormatException invalid) {

                        String field = null;

                        if (!invalid.getPath().isEmpty()) {
                                JacksonException.Reference ref = invalid.getPath().get(0);
                                field = extractFieldName(ref.toString()); // ここはそのまま使える
                        }

                        ErrorResponsesWithField errorResponsesWithField = new ErrorResponsesWithField(
                                        "日付は YYYY-MM-DD で入力してください。",
                                        field);

                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponsesWithField);
                }

                // その他のパースエラー
                ErrorResponse errorResponse = new ErrorResponse(
                                "リクエスト形式が不正です。");
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(errorResponse);
        }

        // フィールド名抽出ユーティリティ
        private String extractFieldName(String refString) {
                Pattern p = Pattern.compile("\\[\"(.+?)\"\\]");
                Matcher m = p.matcher(refString);
                if (m.find()) {
                        return m.group(1); // publicationDate
                }
                return refString; // fallback
        }

        /**
         * 本番時には以下のようなグローバル例外ハンドラーを実装して、例外発生時に適切なレスポンスを返すことが推奨されます。
         * 
         * 例:
         * 
         * @ExceptionHandler(Exception.class)
         *                                    public ResponseEntity<String>
         *                                    handleGeneric(Exception ex) {
         *                                    return
         *                                    ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
         *                                    .body("サーバーエラーが発生しました");
         *                                    }
         */

}
