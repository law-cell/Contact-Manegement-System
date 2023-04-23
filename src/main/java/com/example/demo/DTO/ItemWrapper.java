package com.example.demo.DTO;

import com.example.demo.model.People;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ItemWrapper {
    private List<People> result;
    private int count;
    public ItemWrapper(List<People> result, int count) {
        this.result = result;
        this.count = count;
    }
}