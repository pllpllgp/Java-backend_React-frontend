package com.example.demoweb.board.controller;

import com.example.demoweb.board.dto.BoardDTO;
import com.example.demoweb.board.entity.BoardEntiry;
import com.example.demoweb.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @GetMapping("/{category}/top5")
    public List<BoardDTO> getBoardTop5(@PathVariable String category) {
        return boardService.getBoardTop5(category);
    }

    @GetMapping("/{category}/list")
    public List<BoardDTO> getBoardlist(@PathVariable String category) {
        return boardService.getBoardlist(category);
    }

    @GetMapping("/{category}/detail/{idx}")
    public BoardDTO getBoardDetail(@PathVariable String category, @PathVariable int idx) {
        BoardEntiry entity = boardService.getBoardDetail(category, idx);

        BoardDTO dto = new BoardDTO();

        if(entity.getTitle() != null) {
            dto.setIdx(entity.getIdx());
            dto.setTitle(entity.getTitle());
            dto.setContent(entity.getContent());
            dto.setWriter(entity.getWriter());
            dto.setRegDate(entity.getRegDate());

        }

        return dto;
    }

}
