const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

async function getPriceFeed() {
	try {
		const siteUrl = 'https://www.racingpost.com/racecards/runners-index/'

		const { data } = await axios({
			method: 'GET',
			url: siteUrl
		})

		const keys = ['name:', 'time_meeting']

		const $ = cheerio.load(data)

		const elemSelector1 = 'ul > li '

		$(elemSelector1).each((parentIdx, parentElem) => {
			let keyIdx = 0
			const horseObj = {}

			if (parentIdx) {
				$(parentElem)
					.children()
					.each((childIdx, childElem) => {
						const tdValue = $(childElem).text().replace(/\s\s+/g, '')

						if (tdValue) {
							horseObj[keys[keyIdx]] = tdValue

							keyIdx++
						}
					})

				console.log(horseObj)
			}
		})

		//	console.log(data)
	} catch (err) {
		console.error(err)
	}
}

getPriceFeed()
