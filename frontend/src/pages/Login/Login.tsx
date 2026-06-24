import {useState, useEffect} from 'react';
import axios from '../../api/axiosInstance';
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from '../../store/useAuthStore';

const SERVER_BASE_URL = 'https://backend-server-mmi8.onrender.com';
//const SERVER_BASE_URL = '';

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		id: '',
		password: '',

	});

	const [isLoading, setIsLoading] = useState(false);
	const [serverStatus, setServerStatus] = useState<'checking' | 'connected' | 'error'>('checking');

	useEffect(() => {
		axios.get(`${SERVER_BASE_URL}/api/health`)
			.then(() => setServerStatus('connected'))
			.catch(() => setServerStatus('error'));
	}, []);

	const login = useAuthStore((state) => state.login);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const res = await axios.post(`${SERVER_BASE_URL}/api/login`, loginData);

			if(res.data.id) {
				login({
					id: res.data.id,
					name: res.data.name,
					nick: res.data.nick,
					grade: res.data.grade,

				},
				res.data.token);

				await Promise.allSettled([
					axios.get(`${SERVER_BASE_URL}/api/board/game/top5`),
					axios.get(`${SERVER_BASE_URL}/api/board/movie/top5`),
					axios.get(`${SERVER_BASE_URL}/api/board/music/top5`),
					axios.get(`${SERVER_BASE_URL}/api/board/notice/top5`),
				]);

				navigate('/main');

			} else {
				alert('로그인 실패');
			}

		} catch(error) {
			console.log('로그인 중 에러 발생: ', error);
			alert('통신 중 에러 발생');

		} finally {
			setIsLoading(false);
		}
	}

	const handleSignup = () => {
		navigate('/signup');
	}

	return (
		<>
			{isLoading && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 9999,
				}}>
					<div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
						로그인 처리 중입니다...
					</div>
				</div>
			)}

			<div style={{maxWidth: '400px', margin: '50px auto', textAlign: 'center'}}>
				<h2>로그인</h2>

				{serverStatus === 'checking' && (
					<div style={{
						backgroundColor: '#fff3cd',
						color: '#856404',
						padding: '12px',
						borderRadius: '4px',
						marginBottom: '20px',
						fontSize: '0.85rem',
						textAlign: 'left',
						lineHeight: '1.5'
					}}>
						<strong>서버를 재기동 중 입니다. 재기동은 5~7분 정도 소요됩니다.</strong>
					</div>
				)}
				{serverStatus === 'connected' && (
					<div style={{
						backgroundColor: '#d1e7dd',
						color: '#0f5132',
						padding: '12px',
						borderRadius: '4px',
						marginBottom: '20px',
						fontSize: '0.85rem',
						textAlign: 'left',
						lineHeight: '1.5'
					}}>
						로그인하실 수 있습니다.
					</div>
				)}
				{serverStatus === 'error' && (
					<div style={{
						backgroundColor: '#f8d7da',
						color: '#842029',
						padding: '12px',
						borderRadius: '4px',
						marginBottom: '20px',
						fontSize: '0.85rem',
						textAlign: 'left',
						lineHeight: '1.5'
					}}>
						<strong>서버에 연결할 수 없습니다.</strong> 잠시 후 다시 시도해주세요.
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div style={{
						textAlign: 'right',
						fontSize: '0.8rem',
						color: '#666',
						marginBottom: '5px'
					}}>
						Test ID: <strong>test</strong> / Password: <strong>123</strong>
					</div>

					<div style={{marginBottom: '10px'}}>
						<input name="id"
							   placeholder="아이디"
							   onChange={handleChange}
							   style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}
						/>
					</div>
					<div style={{marginBottom: '20px'}}>
						<input name="password"
							   type="password"
							   placeholder="비밀번호"
							   onChange={handleChange}
							   style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}
						/>
					</div>

					<div style={{marginBottom: '10px'}}>
						<button type="submit" disabled={serverStatus !== 'connected'} style={{
							width: '100%',
							padding: '10px',
							backgroundColor: serverStatus !== 'connected' ? '#aaa' : '#000000',
							color: 'white',
							border: 'none',
							boxSizing: 'border-box',
							cursor: serverStatus !== 'connected' ? 'not-allowed' : 'pointer'
						}}>
							로그인
						</button>
					</div>
					<button type="button" onClick={() => handleSignup()} disabled={serverStatus !== 'connected'}
							style={{
								width: '100%',
								padding: '10px',
								backgroundColor: serverStatus !== 'connected' ? '#aaa' : '#007bff',
								color: 'white',
								border: 'none',
								boxSizing: 'border-box',
								cursor: serverStatus !== 'connected' ? 'not-allowed' : 'pointer'
							}}>
						회원가입
					</button>
				</form>

				<hr style={{margin: '40px 0', border: '0.5px solid #eee'}}/>

				<div style={{color: '#666'}}>
					<h3>현재 적용된 기술 스택</h3>
					<ul style={{listStyle: 'none', padding: 0}}>
						<li>Backend: Java (Spring Boot)</li>
						<li>Frontend: React + TypeScript</li>
						<li>Database: PostgreSQL</li>
						<li>ORM: JPA (Hibernate)</li>
						<li>Routing: React Router v6 (Data API)</li>
						<li>Security: Spring Security (BCrypt)</li>
						<li><strong>Infrastructure: Docker, Render (PaaS)</strong></li>
						<li><strong>Database Hosting: Neon (Serverless PostgreSQL)</strong></li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Login;