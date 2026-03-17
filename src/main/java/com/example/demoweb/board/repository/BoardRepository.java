package com.example.demoweb.board.repository;

import com.example.demoweb.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findTop5ByCategoryOrderByViewCountDesc(String category);

    List<BoardEntity> findByCategory(String category);

    Optional<BoardEntity> findByCategoryAndIdx(String category, int idx);

}
