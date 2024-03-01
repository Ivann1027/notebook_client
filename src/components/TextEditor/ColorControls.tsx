import { EditorState } from "draft-js"
import { IColor } from "./editorSettings"
import { ChangeEvent, FC, useState } from "react"

interface ColorControlsProps {
	editorState: EditorState
	onColorToggle: (color: string) => void
	colors: IColor[]
}

const ColorControls: FC<ColorControlsProps> = ({ editorState, onColorToggle, colors }) => {
	
	const [selectedColor, setSelectedColor] = useState<string>('') 

	const handleToggleColor = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedColor(e.target.value)
		onColorToggle(e.target.value)
	}

	return (
		<div className="RichEditor-controls">
			<label>Цвет:</label>
			<select id="textColors" onChange={handleToggleColor} value={selectedColor} style={{textTransform: "capitalize", marginLeft: '10px'}}> 
				{colors.map(color => (
					<option value={color.value} style={{ textTransform: "capitalize" }} key={color.name}>
						{color.name}
					</option>
				))}
			</select>
		</div>
	)
}

export default ColorControls