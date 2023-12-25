// Import necessary libraries and CSS file
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MongoDataComponent.css'; // Import your CSS file for styling

// Define your component
const MongoDataComponent = () => {
  // State for weight data and setpoint
  const [weightData, setWeightData] = useState([]);
  const [setpointData, setSetpoint] = useState([]);

  // Function to fetch data from MongoDB
  const fetchData = async () => {
    try {
      // Fetch weight data
      const weightResponse = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-fmace/endpoint/get_updatedvalue');
      setWeightData(weightResponse.data);

      // Fetch setpoint data
      const setpointResponse = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-fmace/endpoint/get_setpoint');
      setSetpoint(setpointResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to start polling
  const startPolling = () => {
    const pollingInterval = setInterval(fetchData, 1000); // Adjust the interval as needed (e.g., 5000 for every 5 seconds)
    return () => clearInterval(pollingInterval);
  };

  // useEffect to run when the component mounts
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
    const stopPolling = startPolling(); // Start polling

    return () => {
      stopPolling(); // Stop polling when the component is unmounted
    };
  }, []);

  // Render the component UI
  return (
    <div className="data-container">
      <div className="weight-data-container">
        <h1 className="weight-data-title">
          <span>Weight Data: </span>
          {weightData.length > 0 ? (
            <span className="weight-data-value">{weightData[0].weight} gram</span>
          ) : (
            <span className="no-data-message">No weight data available.</span>
          )}
        </h1>
      </div>

      <div className="setpoint-data-container">
        <h1 className="setpoint-data-title">
          <span>Setpoint: </span>
          {setpointData.length > 0 ? (
            <span className="setpoint-data-value">{setpointData[0].setpoint} gram</span>
          ) : (
            <span className="no-data-message">No setpoint data available.</span>
          )}
        </h1>
      </div>
    </div>
  );
};

// Export the component
export default MongoDataComponent;
