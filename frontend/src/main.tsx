import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes' // 방금 만든 routes.tsx 가져오기

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* App 컴포넌트 대신 RouterProvider를 사용해야 합니다 */}
		<RouterProvider router={router} />
	</React.StrictMode>,
)