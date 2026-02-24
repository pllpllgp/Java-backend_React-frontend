import {useEffect, useState} from 'react';
import axios from 'axios';
import * as React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/useAuthStore";

interface BoardDTO {
    id: string;
    title: string;
    content: string;
    writer: string;
    regDate: string;
    viewCount: number;
}

const BoardForm = () => {
    const user = useAuthStore((state) => state.user);

    const {category, idx} = useParams();
    const navigate = useNavigate();

    const isEditMode = !!idx;

    const [boardForm, setBoarForm] = useState<BoardDTO>({
        id: '',
        title: '',
        content: '',
        writer: '',
        regDate: '',
        viewCount: 0,

    });

    useEffect(() => {
        if(isEditMode) {
            const fetchBoardDetail = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/api/board/${category}/detail/${idx}`);

                    setBoarForm(res.data);
                    console.log(res.data.title);
                } catch(error) {
                    console.error("게시글 상세 실패:", error);

                }
            };

            fetchBoardDetail();

        }
    }, [category, idx]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setBoarForm( {
            ...boardForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const postData = {
                id: user?.id,
                title: boardForm.title,
                content: boardForm.content,
                writer: user?.nick,
            }

            let result = false;

            if(isEditMode) {
                const res = await axios.post(`http://localhost:8080/api/board/${category}/modify/${idx}`, postData);
                result = res.data.success;

            } else {
                const res = await axios.post(`http://localhost:8080/api/board/${category}/write`, postData);
                result = res.data.success;

            }


            if(result) {
                navigate(`/board/${category}/list`);
            }

        } catch (error) {
            console.log('글 등록 중 에러 발생: ', error);
            alert('글 등록 중 에러 발생');

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                <h2>게시글 작성</h2>
                <div style={{marginTop: '20px'}}>
                    <div style={{marginBottom: '15px'}}>
                        <label style={{display: 'block', marginBottom: '5px'}}>제목</label>
                        <input type="text"
                               name = "title"
                               onChange={handleChange}
                               style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}
                               placeholder="제목을 입력하세요"
                               value={boardForm.title}/>
                    </div>
                    <div style={{marginBottom: '15px'}}>
                        <label style={{display: 'block', marginBottom: '5px'}}>내용</label>
                        <textarea name = "content"
                            onChange={handleChange}
                            style={{
                            width: '100%',
                            height: '300px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'}}
                            placeholder="내용을 입력하세요"
                            value={boardForm.content}/>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <button style={{
                            padding: '10px 20px',
                            marginRight: '10px',
                            background: '#6c757d',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px'
                        }}>취소
                        </button>
                        <button style={{
                            padding: '10px 20px',
                            background: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px'
                        }}>저장
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BoardForm;