import axios from '../../api/axiosInstance';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const SERVER_BASE_URL = 'https://backend-server-mmi8.onrender.com';
//const SERVER_BASE_URL = '';

interface BoardDTO {
	idx: number;
	title: string;
	writer: string;
	regDate: string;
	viewCount: number;
}

const Main = () => {
	const navigate = useNavigate();

	const [gameBoard, setGameBoard] = useState<BoardDTO[]>([]);
	const [movieBoard, setMovieBoard] = useState<BoardDTO[]>([]);
	const [musicBoard, setMusicBoard] = useState<BoardDTO[]>([]);
	const [noticeBoard, setNoticeBoard] = useState<BoardDTO[]>([]);

	useEffect(() => {
		const fetchBoardList = async() => {
			const [gameRes,
					movieRes,
					musicRes,
					noticeRes] = await Promise.all([
						axios.get(`${SERVER_BASE_URL}/api/board/game/top5`).catch(() => ({data: []})),
						axios.get(`${SERVER_BASE_URL}/api/board/movie/top5`).catch(() => ({data: []})),
						axios.get(`${SERVER_BASE_URL}/api/board/music/top5`).catch(() => ({data: []})),
						axios.get(`${SERVER_BASE_URL}/api/board/notice/top5`).catch(() => ({data: []})),
			]);

			setGameBoard(gameRes.data);
			setMovieBoard(movieRes.data);
			setMusicBoard(musicRes.data);
			setNoticeBoard(noticeRes.data);

		};

		fetchBoardList();
	}, []);

	const renderList = (boardList: BoardDTO[], category: string) => {
		if (boardList.length === 0) {
			return <li style={{ textAlign: 'center', color: '#999', padding: '20px' }}>등록된 글이 없습니다.</li>;
		}

		return boardList.map((dto) => (
			<li key={dto.idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #eee' }}>
				<span
					onClick={() => navigate(`/board/${category}/detail/${dto.idx}`)}
					style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}
					onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
					onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}>
					{dto.title}
				</span>
				<span style={{ color: '#aaa', fontSize: '0.85rem' }}>{dto.regDate}</span>
			</li>
		));
	}

	return (
		<div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
			<h2 style={{ marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
				통합 대시보드
			</h2>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

				<div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
						<h3 style={{ margin: 0, fontSize: '1.2rem' }}>🎮 GAME 게시판</h3>
						<button onClick={() => navigate(`/board/game/list`)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#888' }}>더보기 +</button>
					</div>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{renderList(gameBoard, 'game')}
					</ul>
				</div>

				<div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #dc3545', paddingBottom: '10px' }}>
						<h3 style={{ margin: 0, fontSize: '1.2rem' }}>🎬 MOVIE 게시판</h3>
						<button onClick={() => navigate(`/board/movie/list`)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#888' }}>더보기 +</button>
					</div>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{renderList(movieBoard, 'movie')}
					</ul>
				</div>

				<div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>
						<h3 style={{ margin: 0, fontSize: '1.2rem' }}>🎵 음악 게시판</h3>
						<button onClick={() => navigate(`/board/music/list`)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#888' }}>더보기 +</button>
					</div>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{renderList(musicBoard, 'music')}
					</ul>
				</div>

				<div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #ffc107', paddingBottom: '10px' }}>
						<h3 style={{ margin: 0, fontSize: '1.2rem' }}>📢 공지사항</h3>
						<button onClick={() => navigate(`/board/notice/list`)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#888' }}>더보기 +</button>
					</div>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{renderList(noticeBoard, 'notice')}
					</ul>
				</div>

			</div>
		</div>
	);
};

export default Main;