import express from "express";
import * as fs from "fs";
// serving html
const app = express();
const port = 4200;
const CLIENT_PATH = "src/client/index.html";
app.get("/", (req, res) => {
    console.log(["WEB SERVER BACKEND called port 4200!"]);
    const htmlDapat = fs.readFileSync(CLIENT_PATH, { encoding: "utf8" });
    res.send(htmlDapat);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
