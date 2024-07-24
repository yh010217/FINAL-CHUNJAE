package com.chunjae.chunjaefull5final.dto;

import java.util.List;

public class IdNameListDTO {
    private Long id;
    private String name;

    private List<IdNameListDTO> list; // topic 에선 null 로 가 ;;

    private int itemNo;


    public IdNameListDTO(Long id, String name, List<IdNameListDTO> list) {
        this.id = id;
        this.name = name;
        this.list = list;
    }
    public IdNameListDTO(Long id, String name, List<IdNameListDTO> list, int itemNo) {
        this.id = id;
        this.name = name;
        this.list = list;
        this.itemNo = itemNo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<IdNameListDTO> getList() {
        return list;
    }

    public void setList(List<IdNameListDTO> list) {
        this.list = list;
    }

    public int getItemNo() {
        return itemNo;
    }

    public void setItemNo(int itemNo) {
        this.itemNo = itemNo;
    }
}