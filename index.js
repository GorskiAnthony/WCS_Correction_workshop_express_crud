const express = require("express");
const heroes = require("./services/heroes");
const PORT = process.env.PORT ?? 5500;
const app = express();

/**
 * Middleware
 */
app.use(express.json());

/**
 * CRUD = GET === READ
 */
app.get("/", (req, res) => {
  res.send("coucou");
});

app.get("/api/superheroes", (req, res) => {
  res.send(heroes);
});

/**
 * CRUD = POST === CREATE
 */

app.post("/api/superheroes", (req, res) => {
  const newSuperHeroes = {
    id: heroes.length + 1,
    name: req.body.name,
    appearance: req.body.appearance,
  };
  heroes.push(newSuperHeroes);
  res.status(201).send(`${newSuperHeroes.name} added.`);
});

/**
 * CRUD = PUT === UPDATE
 */

app.put("/api/superheroes/:id", (req, res) => {
  const superhero = heroes.find((hero) => hero.id === parseInt(req.params.id));
  if (!superhero) {
    res.status(404).send("Hero not found");
  } else {
    superhero.name = req.body.name;
    res.send(`${superhero.name} updated`);
  }
});

/**
 * CRUD = DELETE === DELETE
 */

app.delete("/api/superheroes/:id", (req, res) => {
  const superhero = heroes.find((hero) => hero.id === parseInt(req.params.id));
  if (!superhero) {
    res.status(404).send("Hero not found..");
  } else {
    const index = heroes.indexOf(superhero);
    heroes.splice(index, 1);
    res.send(`${superhero.name} deleted.`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
