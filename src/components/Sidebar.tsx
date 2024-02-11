import { useGetAllNotesQuery } from '../services/notesApi'
import '../styles/main.scss'
import { FolderT, NoteT } from '../types/types'
import Folder from './Folder'
import { Link } from 'react-router-dom'

function Sidebar() {

	const { data: notes } = useGetAllNotesQuery(String(3))

	return (
		<div className='sidebar'>
			<div>All notes</div>
			<ul>
				{notes && notes.map((note: NoteT) => (
					<Link to={`notes/${note.id}`} key={note.id}><li>{note.title}</li></Link>
				))}
			</ul>
			{folders.map(folder => (
				<Folder key={folder.id} folder={folder} />
			))}
		</div>
	)
}

export default Sidebar

const folders: FolderT[] = [
	{
		id: 1, name: 'One', notes: [
			{ id: 1, title: 'NoteOne', content: 'note one' },
			{ id: 2, title: 'NoteTwo', content: 'note two' },
			{ id: 3, title: 'NoteThree', content: 'note three' }
	] },
	{ id: 2, name: 'Two' },
	{ id: 3, name: 'Three' }
]