import '../styles/main.scss'
import { FolderT, NoteT } from '../types/types'
import Folder from './Folder'

function Sidebar() {

	return (
		<div className='sidebar'>
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