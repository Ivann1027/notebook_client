import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { router } from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { Context } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<Context>
			<RouterProvider router={router} />
		</Context>
	</Provider>,
)
