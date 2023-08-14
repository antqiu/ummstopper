const express = require('express')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) // sets the destination for uploaded files
const app = express()
const port = 3000
const axios = require('axios')
const { v2: cloudinary } = require('cloudinary')
const dotenv = require('dotenv')
const fs = require('fs')
const mongoose = require('mongoose')
const User = require('./models/user.model')
dotenv.config()

cloudinary.config({
	cloud_name: 'dkrw88to0',
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_DB_LINK)

app.post('/api/speech-to-text', upload.single('file'), async (req, res) => {
	console.log(req.file)

	try {
		const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'video' })

		// delete it from uploads folder
		fs.unlink(req.file.path, (err) => {
			if (err) {
				console.error('Error deleting file:', err)
			}
		})

		try {
			// * try with assembly ai
			const baseUrl = 'https://api.assemblyai.com/v2'

			const headers = {
				authorization: process.env.ASSEMBLY_SECRET,
			}

			const data = {
				audio_url: result.url,
				disfluencies: true,
			}

			const url = `${baseUrl}/transcript`
			const response = await axios.post(url, data, { headers: headers })
			const transcriptId = response.data.id
			const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`

			while (true) {
				const pollingResponse = await axios.get(pollingEndpoint, {
					headers: headers,
				})
				const transcriptionResult = pollingResponse.data

				if (transcriptionResult.status === 'completed') {
					// console.log(transcriptionResult.text)
					res.json({ transcribed: transcriptionResult.text })
					break
				} else if (transcriptionResult.status === 'error') {
					throw new Error(`Transcription failed: ${transcriptionResult.error}`)
				} else {
					await new Promise((resolve) => setTimeout(resolve, 3000))
				}
			}
		} catch (err) {
			console.log(err)
		}
	} catch (err) {
		console.log(err)
	}
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		console.log(err)
		res.json({ status: 'error', error: 'duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	})

	if (user) {
		console.log('user found')
		return res.json({ status: 'ok', user: true })
	} else {
		console.log('user not found')
		return res.json({ status: 'error', user: false })
	}
})
app.listen(port, () => {
	console.log(`server started on port ${port}`)
})
