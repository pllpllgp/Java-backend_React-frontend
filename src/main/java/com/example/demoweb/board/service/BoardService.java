package com.example.demoweb.board.service;

import com.example.demoweb.board.dto.BoardDTO;
import com.example.demoweb.board.entity.BoardEntiry;
import com.example.demoweb.board.repository.BoardReporitory;
import com.example.demoweb.login.dto.LoginDTO;
import com.example.demoweb.login.entity.LoginEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    public boolean setBoardWrite(String category, BoardDTO dto) {
        LocalDate now = LocalDate.now();
        DateTimeFormatter fomat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = now.format(fomat);

        BoardEntiry entiry = new BoardEntiry();

        entiry.setCategory(category);
        entiry.setTitle(dto.getTitle());
        entiry.setContent(dto.getContent());
        entiry.setId(dto.getId());
        entiry.setWriter(dto.getWriter());
        entiry.setRegDate(date);
        entiry.setViewCount(0);

        boardReporitory.save(entiry);

        return true;
    }

    @Transactional
    public boolean setBoardModify(String category, int idx, BoardDTO dto) {
        Optional<BoardEntiry> boardOpt = boardReporitory.findByCategoryAndIdx(category, idx);

        if(boardOpt.isEmpty()) {
            return false;
        }

        BoardEntiry boardEntiry = boardOpt.get();

        boardEntiry.setTitle(dto.getTitle());
        boardEntiry.setContent(dto.getContent());

        return true;
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
