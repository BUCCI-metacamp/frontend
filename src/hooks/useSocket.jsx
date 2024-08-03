// hooks/useSocket.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (room) => {
  const [sensorData, setSensorData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [socket, setSocket] = useState(null);

  
    useEffect(() => {

      const token = localStorage.getItem("token");
      const newSocket = io('http://158.247.241.162:3001', {
        withCredentials: false,
        query: { token },
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('request_join_room', room);
        console.log("joined room name : ", room);
      });
      

        if (room === 'edukit') {
          newSocket.on('edukit_data', (receivedData) => {
            // console.log("Received edukit data:", receivedData);
            setSensorData(receivedData);
          })
        } else if (room === 'production') {
          newSocket.on('production_data', (receivedData) => {
            // console.log("Received production data:", receivedData);
            setSensorData(receivedData);
          })
        } else if (room === 'uptime') {
          newSocket.on('change_power', (receivedData) => {
            // console.log("Received power change:", receivedData);
            setSensorData(receivedData);
          })
        }


  
      setSocket(newSocket);
      console.log("setsocket")
      // 컴포넌트가 언마운트될 때 소켓 연결을 닫습니다.
      return () => {
        newSocket.close();
      };
    }, [room]);
  
    return { sensorData, socket } ;
  };

export default useSocket;