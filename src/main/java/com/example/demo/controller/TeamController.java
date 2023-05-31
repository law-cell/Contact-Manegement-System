package com.example.demo.controller;

import com.example.demo.model.Team;
import com.example.demo.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/team")
public class TeamController {
    @Autowired
    TeamService teamService;

    @GetMapping("/getAllTeams")
    public List<Team> getAllTeams() {
        return this.teamService.getAllTeam();
    }

    @PostMapping("/addNewTeam")
    public ResponseEntity<Team> addNewTeam(@RequestBody Team team) {
        this.teamService.addNewTeam(team);
        return ResponseEntity.ok(team);
    }

    @PostMapping("/addOneTeam")
    public ResponseEntity<Team> addOneTeam() {
        this.teamService.addOneTeam();
        return ResponseEntity.ok().build();
    }
}
