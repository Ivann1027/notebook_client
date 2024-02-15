import { MdLogout } from "react-icons/md"
import classes from './LogoutBtn.module.scss'

export const LogoutBtn = ({...props}) => {
	return <button {...props} className={classes.logoutBtn}><MdLogout /></button>
}