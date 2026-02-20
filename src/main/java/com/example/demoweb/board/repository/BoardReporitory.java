package com.example.demoweb.board.repository;

import com.example.demoweb.board.entity.BoardEntiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardReporitory  extends JpaRepository<BoardEntiry, String> {
    List<BoardEntiry> findTop5ByCategoryOrderByViewCountDesc(String category);

    List<BoardEntiry> findByCategory(String category);

    Optional<BoardEntiry> findByCategoryAndIdx(String category, int idx);

}
