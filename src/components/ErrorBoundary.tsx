import { useRouteError } from "react-router-dom"
import '../styles/error.scss'
import { BiSolidCommentError } from "react-icons/bi"

const ErrorBoundary = () => {

	const error: any = useRouteError()
	console.log(error)

	return (
		<div className="error">
			<div className="error__container">
				<span className="error__icon"><BiSolidCommentError /></span>
				<h1 className="error__title">Oops!</h1>
				<h2 className="error__subtitle">There is an unexpected error...</h2>
				<div className="error__status">{error.status} - {error.statusText}</div>
				<div className="error__data">{error.data}</div>
				<div>{JSON.stringify(error)}</div>
			</div>
		</div>
	)
}

export default ErrorBoundary