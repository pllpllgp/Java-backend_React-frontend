import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore.ts";

function RootLayout() {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

	const loc = useLocation();

	const hideNavBar = ["/", "/login", "/signup"];
	const shouldShowBar = !hideNavBar.includes(loc.pathname);

	const handleLogout = () => {
		const isConfirm = confirm("로그아웃 하시겠습니까?");

        if(isConfirm) {
            logout();
            window.alert("로그아웃 되었습니다.");
            navigate("/login");

        }
	}

	return (
		<div>
			{shouldShowBar && (
				<nav style={{
					padding: '10px 20px',
					borderBottom: '1px solid #ccc',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'}}>

					<div>
						<Link to="/main" style={{marginRight: '10px'}}>메인</Link>
						<Link to="/board/game/list" style={{marginRight: '10px'}}>게임 게시판</Link>
						<Link to="/board/movie/list" style={{marginRight: '10px'}}>영화 게시판</Link>
						<Link to="/board/music/list" style={{marginRight: '10px'}}>음악 게시판</Link>
						<Link to="/board/notice/list" style={{marginRight: '10px'}}>공지 게시판</Link>
					</div>

					<div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
						<span style={{fontSize: '0.9rem', color: '#666'}}>{user?.nick}님 환영합니다</span>
						<button onClick={handleLogout}
								style={{
									padding: '5px 12px',
									background: '#f44336',
									color: 'white',
									border: 'none',
									borderRadius: '4px',
									cursor: 'pointer',
									fontSize: '0.85rem'
								}}>
							로그아웃
						</button>
					</div>
				</nav>
			)}

			<main style={{padding: '20px'}}>
				<Outlet/>
			</main>
		</div>
	);
}

export default RootLayout;