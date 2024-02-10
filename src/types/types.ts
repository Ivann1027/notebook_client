export type AuthorizedUser = {
	accessToken: string
	user: {
		id: number
		name: string
		email: string
		folders?: FolderT[]
		notes?: NoteT[]
	}
}

export type NoteT = {
	id: number
	title: string
	content: string
	folders?: FolderT[]
}

export type FolderT = {
	id: number
	name: string
	notes?: NoteT[]
}