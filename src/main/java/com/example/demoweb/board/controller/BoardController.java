package com.example.demoweb.board.controller;

import com.example.demoweb.board.dto.BoardDTO;
import com.example.demoweb.board.dto.CommentDTO;
import com.example.demoweb.board.entity.BoardEntity;
import com.example.demoweb.board.entity.CommentEntity;
import com.example.demoweb.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/{category}/write")
    public Map<String, Object> getBoardWrite(@PathVariable String category, @RequestBody BoardDTO dto) {
        BoardEntity saveEntity = boardService.setBoardWrite(category, dto);

        Map<String, Object> res = new HashMap<>();
        if(saveEntity != null) {
            res.put("success", true);
            res.put("idx", saveEntity.getIdx());

        } else {
            res.put("success", false);

        }

        return res;
    }

    @PostMapping("/{category}/modify/{idx}")
    public Map<String, Object> getBoardModify(@PathVariable String category, @PathVariable int idx, @RequestBody BoardDTO dto) {
        boolean result = boardService.setBoardModify(category, idx, dto);

        Map<String, Object> res = new HashMap<>();
        if(result) {
            res.put("success", true);
            res.put("idx", idx);

        } else {
            res.put("success", false);

        }

        return res;
    }

    @GetMapping("/{category}/detail/{idx}")
    public BoardDTO getBoardDetail(@PathVariable String category, @PathVariable int idx) {
        BoardEntity entity = boardService.getBoardDetail(category, idx);

        BoardDTO dto = new BoardDTO();

        if(entity.getTitle() != null) {
            dto.setIdx(entity.getIdx());
            dto.setId(entity.getId());
            dto.setTitle(entity.getTitle());
            dto.setContent(entity.getContent());
            dto.setWriter(entity.getWriter());
            dto.setRegDate(entity.getRegDate());
            dto.setViewCount(entity.getViewCount());

        }

        return dto;
    }


    @GetMapping("/{category}/comment/list/{idx}")
    public List<CommentDTO> getBoardCommentList(@PathVariable int idx) {
        return boardService.getBoardCommentList(idx);
    }


    @PostMapping("/{category}/comment/insert/{idx}")
    public CommentDTO setCommentWrite(@PathVariable int idx, @RequestBody CommentDTO dto) {
        CommentEntity entity = boardService.setCommentWrite(idx, dto);
        dto.setCommentId(entity.getCommentId());

        return dto;
    }

}
