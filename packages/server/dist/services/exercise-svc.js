import { Schema, model } from "mongoose";
const exerciseSchema = new Schema({
    name: String,
    href: String,
    muscleGroup: String,
    sets: String,
    reps: String
}, { collection: "exercises" });
const ExerciseModel = model("Exercise", exerciseSchema);
function index() {
    return ExerciseModel.find().lean();
}
function get(id) {
    return ExerciseModel.findOne({ name: id })
        .lean()
        .then((doc) => doc ?? undefined);
}
function create(json) {
    const t = new ExerciseModel(json);
    return t.save();
}
function update(id, exercise) {
    return ExerciseModel.findOneAndUpdate({ name: id }, exercise, { new: true })
        .lean()
        .then((updated) => {
        if (!updated)
            throw new Error(`${id} not updated`);
        return updated;
    });
}
function remove(id) {
    return ExerciseModel.findOneAndDelete({ name: id }).then((deleted) => {
        if (!deleted)
            throw new Error(`${id} not deleted`);
    });
}
export default { index, get, create, update, remove };
