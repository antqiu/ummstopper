import { useState } from 'react'
import Interview from './pages/Interview'

function App() {
	const [questions, setQuestions] = useState([])
	const [numQuestions, setNumQuestions] = useState(10)
	const [started, setStarted] = useState(false)

	const handleQuestion = () => {
		setQuestions()
	}

	const handleNumQuestions = (e) => {
		setNumQuestions(e.target.value)
	}

	return (
		<div>
			<div className="text-center">
				<p className="font-bold text-2xl text-center">Interview</p>
				<p className="font-semibold">
					Select number of questions: <span className="text-blue-500">{numQuestions}</span>
				</p>
				<input className="mr-4 mt-6" type="range" min="1" max="10" onChange={handleNumQuestions} />
				<br></br>
				{!started ? (
					<button className="btn-primary mt-2 mr-3" onClick={() => setStarted(true)}>
						Start
					</button>
				) : (
					<button className="btn-primary bg-red-500 hover:bg-red-400 mt-2 mr-3" onClick={() => setStarted(false)}>
						End
					</button>
				)}
			</div>
			{started ? <Interview numberOfQuestions={numQuestions} /> : <></>}
		</div>
	)
}

export default App
