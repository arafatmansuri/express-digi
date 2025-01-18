import "dotenv/config";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let ids = 1;
let data = [];

//Adding/Creating data :
app.post("/home", (req, res) => {
  const { name, gender } = req.body;
  const newData = { id: ids++, name, gender };
  data.push(newData);
  res.status(200).send(newData);
});

//displaying/Reading Data:
app.get("/home", (req, res) => {
  res.status(200).send(data);
});

//Reading data using id:
app.get("/home/:id", (req, res) => {
  const Dataid = data.filter((t) => t.id === parseInt(req.params.id));
  res.status(200).send(Dataid);
});

//Updating data :
app.put("/home/:id", (req, res) => {
  const Dataid = data.find((t) => t.id === parseInt(req.params.id));
  const { name, gender } = req.body;
  Dataid.name = name;
  Dataid.gender = gender;
  res.status(200).send(Dataid);
});

//Deleting data :
app.delete("/home/:id", (req, res) => {
  const DataIndex = data.findIndex((t) => t.id === parseInt(req.params.id));
  data.splice(DataIndex, 1);
  res.status(200).send("Data Deleted");
});

app.listen(port, () => {
  console.log("server is listining on port 3000");
});
