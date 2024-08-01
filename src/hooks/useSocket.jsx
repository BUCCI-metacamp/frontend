// hooks/useSocket.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (room) => {
  const [sensorData, setSensorData] = useState([]);
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
  
      const eventName = room === 'edukit' ? 'edukit_data' : 'production_data';
  
      newSocket.on(eventName, (receivedData) => {
        setSensorData(receivedData);
        // 여기서 receivedData를 처리하는 로직을 추가할 수 있습니다.
      });
  
      setSocket(newSocket);
      // 컴포넌트가 언마운트될 때 소켓 연결을 닫습니다.
      return () => {
        newSocket.close();
      };
    }, [room]); // 빈 배열은 이 효과가 컴포넌트 마운트 시 한 번만 실행됨을 의미합니다.
  
    return { sensorData, socket } ;
  };

export default useSocket;