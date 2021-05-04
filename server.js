const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json())

const connect = async () => {
    return new mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}

const movieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    budget: Number
})

const Movie = mongoose.model("movie", movieSchema);

// get all movies
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find().lean().exec();
        return res.status(200).json({data: movies})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// post movie
app.post("/movies", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).json({data: movie})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// get a single movie
app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).lean().exec()
        return res.status(200).json({data: movie})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// update movie
app.patch("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true}).lean().exec()
        return res.status(200).json({data: movie})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// delete movie
app.delete("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).json({data: movie})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

app.listen(process.env.PORT || 2244, async () => {
    await connect()
    console.log("Listening on port 2244");
})