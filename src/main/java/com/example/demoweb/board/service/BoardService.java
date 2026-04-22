package com.example.demoweb.board.service;

import com.example.demoweb.board.dto.BoardDTO;
import com.example.demoweb.board.dto.CommentDTO;
import com.example.demoweb.board.entity.BoardEntity;
import com.example.demoweb.board.entity.CommentEntity;
import com.example.demoweb.board.repository.BoardRepository;
import com.example.demoweb.board.repository.CommentRepository;
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
    private BoardRepository boardRepository;

    @Autowired
    private CommentRepository commentRepository;

    public List<BoardDTO> getBoardTop5(String category) {
        List<BoardEntity> boardEntityList = boardRepository.findTop5ByCategoryOrderByViewCountDesc(category);

        List<BoardDTO> boardDTOList = boardEntityList.stream()
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
        List<BoardEntity> boardEntityList = boardRepository.findByCategoryOrderByRegDateDesc(category);

        List<BoardDTO> boardDTOList = boardEntityList.stream()
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

    public BoardEntity setBoardWrite(String category, BoardDTO dto) {
        LocalDate now = LocalDate.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = now.format(format);

        BoardEntity entity = new BoardEntity();

        entity.setCategory(category);
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setId(dto.getId());
        entity.setWriter(dto.getWriter());
        entity.setRegDate(date);
        entity.setViewCount(0);

        return boardRepository.save(entity);

    }

    @Transactional
    public boolean setBoardModify(String category, int idx, BoardDTO dto) {
        Optional<BoardEntity> boardOpt = boardRepository.findByCategoryAndIdx(category, idx);

        if(boardOpt.isEmpty()) {
            return false;
        }

        BoardEntity boardEntity = boardOpt.get();

        boardEntity.setTitle(dto.getTitle());
        boardEntity.setContent(dto.getContent());

        return true;
    }

    @Transactional
    public void setBoardDelete(BoardDTO dto) {
        int idx = dto.getIdx();
        String id = dto.getId();

        boardRepository.deleteByIdxAndId(idx, id);
        commentRepository.deleteByBoardIdx(idx);
    }

    public BoardEntity getBoardDetail(String category, int idx) {
        Optional<BoardEntity> boardOpt = boardRepository.findByCategoryAndIdx(category, idx);

        BoardEntity boardEntity = new BoardEntity();
        if(boardOpt.isPresent()) {
            boardEntity = boardOpt.get();
        }

        return boardEntity;
    }

    public CommentEntity setCommentWrite(int idx, CommentDTO dto) {
        LocalDate now = LocalDate.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = now.format(format);

        CommentEntity entity = new CommentEntity();

        entity.setBoardIdx(idx);
        entity.setCommentContent(dto.getCommentContent());
        entity.setCommentWriter(dto.getCommentWriter());
        entity.setCommentId(dto.getCommentId());
        entity.setRegDate(date);

        return commentRepository.save(entity);

    }

    public List<CommentDTO> getBoardCommentList(int boardId) {
        List<CommentEntity> commentEntity = commentRepository.findByBoardIdx(boardId);

        List<CommentDTO> commentDTOList = commentEntity.stream()
                .map(entity -> {
                    CommentDTO dto = new CommentDTO();
                    dto.setCommentIdx(entity.getCommentIdx());
                    dto.setCommentContent(entity.getCommentContent());
                    dto.setCommentWriter(entity.getCommentWriter());
                    dto.setCommentId(entity.getCommentId());

                    return dto;
                })
                .collect(Collectors.toList());

        return commentDTOList;
    }

    @Transactional
    public void setCommentDelete(CommentDTO dto) {
        int commentIdx = dto.getCommentIdx();
        String commentId = dto.getCommentId();

        commentRepository.deleteByCommentIdxAndCommentId(commentIdx, commentId);
    }

}
