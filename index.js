import express from "express";

const app = express();
const port = 3000;

/*app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/ice-tea", (req, res) => {
  res.send("What ice-tea would you prefer");
});
app.get("/twitter", (req, res) => {
  res.send("_mohammedarafat");
});
*/

app.use(express.json());

let data = [];
let nextId = 1;

// Adding new Data"
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  data.push(newTea);
  res.status(200).send(newTea);
});

//  route to get all data
app.get("/teas", (req, res) => {
  res.status(200).send(data);
});

// get a data with id
app.get("/teas/:id", (req, res) => {
  const tea = data.filter((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");
  res.status(200).send(tea);
});

//update:
app.put("/teas/:id", (req, res) => {
  const tea = data.filter((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete :

app.delete("/teas/:id", (req, res) => {
  const index = data.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("not found");
  }
  data.splice(index, 1);
return res.status(200).send("deleted data");
});

app.listen(port, () => {
  console.log(`"server is running at port "${port}...`);
});
