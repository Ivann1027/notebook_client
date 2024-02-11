import { ReactNode } from 'react'
import '../styles/main.scss'

interface NotebookProps {
	children: ReactNode
}

const Notebook: React.FC<NotebookProps> = ({children}) => {


	return (
		<div className='notebook'>
			{children}
		</div>
	)
}

export default Notebook