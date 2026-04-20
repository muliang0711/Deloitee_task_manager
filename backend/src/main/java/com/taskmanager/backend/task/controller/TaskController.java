package com.taskmanager.backend.task.controller;

import com.taskmanager.backend.task.controller.dto.CreateTaskRequest;
import com.taskmanager.backend.task.controller.dto.TaskResponse;
import com.taskmanager.backend.task.controller.dto.UpdateTaskRequest;
import com.taskmanager.backend.task.domain.Task;
import com.taskmanager.backend.task.service.TaskService;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> getTasks() {
        return taskService.getTasks().stream()
            .map(TaskResponse::from)
            .toList();
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody CreateTaskRequest request) {
        Task task = taskService.createTask(request.title());

        return ResponseEntity.created(URI.create("/api/tasks/" + task.id()))
            .body(TaskResponse.from(task));
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(@PathVariable String id, @RequestBody UpdateTaskRequest request) {
        return TaskResponse.from(taskService.updateTask(id, request.title(), request.status()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
