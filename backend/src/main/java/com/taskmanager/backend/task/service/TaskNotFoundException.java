package com.taskmanager.backend.task.service;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(String id) {
        super("Task " + id + " was not found.");
    }
}
