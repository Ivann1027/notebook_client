export type TControllStyles = {
	label: string
	style: string
}
export type IColor = {
	name: string
	value: string
}

const BLOCK_TYPES: TControllStyles[] = [
	{ label: 'H1', style: 'header-one' },
	{ label: 'H2', style: 'header-two' },
	{ label: 'H3', style: 'header-three' },
	{ label: 'H4', style: 'header-four' },
	{ label: 'H5', style: 'header-five' },
	{ label: 'H6', style: 'header-six' },
	{ label: 'Blockquote', style: 'blockquote' },
	{ label: 'UL', style: 'unordered-list-item' },
	{ label: 'OL', style: 'ordered-list-item' },
	{ label: 'Code Block', style: 'code-block' }
]

const INLINE_STYLES: TControllStyles[] = [
	{ label: 'Bold', style: 'BOLD' },
	{ label: 'Italic', style: 'ITALIC' },
	{ label: 'Underline', style: 'UNDERLINE' },
	{ label: 'Monospace', style: 'CODE' }
]

const TEXT_COLORS: IColor[] = [
	{ name: 'red', value: 'red' },
	{ name: 'blue', value: 'blue' },
	{ name: 'yellow', value: 'yellow' },
	{ name: 'green', value: 'green' },
	{ name: 'orange', value: 'orange' }
]

export { BLOCK_TYPES, INLINE_STYLES, TEXT_COLORS }