package com.example.demo.service;

import com.example.demo.model.People;
import com.example.demo.model.Team;
import com.example.demo.repository.PeopleRepository;
import com.example.demo.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TeamService {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    PeopleRepository peopleRepository;

    public void addNewTeam(Team team) {
        this.teamRepository.save(team);
    }

    public void addOneTeam() {
        Optional<People> people1 = peopleRepository.findById(1L);
        Optional<People> people2 = peopleRepository.findById(2L);
        List<People> teamMembers = new ArrayList<>();
        if (people1.isPresent() && people2.isPresent()) {
            teamMembers.add(people1.get());
            teamMembers.add(people2.get());
        }

        Team team = Team.builder()
                .name("BPS")
                .teamMembers(teamMembers)
                .build();

        teamMembers.forEach(people -> people.setTeam(team));
        this.teamRepository.save(team);
    }

    public void deleteTeam() {

    }

    @Transactional
    public void addNewMemberToTeam(Long id, People newMember) {
        Optional<Team> team = getTeamById(id);
        if (team.isPresent()) {
            List<People> teamMembers = team.get().getTeamMembers();
            teamMembers.add(newMember);
            this.teamRepository.save(team.get());
        }
    }

    public Optional<Team> getTeamById(Long id) {
        return this.teamRepository.findById(id);
    }

    public List<Team> getAllTeam() {
        return this.teamRepository.findAll();
    }
}
