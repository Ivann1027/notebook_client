import '../../styles/auth.scss'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { useState } from 'react'

function AuthorizationForm() {

	const [activeTab, setActiveTab] = useState<'login' | 'registration'>('login')

	return(
		<div className='auth'>
			<div className='auth__tabs'>
				<div style={{color: activeTab === 'login' ? 'teal' : '#999'}} onClick={() => setActiveTab('login')}>Авторизация</div>
				<div style={{color: activeTab === 'registration' ? 'teal' : '#999'}} onClick={() => setActiveTab('registration')}>Регистрация</div>
			</div>
			{activeTab === 'login' ? (
				<LoginForm />
			) : (
				<RegistrationForm />
			)}
		</div >
	)
}

export default AuthorizationForm