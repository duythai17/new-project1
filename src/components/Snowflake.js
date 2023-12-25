// Snowflake.js
import React, { useEffect, useRef } from 'react';
import './Snowflake.css';

const Snowflake = () => {
  const snowflakeRef = useRef(null);

  useEffect(() => {
    const startPositionX = Math.random() * window.innerWidth;
    const rotation = Math.random() * 360;
    const initialTop = -10;
    const speed = Math.random() * 4 + 1; // Change the speed value to adjust the falling speed

    snowflakeRef.current.style.top = `${initialTop}px`;

    const animateSnowflake = () => {
      let currentY = parseFloat(snowflakeRef.current.style.top);

      if (currentY < window.innerHeight) {
        currentY += speed;
        snowflakeRef.current.style.top = `${currentY}px`;
        requestAnimationFrame(animateSnowflake);
      } else {
        snowflakeRef.current.style.top = `${initialTop}px`;
        snowflakeRef.current.style.left = `${Math.random() * window.innerWidth}px`;

        setTimeout(() => {
          animateSnowflake();
        }, 2000);
      }
    };

    snowflakeRef.current.style.left = `${startPositionX}px`;
    snowflakeRef.current.style.transform = `rotate(${rotation}deg)`;

    animateSnowflake();
  }, []);

  return <div ref={snowflakeRef} className="snowflake" />;
};

export default Snowflake;
