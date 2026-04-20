package com.taskmanager.backend.task.domain;

import java.time.Instant;

public record Task(
    String id,
    String title,
    TaskStatus status,
    Instant createdAt,
    Instant updatedAt
) {

    public Task withTitleAndStatus(String newTitle, TaskStatus newStatus, Instant updatedTimestamp) {
        return new Task(id, newTitle, newStatus, createdAt, updatedTimestamp);
    }
}
