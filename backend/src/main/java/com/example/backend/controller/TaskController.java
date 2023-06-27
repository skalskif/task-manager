package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.response.ResponseHandler;
import com.example.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;
    private final AtomicLong counter = new AtomicLong();

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllTasks() {
        List<Task> tasks = taskService.findAllTasks();
        return ResponseHandler.generateResponse(counter.incrementAndGet(), HttpStatus.OK, tasks);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Object> getTask(@PathVariable("id") Long id) {
        Task task = taskService.findTaskById(id);
        return ResponseHandler.generateResponse(counter.incrementAndGet(), HttpStatus.OK, task);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addTask(@RequestBody Task task) {
        Task newTask = taskService.addTask(task);
        return ResponseHandler.generateResponse(counter.incrementAndGet(), HttpStatus.CREATED, newTask);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateTask(@RequestBody Task task) {
        Task updatedTask = taskService.updateTask(task);
        return ResponseHandler.generateResponse(counter.incrementAndGet(), HttpStatus.OK, updatedTask);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseHandler.generateResponse(counter.incrementAndGet(), HttpStatus.OK, null);
    }
}
