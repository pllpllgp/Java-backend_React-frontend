import {useState} from 'react';
import axios from '../../api/axiosInstance';
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from '../../store/useAuthStore';

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		id: '',
		password: '',

	});

	const login = useAuthStore((state) => state.login);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post('/api/login', loginData);
			if(res.data.id) {
				login({
					id: res.data.id,
					name: res.data.name,
					nick: res.data.nick,

				},
				res.data.token);

				navigate('/main');

			} else {
				alert('로그인 실패');

			}

		} catch(error) {
			console.log('로그인 중 에러 발생: ', error);
			alert('통신 중 에러 발생');
		}
	}

	const handleSignup = () => {
		navigate('/signup');
	}

	return (
		<div style={{maxWidth: '400px', margin: '50px auto', textAlign: 'center'}}>
			<h2>로그인</h2>
			<form onSubmit={handleSubmit}>
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
				<button type="submit" style={{
					width: '100%',
					padding: '10px',
					backgroundColor: '#000000',
					color: 'white',
					border: 'none',
					boxSizing: 'border-box'
				}}>
					로그인
				</button>
				<button type="button" onClick={() => handleSignup()}
					style={{
					width: '100%',
					padding: '10px',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					boxSizing: 'border-box'
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
	);
}

export default Login;