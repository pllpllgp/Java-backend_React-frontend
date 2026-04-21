package com.example.demoweb.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="comments", schema="board")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int commentId;

    @Column(nullable = true)
    int boardId;

    @Column(nullable = true)
    String commentContent;

    @Column(nullable = true)
    String commentWriter;

    @Column(nullable = true)
    String regDate;
}
