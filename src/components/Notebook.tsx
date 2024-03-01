import { ReactNode } from 'react'
import '../styles/main.scss'
import { Outlet } from 'react-router-dom'

const Notebook = () => {


	return (
		<div className='notebook'>
			<Outlet />
		</div>
	)
}

export default Notebook