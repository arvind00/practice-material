const express = require("express");
const router = require("./routes");
const PORT = 5000;

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, cache-control, expires, pragma");
    next();
})

app.use(express.json());
app.use(router);
app.listen(PORT, () => console.info(`server started at http://localost:${PORT}`));