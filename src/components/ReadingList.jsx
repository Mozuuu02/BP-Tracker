import React, { useEffect, useState } from "react";
import AddReadingForm from "./AddReadingForm";

const ReadingList = () => {
  const [readings, setReadings] = useState(() => {
    // Load readings from localStorage or fallback to an empty array
    const savedReadings = localStorage.getItem("readings");
    return savedReadings ? JSON.parse(savedReadings) : [];
  });

  // Save readings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("readings", JSON.stringify(readings));
  }, [readings]);

  const addReading = (newReading) => {
    setReadings((prevReadings) => [...prevReadings, newReading]);
  };

  const deleteReading = (id) => {
    setReadings((prevReadings) => prevReadings.filter((reading) => reading.id !== id));
  };

  const formatDateTime = (dateInput) => {
    const d = new Date(dateInput);
    return !isNaN(d.getTime()) ? formatDate(d) : "Invalid Date";
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>

      {<AddReadingForm onAddReading={addReading}/> }

      <h2>Saved Readings</h2>

      {readings.length > 0 ? (
        <ul>
          {readings.map((reading) => (
            <li key={reading.id} style={{ margin: "10px 0" }}>
              <span
                style={{
                  color:
                    reading.systolic > 140 || reading.systolic < 110
                      ? "red"
                      : "black",
                }}
              >
                {formatDateTime(reading.time)} - {reading.systolic}/{reading.diastolic}
              </span>
              <button onClick={() => deleteReading(reading.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No readings yet. Add some!</p>
      )}
    </div>
  );
};

export default ReadingList;
