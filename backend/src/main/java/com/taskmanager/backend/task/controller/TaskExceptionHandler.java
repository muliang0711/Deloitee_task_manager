package com.taskmanager.backend.task.controller;

import com.taskmanager.backend.task.service.TaskNotFoundException;
import com.taskmanager.backend.task.service.TaskValidationException;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TaskExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    ResponseEntity<Map<String, String>> handleNotFound(TaskNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("message", exception.getMessage()));
    }

    @ExceptionHandler(TaskValidationException.class)
    ResponseEntity<Map<String, String>> handleValidation(TaskValidationException exception) {
        return ResponseEntity.badRequest()
            .body(Map.of("message", exception.getMessage()));
    }
}
