// pages/DataVisualizationPage.js
import React from 'react';
import BooleanChart from '../components/chart/unitChart/unit1Chart';
// import LineChart from '../components/LineChart';
import useSocket from '../hooks/useSocket';

const Dashboard = () => {
  const { sensorData, socket } = useSocket();

  return (
    <div>
      <h1>실시간 데이터 시각화</h1>
      <BooleanChart data={sensorData} />
      {/* <LineChart data={chartsData.chart2} /> */}
      <p>연결 상태: {socket && socket.connected ? '연결됨' : '연결 안됨'}</p>
    </div>
  );
};

export default Dashboard;