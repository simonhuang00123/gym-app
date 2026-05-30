import express, { Request, Response } from "express";
import type { Exercise } from "../models/index.js";
import Exercises from "../services/exercise-svc.js";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  Exercises.index()
    .then((list: Exercise[]) => res.send(list))
    .catch((err) => res.status(500).send(String(err)));
});

router.get("/:id", (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  Exercises.get(id)
    .then((exercise: Exercise | undefined) => {
      if (!exercise) res.status(404).send();
      else res.send(exercise);
    })
    .catch((err) => res.status(500).send(String(err)));
});

router.post("/", (req: Request, res: Response) => {
  const newExercise = req.body;

  Exercises.create(newExercise)
    .then((exercise) => res.status(201).json(exercise))
    .catch((err) => res.status(500).send(String(err)));
});

router.put("/:id", (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const newExercise = req.body;

  Exercises.update(id, newExercise)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(404).send(String(err)));
});

router.delete("/:id", (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  Exercises.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(String(err)));
});

export default router;