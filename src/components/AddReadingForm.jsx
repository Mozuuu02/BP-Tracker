import React, { useState } from "react";
import "../App.css"; 

const AddReadingForm = ({ onAddReading }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!systolic || !diastolic) {
      alert("Please fill in both values!");
      return;
    }

    const newReading = {
      id: Date.now(),
      systolic,
      diastolic,
      time: Date.now(),  // Store as timestamp instead of string
    };

    onAddReading(newReading);

    setSystolic("");
    setDiastolic("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder=""
        value={systolic}
        onChange={(e) => setSystolic(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder=""
        value={diastolic}
        onChange={(e) => setDiastolic(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddReadingForm;
