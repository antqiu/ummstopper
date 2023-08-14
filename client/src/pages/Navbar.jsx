import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div>
			<div className="flex justify-between items-center w-full px-4 py-2 mt-4 drop-shadow-md">
				<div className="flex items-center ml-6">
					<img className="w-10 mr-4" src="/favicon.png" />
					<Link className="text-4xl font-bold" to="/">
						<span className="text-blue-500">Umm</span>Stopper
					</Link>
				</div>
				<div className="flex gap-4 mr-4">
					<Link className="p-2 font-bold mt-0.5" to="/interview">
						Interview
					</Link>
					<Link className="border rounded-lg bg-white border-2 px-6 py-2 hover:bg-slate-300 hover:text-white hover:border-slate-300 ease-in transition font-medium" to="/login">
						Login
					</Link>
					<Link className="px-6 py-2 bg-blue-500 rounded-lg text-white text-center hover:bg-blue-400 ease-in transition font-medium" to="/register">
						Register
					</Link>
				</div>
			</div>
			<hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300 " />
		</div>
	)
}

export default Navbar
