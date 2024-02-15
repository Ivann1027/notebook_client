import '../styles/allNotes.scss'
import { CiCircleList } from "react-icons/ci"
import { IoDocumentTextOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { NoteT } from '../types/types'
import { useGetAllNotesQuery } from '../services/notesApi'
import { useContext } from 'react'
import { CustomContext } from '../context/UserContext'

const AllNotes = () => {

	const {user} = useContext(CustomContext)
	const { data: notes } = useGetAllNotesQuery(String(user.user.id))

	return (
		<div className="allNotes">
			<h3 className='allNotes__title'><span>{<CiCircleList />}</span>All notes</h3>
			<ul className='allNotes__body'>
				{notes && notes.map((note: NoteT) => (
					<Link to={`notes/${note.id}`} key={note.id}>
						<li className='sidebar__all-note'><span>{<IoDocumentTextOutline />}</span>{note.title}</li>
					</Link>
				))}
			</ul>
		</div>
	)
}

export default AllNotes