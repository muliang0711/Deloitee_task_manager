package com.taskmanager.backend.task.db;

import com.taskmanager.backend.task.domain.Task;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryTaskRepository implements TaskRepository {

    private final ConcurrentHashMap<String, Task> storage = new ConcurrentHashMap<>();

    @Override
    public List<Task> findAll() {
        return new ArrayList<>(storage.values());
    }

    @Override
    public Optional<Task> findById(String id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public Task save(Task task) {
        storage.put(task.id(), task);
        return task;
    }

    @Override
    public void deleteById(String id) {
        storage.remove(id);
    }
}
