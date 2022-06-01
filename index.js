const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

const PORT = 3000;
const allElementsUrl = "https://neelpatel05.pythonanywhere.com";
const baseUrl = "https://neelpatel05.pythonanywhere.com/element";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); //important if you are running file from outside the same folder as of index.js
app.use(express.static(path.join(__dirname, "/public"))); //
app.listen(PORT, function () {
	// console.log("Express server listening on port " + PORT);
});

app.get("/", (req, res) => {
	res.render("home");
});
app.get("/elements/all", async (req, res) => {
	const response = await axios.get(allElementsUrl);
	if (Object.keys(response.data).length > 1) {
		const data = response.data;
		res.render("elements/index", { data });
	} else {
		res.render("notFound");
	}
});
app.get("/elements/search", async (req, res) => {
	let data = req.query;

	if (data["name"]) {
		const name = capitalize(data.name);
		const response = await axios.get(
			`${baseUrl}/atomicname?atomicname=${name}`
		);
		if (Object.keys(response.data).length > 1) {
			const element = response.data;
			res.render("elements/element", { element });
		} else {
			res.render("notFound");
		}
	} else if (data["number"]) {
		let num = parseInt(data.number);
		const response = await axios.get(
			`${baseUrl}/atomicnumber?atomicnumber=${num}`
		);
		if (Object.keys(response.data).length > 1) {
			const element = response.data;
			res.render("elements/element", { element });
		} else {
			res.render("notFound");
		}
	} else if (data["symbol"]) {
		let symbol = capitalize(data.symbol);
		const response = await axios.get(`${baseUrl}/symbol?symbol=${symbol}`);
		if (Object.keys(response.data).length > 1) {
			const element = response.data;
			res.render("elements/element", { element });
		} else {
			res.render("notFound");
		}
	} else if (data["bonding-type"]) {
		const response = await axios.get(
			`${baseUrl}/bondingtype?bondingtype=${data["bonding-type"].toLowerCase()}`
		);
		if (Object.keys(response.data).length > 1) {
			const elements = response.data;
			res.render("elements/index", { data: elements });
		} else {
			res.render("notFound");
		}
	} else if (data["state"]) {
		const response = await axios.get(
			`${baseUrl}/state?state=${data["state"].toLowerCase()}`
		);
		if (Object.keys(response.data).length > 1) {
			const elements = response.data;
			res.render("elements/index", { data: elements });
		} else {
			res.render("notFound");
		}
	} else if (data["group-block"]) {
		const response = await axios.get(
			`${baseUrl}/groupblock?groupblock=${data["group-block"].toLowerCase()}`
		);
		if (Object.keys(response.data).length > 1) {
			const elements = response.data;
			res.render("elements/index", { data: elements });
		} else {
			res.render("notFound");
		}
	} else {
		res.render("notFound");
	}
});
app.get("/elements/:id", async (req, res) => {
	const { id } = req.params;
	const response = await axios.get(
		`${baseUrl}/atomicnumber?atomicnumber=${id}`
	);
	if (Object.keys(response.data).length > 1) {
		const element = response.data;
		res.render("elements/element", { element });
	} else {
		res.res.render("notFound");
	}
});

app.get("*", (req, res) => {
	res.render("notFound");
});

const capitalize = (string) => {
	string = string.trim();
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
