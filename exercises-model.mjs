import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// confirm successful connection to mongodb, print confirmation message
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Exercises collection using Mongoose.');
    }
});

const exSchema = mongoose.Schema({
	name: { type: String, required: true, minLength: 1 },
	reps: { type: Number, required: true, min: 1 },
	weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, enum: ['kgs', 'lbs', 'miles'] },
    date: { type: Date, required: true, default: new Date() }
});

const Exercise = mongoose.model("Exercise", exSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ 
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return exercise.save();
}

const findExercises = async () => {
    const query = Exercise.find({});
    return query.exec();
}

const findExById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
};

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id }, {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return result.modifiedCount;
}

export { createExercise, findExercises, findExById, replaceExercise, deleteById }