const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>
	`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Amazon Scraper API");
});

//product details
app.get("/products/:productId", async (req, res) => {
	const { productId } = req.params;
	const { apiKey } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				apiKey
			)}&url=https://www.amazon.com/dp/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

//product reviews
app.get("/products/:productId/reviews", async (req, res) => {
	const { productId } = req.params;
	const { apiKey } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				apiKey
			)}&url=https://www.amazon.com/product-reviews/${productId}/`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

//product offers
app.get("/products/:productId/offers", async (req, res) => {
	const { productId } = req.params;
	const { apiKey } = req.query;

	try {
		const response = await request(
			`${generateScraperUrl(
				apiKey
			)}&url=https://www.amazon.com/gp/offer-listing/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

//search

app.get("/search/:searchQuery", async (req, res) => {
	const { searchQuery } = req.params;

	try {
		const response = await request(
			`${generateScraperUrl(
				apiKey
			)}&url=https://www.amazon.com/s?k=${searchQuery}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

//fdsafds
