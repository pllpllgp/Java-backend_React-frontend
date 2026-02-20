package com.example.demoweb.board.service;

import com.example.demoweb.board.dto.BoardDTO;
import com.example.demoweb.board.entity.BoardEntiry;
import com.example.demoweb.board.repository.BoardReporitory;
import com.example.demoweb.login.entity.LoginEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {

    @Autowired
    private BoardReporitory boardReporitory;

    public List<BoardDTO> getBoardTop5(String category) {
        List<BoardEntiry> boardEntiryList = boardReporitory.findTop5ByCategoryOrderByViewCountDesc(category);

        List<BoardDTO> boardDTOList = boardEntiryList.stream()
                .map(entity -> {
                    BoardDTO dto = new BoardDTO();
                    dto.setIdx(entity.getIdx());
                    dto.setTitle(entity.getTitle());
                    dto.setWriter(entity.getWriter());
                    dto.setRegDate(entity.getRegDate());

                    return dto;
                })
                .collect(Collectors.toList());

        return boardDTOList;
    }

    public List<BoardDTO> getBoardlist(String category) {
        List<BoardEntiry> boardEntiryList = boardReporitory.findByCategory(category);

        List<BoardDTO> boardDTOList = boardEntiryList.stream()
                .map(entity -> {
                    BoardDTO dto = new BoardDTO();
                    dto.setIdx(entity.getIdx());
                    dto.setTitle(entity.getTitle());
                    dto.setWriter(entity.getWriter());
                    dto.setRegDate(entity.getRegDate());

                    return dto;
                })
                .collect(Collectors.toList());

        return boardDTOList;
    }

    public BoardEntiry getBoardDetail(String category, int idx) {
        Optional<BoardEntiry> boardOpt = boardReporitory.findByCategoryAndIdx(category, idx);

        BoardEntiry boardEntiry = new BoardEntiry();
        if(boardOpt.isPresent()) {
            boardEntiry = boardOpt.get();
        }

        return boardEntiry;
    }
}
