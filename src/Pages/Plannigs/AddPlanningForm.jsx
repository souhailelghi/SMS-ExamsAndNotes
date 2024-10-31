import React, { useState } from 'react';
import { useNavigate, useParams  ,useLocation } from "react-router-dom";

function AddPlanningForm() {
    // const { id } = useParams(); 
    // const sportIdFromUrl = new URLSearchParams(useLocation().search).get("id");
    const sportId = new URLSearchParams(useLocation().search).get("id");
    // const [sportId, setSportId] = useState(sportIdFromUrl || '');
    const [day, setDay] = useState(0);
    const [timeRanges, setTimeRanges] = useState([{ hourStart: '', hourEnd: '' }]);
    const [dateCreation, setDateCreation] = useState(new Date().toISOString());
    // const sportIds = new URLSearchParams(useLocation().search).get("id");
    // console.log('id ?: '  , id);
    console.log(sportId);
    
   
    
    
    const navigate = useNavigate();
  const handleTimeRangeChange = (index, field, value) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges[index][field] = value;
    setTimeRanges(newTimeRanges);
  };

  const addTimeRange = () => {
    setTimeRanges([...timeRanges, { hourStart: '', hourEnd: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const planningData = {
      sportId,
      day: parseInt(day, 10),
      timeRanges,
      dateCreation,
    };

    try {
      const response = await fetch('https://localhost:7125/api/Plannings/add-planning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planningData),
      });

      if (response.ok) {
        alert('Planning added successfully!');
        navigate("/"); 
      } else {
        alert('Failed to add planning');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Sport ID:</label>
        <input
          type="text"
          value={sportId}
          readOnly
          required
        />
      </div>

      <div>
        <label>Day:</label>
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          min="0"
          max="6"
          required
        />
      </div>

      <div>
        <label>Time Ranges:</label>
        {timeRanges.map((range, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <label>Start Time:</label>
            <input
              type="time"
              value={range.hourStart}
              onChange={(e) => handleTimeRangeChange(index, 'hourStart', e.target.value)}
              required
            />
            <label>End Time:</label>
            <input
              type="time"
              value={range.hourEnd}
              onChange={(e) => handleTimeRangeChange(index, 'hourEnd', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addTimeRange}>Add Time Range</button>
      </div>

      <div>
        <label>Date Creation:</label>
        <input
          type="datetime-local"
          value={new Date(dateCreation).toISOString().slice(0, -1)}
          onChange={(e) => setDateCreation(new Date(e.target.value).toISOString())}
          required
        />
      </div>

      <button type="submit">Add Planning</button>
    </form>
  );
}

export default AddPlanningForm;
