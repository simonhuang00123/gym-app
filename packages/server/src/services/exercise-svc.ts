import { Schema, model } from "mongoose";
import type { Exercise } from "../models/index.js";

const exerciseSchema = new Schema<Exercise>(
  {
    name: String,
    href: String,
    muscleGroup: String,
    sets: String,
    reps: String
  },
  { collection: "exercises" }
);

const ExerciseModel = model<Exercise>("Exercise", exerciseSchema);

function index(): Promise<Exercise[]> {
  return ExerciseModel.find().lean();
}

function get(id: string): Promise<Exercise | undefined> {
  return ExerciseModel.findOne({ name: id })
    .lean()
    .then((doc) => doc ?? undefined);
}

function create(json: Exercise): Promise<Exercise> {
  const t = new ExerciseModel(json);
  return t.save();
}

function update(id: string, exercise: Exercise): Promise<Exercise | undefined> {
  return ExerciseModel.findOneAndUpdate({ name: id }, exercise, { new: true })
    .lean()
    .then((updated) => {
      if (!updated) throw new Error(`${id} not updated`);
      return updated;
    });
}

function remove(id: string): Promise<void> {
  return ExerciseModel.findOneAndDelete({ name: id }).then((deleted) => {
    if (!deleted) throw new Error(`${id} not deleted`);
  });
}

export default { index, get, create, update, remove };