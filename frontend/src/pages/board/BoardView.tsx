import {useEffect, useState} from 'react';
import axios from 'axios';
import * as React from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

interface BoardDTO {
    idx: number;
    title: string;
    content: string;
    writer: string;
    regDate: string;
    viewCount: number;
}

const BoardView = () => {
    const {category, idx} = useParams();
    const navigate = useNavigate();

    const [boardView, setBoardView] = useState<BoardDTO | null>(null);

    useEffect(() => {
        const batchBoardView = async() => {
            try {
                const res = await axios.get(`http://localhost:8080/api/board/${category}/detail/${idx}`);

                setBoardView(res.data);

            } catch(error) {
                console.error("게시글 상세 실패:", error);

            }
        }

        batchBoardView();
    }, [category, idx]);

    if (!boardView) {
        return <div style={{ padding: '30px', textAlign: 'center' }}>데이터를 불러오는 중입니다...</div>;
    }

    const handleModify = () => {
        navigate(`/board/${category}/modify/${idx}`);
    };

    return (
        <div style={{maxWidth: '800px', margin: '0 auto', border: '1px solid #eee', padding: '30px'}}>
            <h1 style={{borderBottom: '1px solid #ddd', paddingBottom: '10px'}}>
                {boardView.title}
            </h1>
            <div style={{color: '#666', marginBottom: '20px', fontSize: '0.9rem'}}>
                <span>작성자: {boardView.writer}</span> | <span>작성일: {boardView.regDate}</span>
            </div>
            <div style={{minHeight: '400px', lineHeight: '1.6', marginBottom: '30px'}}>
                {boardView.content}
            </div>
            <div style={{borderTop: '1px solid #ddd', paddingTop: '20px', textAlign: 'right'}}>
                <button style={{padding: '8px 15px', marginRight: '5px'}}>목록으로</button>
                <button onClick={handleModify} style={{padding: '8px 15px', marginRight: '5px', background: '#ffc107', border: 'none'}}>수정
                </button>
                <button style={{padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none'}}>삭제</button>
            </div>
        </div>
    );
};

export default BoardView;