package com.example.demoweb.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDTO {
    private int idx;
    private String category;
    private String title;
    private String content;
    private String writer;
    private String regDate;
    private int viewCount;


}
