import React, { useState, useEffect } from "react";
import AddReadingForm from "./components/AddReadingForm";
import ReadingList from "./components/ReadingList";
import "./App.css"; 

const App = () => {
  const [readings, setReadings] = useState([]);

  // Load saved readings from localStorage on initial load
  useEffect(() => {
    const savedReadings = JSON.parse(localStorage.getItem("readings")) || [];
    setReadings(savedReadings);
  }, []);

  // Save readings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("readings", JSON.stringify(readings));
  }, [readings]);

  const addReading = (reading) => {
    setReadings([...readings, reading]);
  };

  const deleteReading = (id) => {
    setReadings(readings.filter((reading) => reading.id !== id));
  };

  return (
    <div className="App">
      <h1>Blood Pressure Tracker</h1>
      {/* <AddReadingForm onAddReading={addReading} /> */}
      <ReadingList readings={readings} onDeleteReading={deleteReading} />
    </div>
  );
};

export default App;
