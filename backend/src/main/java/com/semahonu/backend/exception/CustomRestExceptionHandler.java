// package com.semahonu.backend.exception;

// import java.util.HashMap;
// import java.util.Map;

// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.HttpStatusCode;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.converter.HttpMessageNotReadableException;
// import org.springframework.web.bind.annotation.RestControllerAdvice;
// import org.springframework.web.context.request.WebRequest;
// import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

// @RestControllerAdvice
// public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

//     @Override
//     protected ResponseEntity<Object> handleHttpMessageNotReadable(
//             HttpMessageNotReadableException ex,
//             HttpHeaders headers,
//             HttpStatusCode status,
//             WebRequest request) {

//         Map<String, Object> body = new HashMap<>();
//         String rawMessage = ex.getMessage();
//         String message = rawMessage.split(":")[0]; // コロン前だけ取る
//         body.put("status", status.value()); // ← ステータスコード
//         body.put("message", message); // ← デフォルトメッセージそのまま

//         return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
//     }
// }
