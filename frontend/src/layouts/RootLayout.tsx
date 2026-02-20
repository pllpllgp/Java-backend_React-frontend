import {Link, Outlet, useLocation} from "react-router-dom";

function RootLayout() {
    const loc = useLocation();

    const hideNavBar = ["/", "/login", "/signup"];
    const shouldShowBar = !hideNavBar.includes(location.pathname);

    return (
        <div>
            {/* 모든 페이지에 공통으로 노출될 메뉴바 */}
            {shouldShowBar && (
                <nav style={{padding: '10px', borderBottom: '1px solid #ccc'}}>
                    <Link to="/main" style={{marginRight: '10px'}}>메인</Link>
                    <Link to="/board/game/list" style={{marginRight: '10px'}}>게임 게시판</Link>
                    <Link to="/board/movie/list" style={{marginRight: '10px'}}>영화 게시판</Link>
                    <Link to="/board/music/list" style={{marginRight: '10px'}}>음악 게시판</Link>
                    <Link to="/board/notice/list" style={{marginRight: '10px'}}>공지 게시판</Link>
                </nav>
            )}

            {/* 자식 컴포넌트(Home, Login 등)가 그려질 위치 (자바의 <jsp:include>와 비슷) */}
            <main style={{padding: '20px'}}>
                <Outlet/>
            </main>
        </div>
    );
}

export default RootLayout;