import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyComponent2.css'; // Import your CSS file for styling

const MyComponent2 = () => {
  const [myData, setMyData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-fmace/endpoint/display_3latestvalue');
      setMyData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const startPolling = () => {
    const pollingInterval = setInterval(fetchData, 1000);
    return () => clearInterval(pollingInterval);
  };

  useEffect(() => {
    fetchData();
    const stopPolling = startPolling();

    return () => {
      stopPolling();
    };
  }, []);

  return (
    <div className="my-data-container">
      <h1 className="my-data-title">
        <span>Danh Sách Sản Phẩm: </span>
        {myData.length > 0 ? (
          <ul className="my-list">
            {myData.map((dataItem, index) => (
              <li key={index} className="my-list-item">
                <span className="item-index">{index + 1}.</span> {/* Số thứ tự */}
                <strong>Tên:</strong> {dataItem.ten} <br /> <strong>ㅤ Khối Lượng:</strong> {dataItem.khoiLuong} gram
              </li>
            ))}
          </ul>
        ) : (
          <span className="no-data-message">No data available.</span>
        )}
      </h1>
    </div>
  );
};

export default MyComponent2;
