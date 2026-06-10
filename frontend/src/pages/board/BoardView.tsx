import {useEffect, useState} from 'react';
import axios from '../../api/axiosInstance';
import * as React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/useAuthStore.ts";

interface BoardDTO {
	idx: number;
	id: string;
	title: string;
	content: string;
	writer: string;
	regDate: string;
	viewCount: number;
}

interface CommentDTO {
	commentIdx: number;
	boardIdx: number;
	commentContent: string;
	commentWriter: string;
	commentId: string;
	regDate: string;
}

const BoardView = () => {
	const user = useAuthStore((state) => state.user);

	const {category, idx} = useParams();
	const navigate = useNavigate();

	const [boardView, setBoardView] = useState<BoardDTO | null>(null);
	const [commentList, setcommentList] = useState<CommentDTO[] | null>(null);

	const [commentForm, setCommentForm] = useState<CommentDTO>({
		commentIdx: 0,
		boardIdx: 0,
		commentContent: '',
		commentWriter: '',
		commentId: '',
		regDate: '',

	});

	const fetchData = async () => {
		try {
			const resBoard = await axios.get(`/api/board/${category}/detail/${idx}`);

			setBoardView(resBoard.data);

			const resComment = await axios.get(`/api/board/${category}/comment/list/${idx}`);

			setcommentList(resComment.data);

		} catch(error) {
			console.error("게시글 상세 실패:", error);

		}

	}

	useEffect(() => {
		fetchData();
	}, [category, idx]);

	if (!boardView) {
		return <div style={{ padding: '30px', textAlign: 'center' }}>데이터를 불러오는 중입니다...</div>;
	}

	const handleModify = () => {
		navigate(`/board/${category}/modify/${idx}`);
	};

	const handleBoardDelete = async() => {
		const isConfirm = window.confirm("게시글을 삭제하시겠습니까?");

		if(isConfirm) {
			const postData = {
				idx: `${idx}`,
				id: user?.id,

			}

			const res = await axios.post(`/api/board/${category}/delete`, postData);

			if(res.status == 200) {
				navigate(`/board/${category}/list`);
			} else {
				window.alert("서버와 통신에 오류가 생겨 잠시 후 다시 시도해주세요.")
			}

		}
	};

	const handleList = () => {
		navigate(`/board/${category}/list`);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
		setCommentForm( {
			...commentForm,
			[e.target.name]: e.target.value
		});
	};

	const handleComment = async() => {
		try {
			const postData = {
				boardIdx: `${idx}`,
				commentContent: commentForm.commentContent,
				commentWriter: user?.nick,
				commentId: user?.id,
			}

			await axios.post(`/api/board/${category}/comment/insert/${idx}`, postData);

			fetchData();
			setCommentForm({...commentForm, commentContent: ''});
		} catch(e) {
			console.log("에러: "+e);
		}
	}

	const handleDeleteComment = async(idx: number) => {
		const isConfirm = window.confirm("게시글을 삭제하시겠습니까?");

		if(isConfirm) {
			try {
				const postData = {
					commentIdx: idx,
					commentId: user?.id,
				}

				await axios.post(`/api/board/${category}/comment/delete`, postData);
				fetchData();

			} catch(e) {
				console.log("에러: "+e);
			}
		}
	}

	return (
		<div style={{maxWidth: '800px', margin: '0 auto'}}>

			<div style={{border: '1px solid #eee', padding: '30px', marginBottom: '20px'}}>
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
					<button type="button" onClick={handleList} style={{padding: '8px 15px', marginRight: '5px'}}>목록으로</button>
					{boardView.id == user?.id && (
					<>
					<button onClick={handleModify} style={{padding: '8px 15px', marginRight: '5px', background: '#ffc107', border: 'none'}}>수정</button>
					<button onClick={handleBoardDelete} style={{padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none'}}>삭제</button>
					</>
					)}
				</div>
			</div>

			<div style={{border: '1px solid #eee', padding: '30px'}}>
				<h3 style={{marginTop: 0, marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px'}}>
					댓글 {commentList ? commentList.length : 0}개
				</h3>

				<div style={{ marginBottom: '30px' }}>
					{commentList && commentList.length > 0 ? (
						commentList.map((comment) => (
							<div key={comment.commentIdx} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
									<div>
									<span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '0.95rem' }}>
										{comment.commentWriter}
									</span>
										<span style={{ fontSize: '0.85rem', color: '#999' }}>
										{comment.regDate}
									</span>
									</div>
									<div>
										{comment.commentId == user?.id && (
										<button onClick={() => handleDeleteComment(comment.commentIdx)}
												style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '0.85rem' }}>
											삭제
										</button>
										)}
									</div>
								</div>

								<div style={{ lineHeight: '1.5', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
									{comment.commentContent}
								</div>
							</div>
						))
					) : (
						<div style={{textAlign: 'center', color: '#999', padding: '20px 0'}}>
							댓글이 없습니다.
						</div>
					)}
				</div>

				<div style={{borderTop: '1px solid #eee', paddingTop: '20px'}}>
					<textarea onChange={handleChange} placeholder="댓글을 입력하세요" name="commentContent"
							  value={commentForm.commentContent}
							  style={{width: '100%', height: '80px', padding: '10px',
							  border: '1px solid #ddd', borderRadius: '4px',
							  resize: 'vertical', boxSizing: 'border-box'}}/>
					<div style={{textAlign: 'right', marginTop: '8px'}}>
						<button onClick={handleComment}
									style={{padding: '8px 20px', background: '#007bff',
										color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
								댓글 등록
						</button>
					</div>
				</div>
			</div>

		</div>
	);
};

export default BoardView;