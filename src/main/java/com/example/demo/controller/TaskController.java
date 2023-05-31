package com.example.demo.controller;

import com.example.demo.DTO.GanttCrudModel;
import com.example.demo.DTO.GanttTaskWrapper;
import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping("/getAllTasks")
    public GanttTaskWrapper getAllTasks() {
        return this.taskService.getAllTaskDTOs();
    }



    @PostMapping("/batchUrl")
    public ResponseEntity<List<Task>> BatchUpdate(@RequestBody GanttCrudModel batchModel) {
        List<Task> responseBody = new ArrayList<>();
        if (batchModel.changed != null && batchModel.changed.size() > 0)
        {
            for (int i = 0; i < batchModel.changed.size(); i++)
            {
                Task newTask = batchModel.changed.get(i);
                this.taskService.updateTask(newTask);
            }
            responseBody.addAll(batchModel.changed);
            return ResponseEntity.ok(responseBody);
        }
        if (batchModel.deleted != null && batchModel.deleted.size() > 0)
        {
            for (int i = 0; i < batchModel.deleted.size(); i++)
            {
                Task newTask = batchModel.deleted.get(i);
                this.taskService.deleteTask(newTask);
                removeChildRecords(newTask.getId());
            }
            responseBody.addAll(batchModel.deleted);
        }
        if (batchModel.added != null && batchModel.added.size() > 0)
        {
            for (int i = 0; i < batchModel.added.size(); i++)
            {
                Task newTask = batchModel.added.get(i);
                this.taskService.addTask(newTask);
            }
            responseBody.addAll(batchModel.added);
        }

        return ResponseEntity.ok(responseBody);
    }

    public void removeChildRecords(Long key) {
        List<Task> allTasks = this.taskService.getAllTasks();
        List<Task> childList = new ArrayList<>();
        for (Task task : allTasks) {
            if (task.getParentTask() == null) continue;
            if (task.getParentTask().getId() == key) {
                childList.add(task);
            }
        }
        for (Task item : childList) {
            this.taskService.deleteTask(item);
            removeChildRecords(item.getId());
        }
    }


}
