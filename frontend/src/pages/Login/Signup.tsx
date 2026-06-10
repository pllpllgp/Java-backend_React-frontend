import {useState} from 'react';
import axios from '../../api/axiosInstance';
import * as React from "react";
import {useNavigate} from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		password: '',
		nick: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			//const res = await axios.post('/api/signup', formData)
			const res = await axios.post('https://backend-server-mmi8.onrender.com:10000/api/signup', formData)

			if(res.data.result) {
				alert('회원가입 성공');
				navigate('/login');
			} else {
				alert('회원가입 실패');
			}

		} catch(error) {
			console.log('로그인 중 에러 발생: ', error);
			alert('통신 중 에러 발생');
		}
	};

	return (
		<div style={{maxWidth: '400px', margin: '50px auto', textAlign: 'center'}}>
			<h2>회원가입</h2>
			<form onSubmit={handleSubmit}>
				<input name="id" placeholder="아이디" onChange={handleChange}/><br/>
				<input name="name" placeholder="이름" onChange={handleChange}/><br/>
				<input name="password" type="password" placeholder="비밀번호" onChange={handleChange}/><br/>
				<input name="nick" placeholder="닉네임" onChange={handleChange}/><br/>
				<button type="submit">가입하기</button>
			</form>
		</div>
	);

}

export default Signup;