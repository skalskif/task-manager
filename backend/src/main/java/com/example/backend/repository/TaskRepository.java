package com.example.backend.repository;

import com.example.backend.model.Task;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Transactional
    void deleteTaskById(Long id);

    Optional<Task> findTaskById(Long id);

    Optional<List<Task>> findByNameContaining(String contains, Pageable pagingSort);
}
