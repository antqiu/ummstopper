import React from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder'
import { useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const SpeechToText = () => {
	const [data, setData] = useState('')
	const [audioSource, setAudioSource] = useState(null)
	const [loaderVisible, setLoaderVisible] = useState(false)
	const [fillers, setFillers] = useState([])

	const requestText = async (blob) => {
		const formData = new FormData()
		formData.append('file', blob)

		const response = await fetch('http://localhost:3000/api/speech-to-text', {
			method: 'POST',
			body: formData,
		})
		const data = await response.json()
		// console.log(data)
		setData(data.transcribed)
		setLoaderVisible(false)
	}

	const addAudioElement = (blob) => {
		const url = URL.createObjectURL(blob)

		// const audio = document.createElement('audio')
		// audio.src = url
		// audio.controls = true
		setLoaderVisible(true)
		setAudioSource({ src: url })
		// document.body.appendChild(audio)
		requestText(blob)
	}

	const retry = () => {
		setAudioSource(null)
		setFillers([])
	}

	const fillerWords = ['um', 'uh', 'hmm', 'mhm', 'uh huh', 'alright', 'like', 'you know', 'right', 'oh', 'actually', 'basically', 'seriously', 'totally', 'literally']

	const calculateFiller = () => {
		let counter = 0
		let newData = ''
		newData = data
			.toLowerCase()
			.replace(/[^\w\s]/gi, '')
			.split(' ')
		console.log(newData)
		for (let i = 0; i < newData.length; i++) {
			if (fillerWords.includes(newData[i])) {
				counter++
				if (!fillers.includes(newData[i])) {
					setFillers([...fillers, newData[i]])
				}
			}
		}
		return counter
	}

	const calculateGrade = (text) => {
		let counter = 0
		let newData = ''
		newData = data
			.toLowerCase()
			.replace(/[^\w\s]/gi, '')
			.split(' ')
		console.log(newData)
		for (let i = 0; i < newData.length; i++) {
			if (fillerWords.includes(newData[i])) {
				counter++
				if (!fillers.includes(newData[i])) {
					setFillers([...fillers, newData[i]])
				}
			}
		}
		let grade = Math.floor(((newData.length - counter) / newData.length) * 100) / 10
		if (text == 'number') return grade
		else {
			if (grade > 9) {
				return 'Excellent'
			} else if (grade > 8) {
				return 'Good'
			} else if (grade > 7) {
				return 'Decent'
			} else {
				return 'Needs work'
			}
		}
	}

	function colorFillerWords(text) {
		const words = text.split(/(\s+)/)

		return words.map((word, index) => {
			const cleanedWord = word.replace(/[^a-zA-Z]/g, '')
			if (fillerWords.includes(cleanedWord.toLowerCase())) {
				return (
					<span key={index} style={{ color: 'red' }}>
						{word}
					</span>
				)
			} else {
				return word
			}
		})
	}

	return (
		<div className="border-4 border-slate-200 w-full p-6 rounded-lg">
			{!audioSource && (
				<div className="flex flex-row">
					<p className="mt-2 p-2">Record</p>
					<AudioRecorder
						className="p-4"
						onRecordingComplete={addAudioElement}
						audioTrackConstraints={{
							noiseSuppression: true,
							echoCancellation: true,
						}}
						downloadOnSavePress={false}
						downloadFileExtension="webm"
					/>
				</div>
			)}

			{audioSource && (
				<div className="flex flex-row">
					<audio controls>
						<source src={audioSource.src}></source>
					</audio>
					<button className="btn-primary ml-2" onClick={retry}>
						Retry
					</button>
				</div>
			)}

			<div className="border-4 mt-4 p-4 border-slate-200 rounded-lg  ">
				<p className="font-bold text-lg">Speech to text:</p>
				{loaderVisible ? <BeatLoader color="#3b82f6" /> : <></>}
				<p>{colorFillerWords(data)}</p>
			</div>

			{data && (
				<div className="border-4 mt-4 p-4 border-slate-200 rounded-lg">
					<p className="text-lg font-bold">Statistics</p>
					<p>
						Word count: <span className="font-medium">{data.split(' ').length}</span>
					</p>
					<p>
						Number of filler words used: <span className="font-medium">{calculateFiller()}</span>
					</p>
					<p>
						Filler words used:{' '}
						{fillers.map((word, index) => (
							<span className="font-medium" key={index}>
								{word}
								{index !== fillers.length - 1 ? ', ' : ''}
							</span>
						))}
					</p>
					<div class="flex items-center mt-5">
						<p class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">{calculateGrade('number')}</p>
						<p class="ml-2 font-medium text-gray-900 dark:text-black">{calculateGrade('text')}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default SpeechToText
