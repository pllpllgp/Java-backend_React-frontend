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

	const linkStyle = {
		textDecoration: 'none',
		color: '#4b5563',
		fontWeight: '600',
		fontSize: '0.95rem',
		transition: 'color 0.2s'
	};

	return (
		<div>
			{shouldShowBar && (
				<nav style={{
					padding: '15px 30px',
					backgroundColor: '#ffffff',
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					position: 'sticky',
					top: 0,
					zIndex: 1000
				}}>

					<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
						<Link to="/main" style={linkStyle}>메인</Link>
						<Link to="/board/game/list" style={linkStyle}>게임 게시판</Link>
						<Link to="/board/movie/list" style={linkStyle}>영화 게시판</Link>
						<Link to="/board/music/list" style={linkStyle}>음악 게시판</Link>
						<Link to="/board/notice/list" style={linkStyle}>공지 게시판</Link>
					</div>

					<div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                 <span style={{fontSize: '0.9rem', color: '#6b7280'}}>
                    <strong style={{color: '#111827'}}>{user?.nick}</strong>님 환영합니다
                 </span>
						<button onClick={handleLogout}
								style={{
									padding: '6px 16px',
									backgroundColor: '#ffffff',
									color: '#ef4444',
									border: '1px solid #ef4444',
									borderRadius: '6px',
									cursor: 'pointer',
									fontSize: '0.85rem',
									fontWeight: 'bold'
								}}>
							로그아웃
						</button>
					</div>
				</nav>
			)}

			<main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
				<Outlet/>
			</main>
		</div>
	);
}

export default RootLayout;