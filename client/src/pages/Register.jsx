import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	async function registerUser(event) {
		event.preventDefault()
		const response = await fetch('http://localhost:3000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()
		if (data.status == 'ok') {
			navigate('/login')
			alert('Account created successfully.')
		} else {
			console.error('Registration failed!', data.error)
		}
	}
	return (
		<div className="max-h-screen flex items-center justify-center">
			<div className="w-auto text-center bg-white w-3/5 rounded-lg drop-shadow-md p-10 mt-12">
				<p className="font-semibold text-2xl p-4">Sign up</p>
				<form className="flex flex-col items-center justify-center" onSubmit={registerUser}>
					<input
						className="indent-2 bg-white rounded-md p-2 mb-3 drop-shadow border-slate-300 border hover:drop-shadow-md hover:border-blue-500 transition ease-in-250 focus:outline-none focus:border focus:border-blue-500"
						value={name}
						onChange={(e) => {
							setName(e.target.value)
						}}
						type="text"
						placeholder="Name"
					/>
					<input
						className="indent-2 bg-white rounded-md p-2 mb-3 drop-shadow border-slate-300 border hover:drop-shadow-md hover:border-blue-500 transition ease-in-250 focus:outline-none focus:border focus:border-blue-500"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						type="text"
						placeholder="Email"
					/>
					<input
						className="indent-2 bg-white rounded-md p-2 mb-3 drop-shadow border-slate-300 border hover:drop-shadow-md hover:border-blue-500 transition ease-in-250 focus:outline-none focus:border focus:border-blue-500"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						type="password"
						placeholder="Password"
					/>
					<input className="w-full p-3 bg-blue-500 hover:bg-blue-400 transition ease-in font-semibold text-md text-white rounded-md cursor-pointer" type="submit" value="Register" />
				</form>
				<div className="flex justify-center pt-4">
					<p>Already have an account?&nbsp;</p>
					<Link className="text-blue-500 duration-250 transition ease-in font-medium" to="/login">
						Login
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
