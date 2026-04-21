package com.example.demoweb.board.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    int commentId;
    int boardId;
    String commentContent;
    String commentWriter;
    String regDate;

}
