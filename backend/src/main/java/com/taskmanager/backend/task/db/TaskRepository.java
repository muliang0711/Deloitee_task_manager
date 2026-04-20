package com.taskmanager.backend.task.db;

import com.taskmanager.backend.task.domain.Task;
import java.util.List;
import java.util.Optional;

public interface TaskRepository {

    List<Task> findAll();

    Optional<Task> findById(String id);

    Task save(Task task);

    void deleteById(String id);
}
