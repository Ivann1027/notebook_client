import { ChangeEvent, FormEvent, useState } from 'react'
import '../../styles/auth.scss'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const RegistrationForm = () => {

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isEye, setIsEye] = useState<boolean>(false)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit} className="auth__form">
			<input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder='Ваше имя' />
			<input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='Email' />
			<p className='auth__pass'>
				<input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type={isEye ? 'text' : 'password'} placeholder='Придумайте пароль' />
				<span onClick={() => setIsEye(!isEye)} className='auth__eye'>{isEye ? <FaEyeSlash /> : <FaEye />}</span>
			</p>
			<button type='submit'>Зарегистрироваться</button>
		</form>
	)
}

export default RegistrationForm