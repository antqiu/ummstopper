import React from 'react'
import { useState, useEffect, props } from 'react'
import Question from '../components/Question'

const Interview = ({ numberOfQuestions }) => {
	const [questions, setQuestions] = useState([])

	const questionToText = {
		1: 'Tell me about yourself',
		2: 'Why do you want to work for us?',
		3: "Give an example of where you've been able to use your leadership skills",
		4: 'What are your strengths and weaknesses?',
		5: 'Where do you see yourself in 5 years?',
		6: 'What is your greatest achievement? ',
		7: 'Tell us about a time where you had to face a stressful situation and what you did in response.',
		8: 'What is your greatest accomplishment?',
		9: 'Tell me about your work experience.',
		10: 'What did you like the most about your last position? ',
	}

	useEffect(() => {
		let list = [] // list of numbers 1 to 10
		let target = numberOfQuestions
		let numQuestions = Object.keys(questionToText).length
		while (list.length != target) {
			let num = Math.floor(Math.random() * numQuestions) + 1
			if (!list.includes(num)) {
				list.push(num)
			} else {
				continue
			}
		}
		setQuestions(list)
	}, [])

	const handleQuestionPrompt = (questionNumber) => {
		return questionToText[questionNumber]
	}

	return (
		<div>
			{questions.map((questionNumber, index) => (
				<Question key={questionNumber} index={index} questionNumber={questionNumber} questionPrompt={handleQuestionPrompt(questionNumber)} />
			))}
		</div>
	)
}

export default Interview
