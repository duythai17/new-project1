import React from 'react';
import MongoDataComponent from './components/MongoDataComponent';
import './App.css'; // Import your CSS file for styling
import MyComponent from './components/MyComponent';
//import Snowflake from './components/Snowflake';
import MyComponent2 from './components/MyComponent2';

const App = () => {
  const numberOfSnowflakes = 50;

  return (
    <div className="app-container">
      {/* Container 1 */}
      <div className="container-left">
        <h1>Data From MongoDB</h1>
        <MongoDataComponent />
        <MyComponent />
      </div>

      {/* Container 2 */}
      <div className="container-right">
        <MyComponent2 />
      </div>
    </div>
  );
};

export default App;
        //{[...Array(numberOfSnowflakes)].map((_, index) => (<Snowflake key={index} />))}
