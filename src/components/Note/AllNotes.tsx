import '../../styles/allNotes.scss'
import { CiCircleList } from "react-icons/ci"
import { NoteT } from '../../types/types'
import { useGetAllNotesQuery } from '../../services/notesApi'
import { useContext, useState } from 'react'
import { CustomContext } from '../../context/UserContext'
import SidebarNote from './SidebarNote'
import { CiCirclePlus } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'

const AllNotes = () => {

	const {user} = useContext(CustomContext)
	const { data: notes } = useGetAllNotesQuery(String(user.user.id))
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState<boolean>(true)

	return (
		<div className="allNotes">
			<h3 onClick={() => setIsOpen(!isOpen)} className='allNotes__title'>
				<span><CiCircleList /></span>All notes
				<span onClick={() => navigate('/notes/createNote')} id='plus'><CiCirclePlus /></span>
			</h3>
			{isOpen && (<ul className='allNotes__body'>
				{notes && notes.map((note: NoteT) => (
					<SidebarNote note={note} key={note.id} />
				))}
			</ul>)}
		</div>
	)
}

export default AllNotes