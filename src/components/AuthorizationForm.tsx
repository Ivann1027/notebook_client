import { useState, FormEvent, ChangeEvent } from 'react'
import '../styles/auth.scss'
import { FaEye, FaEyeSlash } from "react-icons/fa"

function AuthorizationForm() {

	
	const [isEye, setIsEye] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const login = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return(
		<div className='auth'>
			<form onSubmit={login} className='auth__form'>
				<input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder='Ваше имя' />
				{email}
				<input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='Ваш email' />
				<p className="auth__pass">
					<input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type={isEye ? 'text' : 'password'} placeholder='Ваш пароль' />
					<span className='auth__eye' onClick={() => setIsEye(!isEye)}>{isEye ? <FaEyeSlash /> : <FaEye />}</span>
				</p>
				<button type='submit'>Войти</button>
			</form>
		</div >
	)
}

export default AuthorizationForm