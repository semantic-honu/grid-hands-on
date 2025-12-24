package com.semahonu.backend.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorResponsesWithField extends ErrorResponse {
    private String field;

    public ErrorResponsesWithField(String message, String field) {
        super(message);
        this.field = field;
    }

}
