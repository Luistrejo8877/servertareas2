import express from "express";
import db from "./utils/database.js";
import todos from "./models/todos.model.js";
import cors from "cors"
const PORT = process.env.PORT || 8000;

todos;

db.authenticate()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

db.sync()
  .then((res) => console.log("conectado a la base de datos"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get("/", (req, res) => {

  res.send("¡Servidor en funcionamiento!");
});

app.listen(PORT, () => {

  console.log("escuchando el puerto", PORT);
});

app.get("/todos", async (req, res) => {

  try {

    const tareas = await todos.findAll();
    res.json(tareas);

  } catch (error) {

    console.log("hubo un error");
  }
});

app.get("/todos/:id", async (req, res) => {

  try {

    const id = req.params.id;
    const tarea = await todos.findByPk(id);

    if (!tarea) {

      res.status(404).json({ mmesage: "id not found" });
    }

    res.json(tarea);

  } catch (err) {

    res.status(201).json({ err: "ocurrió un error" });
    console.log(err);
  }
});

app.post("/todos", async (req, res) => {

  try {

    const { title, description, completed } = req.body;

    const newTarea = await todos.create({ title, description, completed });

    res.json({ message: "tarea agregada" });

  } catch (err) {

    res.status(201).json({ err: "ocurrió un error" });
  }
});

app.put("/todos/:id", async (req, res) => {

  try {

    const { title, description, completed } = req.body;
    const tareaId = req.params.id;
    const tarea = await todos.findByPk(id);

    if (!tarea) {

      res.status(404).json({ message: "tarea not found" });
    }

    await todos.update(
      { title, description, completed },
      { where: { id: tareaId } }
    );

    res.json({ message: "added" });

  } catch (err) {

    res.status(201).json({ err: "Update error" });
  }
});

app.delete("/todos/:id", async (req, res) => {

  try {

    const tareaId = req.params.id;
    const tarea = todos.findByPk(tareaId);

    if (!tarea) {

      res.status(404).json({ message: "tarea not found" });
    }

    await tarea.destroy();

    res.status(301).json({ message: "tarea destroyed" });

  } catch (err) {
    
    res.status(201).json({ err: "error destroying task" });
  }
});
