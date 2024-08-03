import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '@/src/apis/userApi/axiosInstance';
import useSocket from '@/src/hooks/useSocket';

const Timer = ({ startTime, isPowerOff, setPowerOff, fetchStartTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { sensorData, socket } = useSocket('uptime');

  useEffect(() => {
    const startTimeInMs = new Date(startTime).getTime(); // 타임스탬프 형식을 밀리초로 변환
    const intervalId = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeInMs) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    if (sensorData === 1 || sensorData === 0) {
      setPowerOff(sensorData === 1 ? false : true);
      fetchStartTime();

    }
  }, [sensorData]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours} : ${minutes} : ${remainingSeconds}`;
  };

  return (
    <>
      {!isPowerOff ? (
        <div>
          <p>가동 시간: {formatTime(elapsedTime)}</p>
        </div>
      ) : (
        <div>
          <p>가동 시간: 00:00</p>
        </div>
      )}
    </>
  );
};

const UpTime = () => {
  const [startTime, setStartTime] = useState(null);
  const [isPowerOff, setPowerOff] = useState(false);

  const fetchStartTime = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get('/dashboard/uptime', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      if(data.value){
        setStartTime(data.time);

      }
      else {
        setStartTime(0)
        setPowerOff(true);
      }
    } catch (error) {
      console.error('Error fetching the timestamp:', error);

    }
  };

  useEffect(() => {
    fetchStartTime();
  }, []);


  return (
    <div>
      <Timer startTime={startTime} isPowerOff={isPowerOff} setPowerOff={setPowerOff} fetchStartTime={fetchStartTime} />
    </div>
  );
};

export default UpTime;