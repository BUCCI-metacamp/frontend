import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/src/apis/userApi/axiosInstance';


const Timer = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTimeInMs = new Date(startTime).getTime(); // 타임스탬프 형식을 밀리초로 변환
    const intervalId = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeInMs) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours} : ${minutes} : ${remainingSeconds}`;
  };

  return (
    <div>
      <p>가동 시간: {formatTime(elapsedTime)}</p>
    </div>
  );
};
const UpTime = () => {
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axiosInstance.get('/dashboard/uptime', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setStartTime(data.time);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the timestamp:', error);
        setLoading(false);
      }
    };

    fetchStartTime();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!startTime) {
    return <div>Error loading start time.</div>;
  }

  return (
    <div>
      <Timer startTime={startTime} />
    </div>
  );
};

export default UpTime;


