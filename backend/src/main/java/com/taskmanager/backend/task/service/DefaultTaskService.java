package com.taskmanager.backend.task.service;

import com.taskmanager.backend.task.db.TaskRepository;
import com.taskmanager.backend.task.domain.Task;
import com.taskmanager.backend.task.domain.TaskStatus;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class DefaultTaskService implements TaskService {

    private final TaskRepository taskRepository;

    public DefaultTaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getTasks() {
        return taskRepository.findAll().stream()
            .sorted(Comparator.comparing(Task::createdAt))
            .toList();
    }

    @Override
    public Task createTask(String title) {
        String normalizedTitle = validateTitle(title);
        Instant now = Instant.now();
        Task task = new Task(UUID.randomUUID().toString(), normalizedTitle, TaskStatus.PENDING, now, now);
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(String id, String title, TaskStatus status) {
        String normalizedTitle = validateTitle(title);
        TaskStatus normalizedStatus = status == null ? TaskStatus.PENDING : status;
        Task existingTask = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));

        Task updatedTask = existingTask.withTitleAndStatus(normalizedTitle, normalizedStatus, Instant.now());
        return taskRepository.save(updatedTask);
    }

    @Override
    public void deleteTask(String id) {
        taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));

        taskRepository.deleteById(id);
    }

    private String validateTitle(String title) {
        if (title == null || title.isBlank()) {
            throw new TaskValidationException("Task title is required.");
        }

        return title.trim();
    }
}
