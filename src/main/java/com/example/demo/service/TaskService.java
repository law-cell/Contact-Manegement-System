package com.example.demo.service;

import com.example.demo.DTO.GanttTaskWrapper;
import com.example.demo.DTO.TaskDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.People;
import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public GanttTaskWrapper getAllTaskDTOs() {
        List<Task> taskList = this.taskRepository.findAll();
        List<TaskDTO> taskDTOList = new ArrayList<>();
        for (Task task : taskList) {
            if (task.getParentTask() != null) continue;
            List<Long> peopleId = new ArrayList<>();
            for (People people : task.getResources()) {
                peopleId.add(people.getId());
            }
            TaskDTO taskDTO = TaskDTO.builder()
                    .parentTask(task.getParentTask())
                    .id(task.getId())
                    .name(task.getName())
                    .duration(task.getDuration())
                    .startDate(task.getStartDate())
                    .endDate(task.getEndDate())
                    .resources(peopleId)
                    .progress(task.getProgress())
                    .subtasks(task.getSubtasks())
                    .build();
            taskDTOList.add(taskDTO);
        }
        int count = taskList.size();
        return new GanttTaskWrapper(taskDTOList, count);
    }

    public List<Task> getAllTasks() {
        return this.taskRepository.findAll();
    }

    public void addTask(Task task) {
        this.taskRepository.save(task);
    }

    public void deleteTask(Task task) {
        this.taskRepository.deleteById(task.getId());
    }

    public Task generateOneTask() {
        Task task = Task.builder()
                .duration(1)
                .name("text")
                .progress(50)
                .startDate(new Date(2023, Calendar.APRIL, 27))
                .endDate(new Date(2023, Calendar.APRIL, 28))
                .build();

        return task;
    }

    @Transactional
    public void updateTask(Task updatedTask) {
        Optional<Task> existingTask = this.taskRepository.findById(updatedTask.getId());
        if (existingTask.isPresent()) {
            updatedTask.getSubtasks().forEach(task1 -> task1.setParentTask(updatedTask));
            Task task = existingTask.get();
            task.setName(updatedTask.getName());
            task.setDuration(updatedTask.getDuration());
            task.setProgress(updatedTask.getProgress());
            task.setStartDate(updatedTask.getStartDate());
            task.setEndDate(updatedTask.getEndDate());
            task.setParentTask(updatedTask.getParentTask());
            task.setResources(updatedTask.getResources());
            task.setSubtasks(updatedTask.getSubtasks());
            taskRepository.save(task);
        } else {
            throw new ResourceNotFoundException("Event not found with id " + updatedTask.getId());
        }
    }

    public Optional<Task> getTaskById(Long id) {
        return this.taskRepository.findById(id);
    }
}
