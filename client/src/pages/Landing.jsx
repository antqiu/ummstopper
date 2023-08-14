import React from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
	return (
		<div>
			<div className="flex justify-center mt-10">
				<div className="flex justify-content items-center gap-10 align-center">
					<div className="flex flex-col">
						<p className="text-4xl font-bold">
							Cut the clutter from <br></br>your interviews, <span className="text-red-500 underline underline-offset-4 decoration-2 decoration-wavy">like</span> easily.
						</p>
						<Link to="/register" className="btn-primary text-center p-4 mr-10 mt-6">
							Sign up
						</Link>
					</div>
					<img src="/placeholder.png" alt="placeholder image" />
				</div>
			</div>

			<div className="text-center mt-12">
				<p className="font-semibold text-2xl">Affiliated with universities worldwide</p>
				<div className="flex mt-4 max-w-full align-center justify-center gap-4">
					<img className="img-size" src="/logo-placeholder.jpg" alt="company logo" />
					<img className="img-size" src="/logo-placeholder.jpg" alt="company logo" />
					<img className="img-size" src="/logo-placeholder.jpg" alt="company logo" />
					<img className="img-size" src="/logo-placeholder.jpg" alt="company logo" />
					<img className="img-size" src="/logo-placeholder.jpg" alt="company logo" />
				</div>
			</div>
			<div>
				<p className="text-center mt-8 mb-4 font-semibold text-2xl">What we offer</p>

				<div className="flex justify-center">
					<div className="flex max-w-7xl gap-10">
						<div className="card">
							<p className="card-title">Speech-to-text Translation</p>
							<p className="card-desc">Our website uses AssemblyAI to accurately transcribe your interview responses into text, allowing you to revisit and revise easily.</p>
						</div>
						<div className="card">
							<p className="card-title">Filler Word Detection</p>
							<p className="card-desc">Your interview response automatically gets filtered for filler words, letting you know just how often you say it.</p>
						</div>
						<div className="card">
							<p className="card-title">Automatic Response Grading</p>
							<p className="card-desc">Every interview question comes with your own grade out of 10 points, personalized with every response you make.</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<div className="btn-primary flex align-center justify-center my-8 p-4 text-center">
					<Link to="/register">Sign up</Link>
				</div>
			</div>
		</div>
	)
}

export default Landing
