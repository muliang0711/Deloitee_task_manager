package com.taskmanager.backend.task.controller.dto;

import com.taskmanager.backend.task.domain.Task;
import com.taskmanager.backend.task.domain.TaskStatus;
import java.time.Instant;

public record TaskResponse(
    String id,
    String title,
    TaskStatus status,
    Instant createdAt,
    Instant updatedAt
) {

    public static TaskResponse from(Task task) {
        return new TaskResponse(
            task.id(),
            task.title(),
            task.status(),
            task.createdAt(),
            task.updatedAt()
        );
    }
}
