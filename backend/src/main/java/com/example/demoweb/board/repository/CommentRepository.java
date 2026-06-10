package com.example.demoweb.board.repository;

import com.example.demoweb.board.entity.BoardEntity;
import com.example.demoweb.board.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
	List<CommentEntity> findByBoardIdx(int boardIdx);

	void deleteByBoardIdx(int idx);

	void deleteByCommentIdxAndCommentId(int commentIdx, String commentId);
}
