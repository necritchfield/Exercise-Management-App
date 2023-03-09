import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add an exercise to your list</h2>
            <p>Enter values below and click 'Add.' 'Number of reps' and 'Weight' must be greater than 0.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which exercise are you adding?</legend>
                    <label for="name">Exercise name: </label>
                    <input
                        type="text"
                        placeholder="Name of exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name"
                        required />
                    
                    <label for="reps">Number of reps: </label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Number of reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps"
                        required />

                    <label for="weight">Weight: </label>
                    <input
                        type="number"
                        placeholder="Weight used"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight"
                        required />

                    <label for="unit">Unit: </label>
                    <select
                        type="text"
                        placeholder="Unit type"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                        id="unit"
                        required>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                        <option value="miles">miles</option>
                    </select>

                    <label for="date">Date: </label>
                    <input
                        type="date"
                        placeholder="Date of exercise"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date"
                        required />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addExercise}
                        id="submit"
                    >Add</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;