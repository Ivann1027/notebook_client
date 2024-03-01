import { FC, ReactNode, MouseEventHandler } from "react"

interface ControlItemProps {
	isActive?: boolean
	onToggle: (style: string) => void
	style: string
	children: ReactNode
}

const ControlItem: FC<ControlItemProps> = ({ isActive, onToggle, style, children }) => {
	
	const onToggleHandler: MouseEventHandler<HTMLSpanElement> = (e) => {
		e.preventDefault()
		onToggle(style)
	}

	const currentClassName = `RichEditor-styleButton ${isActive ? ' RichEditor-activeButton' : ''}`

	return (
		<span onMouseDown={onToggleHandler} className={currentClassName}>
			{children}
		</span>
	)
}

export default ControlItem