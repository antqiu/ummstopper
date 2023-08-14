import React from 'react'
import { useState, useEffect, props } from 'react'
import SpeechToText from './SpeechToText'

const Question = ({ questionNumber, questionPrompt, index }) => {
	const filename = '/data/' + questionNumber.toString() + '.mp4'

	return (
		<div className="flex items-center justify-center my-2 ">
			<div className="w-3/4 p-8 bg-white rounded-lg drop-shadow-lg">
				<p className="font-bold text-2xl">
					Question {index + 1}: {questionPrompt}
				</p>
				<div className="mt-2 flex flex-row gap-4">
					<video className="rounded-lg" controls>
						<source src={filename} />
					</video>
					<SpeechToText />
				</div>
			</div>
		</div>
	)
}

export default Question
