export type AuthorizedUser = {
	accessToken: string
	user: {
		id: number
		name: string
		email: string
		isAuth: boolean
	}
}

export type LoginUser = {
	email: string
	password: string
}
export type RegUser = LoginUser & {
	name: string
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
	notes: NoteT[]
}