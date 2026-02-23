package com.example.demoweb.board.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="boards")
public class BoardEntiry {
    @Id
    private int idx;

    @Column(nullable = true)
    private String category;

    @Column(nullable = true)
    private String title;

    @Column(nullable = true)
    private String content;

    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String regDate;

    @Column(nullable = false)
    private int viewCount;

}
