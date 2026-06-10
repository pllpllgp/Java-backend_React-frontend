package com.example.demoweb.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="boards", schema="board")
public class BoardEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
