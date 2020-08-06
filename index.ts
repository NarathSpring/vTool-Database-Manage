import express from "express";


import Router from "./routes/router";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Router)

app.listen(3333, () => {
 console.log('listening 3333');
  
})


