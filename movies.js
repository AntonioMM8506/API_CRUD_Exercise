const express = require('express');
const app = express();
const port = 3000;

let movies = [
    {
        id: "1",
        title: "Fight Club"
    },
    {
        id: "2",
        title: "The Dark Knight"
    }
];

//Get the movie list in the form of json
app.get('/movie', (req, res) => {
    res.json(movies);
});

app.get('/movie/:id', (req, res) => {
    const id = req.params.id;

    for(let movie of movies){
        if(movie.id == id){
            res.json(movie)
            return 
        }
    }

    res.status(400).send("Movie not found");
    
});

//Set the server to listen at port
app.listen(port, () => console.log("Server Listening at port: " + port));