import {useEffect, useState} from 'react';
import axios from '../../api/axiosInstance';
import {useParams, useNavigate} from "react-router-dom";

interface BoardDTO {
	idx: number;
	title: string;
	writer: string;
	regDate: string;
	viewCount: number;
}

const BoardList = () => {
	const {category} = useParams();
	const navigate = useNavigate();

	const [boardList, setBoardList] = useState<BoardDTO[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 카테고리가 바뀌거나 처음 들어왔을 때 서버에서 리스트를 가져옴
		const fetchBoardList = async () => {
			try {
				// 백엔드 API 호출: GET /api/board/{category}/list
				//const response = await axios.get(`/api/board/${category}/list`);
				const response = await axios.get(`https://backend-server-mmi8.onrender.com/api/board/${category}/list`);
				setBoardList(response.data); // 가져온 데이터를 State에 저장
				setLoading(false); // 로딩 끝

			} catch(error) {
				console.error("게시글 로딩 실패:", error);
				setLoading(false);

			}
		};

		fetchBoardList();
	}, [category]);

	const handleWrite = () => {
		navigate(`/board/${category}/form`);
	};

	const handleDetail = (idx: number) => {
		navigate(`/board/${category}/detail/${idx}`);
	};

	return (
		<div style={{padding: '20px', maxWidth: '1000px', margin: '0 auto'}}>
			<h2 style={{borderBottom: '2px solid #333', paddingBottom: '10px'}}>
				{category?.toUpperCase()} 게시판
			</h2>

			{/* 글쓰기 버튼 영역 */}
			<div style={{textAlign: 'right', marginBottom: '10px'}}>
				<button
					onClick={handleWrite}
					style={{
						padding: '8px 16px',
						background: '#007bff',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					글쓰기
				</button>
			</div>

			{/* 게시글 목록 테이블 */}
			<table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'center'}}>
				<thead style={{backgroundColor: '#f8f9fa'}}>
				<tr>
					<th style={{padding: '12px', borderBottom: '1px solid #ddd'}}>번호</th>
					<th style={{padding: '12px', borderBottom: '1px solid #ddd'}}>제목</th>
					<th style={{padding: '12px', borderBottom: '1px solid #ddd'}}>작성자</th>
					<th style={{padding: '12px', borderBottom: '1px solid #ddd'}}>작성일</th>
					<th style={{padding: '12px', borderBottom: '1px solid #ddd'}}>조회수</th>
				</tr>
				</thead>
				<tbody>
				{loading ? (
					<tr>
						<td colSpan={5} style={{padding: '20px'}}>로딩 중...</td>
					</tr>
				) : boardList.length === 0 ? (
					<tr>
						<td colSpan={5} style={{padding: '20px'}}>등록된 게시글이 없습니다.</td>
					</tr>
				) : (
					// map 함수로 반복 렌더링 (JSP의 c:forEach 역할)
					boardList.map((board, index) => (
						<tr key={board.idx} style={{borderBottom: '1px solid #eee'}}>
							<td style={{padding: '10px'}}>{boardList.length - index}</td>
							<td onClick={() => handleDetail(board.idx)}
								style={{
									padding: '10px',
									textAlign: 'left',
									cursor: 'pointer',
									color: '#333',
									textDecoration: 'none'
								}}
								onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
								onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
							>
								{board.title}
							</td>
							<td style={{padding: '10px'}}>{board.writer}</td>
							<td style={{padding: '10px'}}>{board.regDate}</td>
							<td style={{padding: '10px'}}>{board.viewCount}</td>
						</tr>
					))
				)}
				</tbody>
			</table>
		</div>
	);
};

export default BoardList;