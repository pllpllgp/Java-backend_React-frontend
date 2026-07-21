import {useState} from 'react';
import axios from '../../api/axiosInstance';
import * as React from "react";
import {useNavigate} from "react-router-dom";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		password: '',
		nick: ''
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const res = await axios.post(`${SERVER_BASE_URL}/api/signup`, formData)

			if(res.data.result) {
				alert('회원가입 성공');
				navigate('/login');
			} else {
				alert('회원가입 실패');
			}

		} catch(error) {
			console.log('로그인 중 에러 발생: ', error);
			alert('통신 중 에러 발생');

		} finally {
			setIsLoading(false);
		}
	};

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
						회원가입 처리 중입니다...
					</div>
				</div>
			)}

			<div style={{
				maxWidth: '400px',
				margin: '50px auto',
				padding: '40px 30px',
				textAlign: 'center',
				backgroundColor: '#ffffff',
				border: '1px solid #eaeaea',
				borderRadius: '8px',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
			}}>
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
					<strong>안내:</strong> 초기 진입 시 서버가 재기동 되므로 로그인 및 회원가입에 다소 시간이 소요될 수 있습니다.
				</div>

				<h2 style={{marginBottom: '30px', color: '#333'}}>회원가입</h2>
				<form onSubmit={handleSubmit}>
					<div style={{marginBottom: '15px'}}>
						<input name="id" placeholder="아이디" onChange={handleChange}
							   style={{
								   width: '100%',
								   padding: '12px',
								   boxSizing: 'border-box',
								   border: '1px solid #ccc',
								   borderRadius: '4px',
								   fontSize: '1rem'
							   }}
						/>
					</div>
					<div style={{marginBottom: '15px'}}>
						<input name="name" placeholder="이름" onChange={handleChange}
							   style={{
								   width: '100%',
								   padding: '12px',
								   boxSizing: 'border-box',
								   border: '1px solid #ccc',
								   borderRadius: '4px',
								   fontSize: '1rem'
							   }}
						/>
					</div>
					<div style={{marginBottom: '15px'}}>
						<input name="password" type="password" placeholder="비밀번호" onChange={handleChange}
							   style={{
								   width: '100%',
								   padding: '12px',
								   boxSizing: 'border-box',
								   border: '1px solid #ccc',
								   borderRadius: '4px',
								   fontSize: '1rem'
							   }}
						/>
					</div>
					<div style={{marginBottom: '30px'}}>
						<input name="nick" placeholder="닉네임" onChange={handleChange}
							   style={{
								   width: '100%',
								   padding: '12px',
								   boxSizing: 'border-box',
								   border: '1px solid #ccc',
								   borderRadius: '4px',
								   fontSize: '1rem'
							   }}
						/>
					</div>
					<button type="submit" disabled={isLoading}
							style={{
								width: '100%',
								padding: '14px',
								backgroundColor: '#007bff',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
								fontSize: '1rem',
								fontWeight: 'bold',
								cursor: isLoading ? 'not-allowed' : 'pointer'
							}}>
						가입하기
					</button>
				</form>
			</div>
		</>
	);

}

export default Signup;