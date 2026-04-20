package com.taskmanager.backend.task.controller.dto;

import com.taskmanager.backend.task.domain.TaskStatus;

public record UpdateTaskRequest(String title, TaskStatus status) {
}
