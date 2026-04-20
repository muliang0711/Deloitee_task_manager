package com.taskmanager.backend.task.service;

import com.taskmanager.backend.task.domain.Task;
import com.taskmanager.backend.task.domain.TaskStatus;
import java.util.List;

public interface TaskService {

    List<Task> getTasks();

    Task createTask(String title);

    Task updateTask(String id, String title, TaskStatus status);

    void deleteTask(String id);
}
