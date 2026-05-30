import express from "express";
import Exercises from "../services/exercise-svc.js";
const router = express.Router();
router.get("/", (_, res) => {
    Exercises.index()
        .then((list) => res.send(list))
        .catch((err) => res.status(500).send(String(err)));
});
router.get("/:id", (req, res) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    Exercises.get(id)
        .then((exercise) => {
        if (!exercise)
            res.status(404).send();
        else
            res.send(exercise);
    })
        .catch((err) => res.status(500).send(String(err)));
});
router.post("/", (req, res) => {
    const newExercise = req.body;
    Exercises.create(newExercise)
        .then((exercise) => res.status(201).json(exercise))
        .catch((err) => res.status(500).send(String(err)));
});
router.put("/:id", (req, res) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const newExercise = req.body;
    Exercises.update(id, newExercise)
        .then((exercise) => res.json(exercise))
        .catch((err) => res.status(404).send(String(err)));
});
router.delete("/:id", (req, res) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    Exercises.remove(id)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(String(err)));
});
export default router;
