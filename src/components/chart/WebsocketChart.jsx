// import React, { useEffect, useState } from 'react';
// import { Chart, registerables } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// Chart.register(...registerables);

// const WebSocketChart = () => {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: 'My Dataset',
//                 data: [],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             }
//         ]
//     });

//     useEffect(() => {
//         // 웹소켓 연결 설정
//         const socket = new WebSocket('ws://158.247.241.162:3001');

//         socket.onopen = () => {
//             // room에 가입하는 메시지 전송
//             socket.send(JSON.stringify({ type: 'join', room: 'edukit' }));
//         };

//         socket.onmessage = function(event) {
//             let data;
//             try {
//                 data = JSON.parse(event.data);
//             } catch (e) {
//                 console.error('Invalid JSON received:', event.data);
//                 return;
//             }
//             updateChartData(data);
//         };

//         return () => {
//             socket.close();
//         };
//     }, []);

//     const updateChartData = (data) => {
//         const labels = data.map(item => item.name);
//         const values = data.map(item => item.value);

//         setChartData({
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'My Dataset',
//                     data: values,
//                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 1
//                 }
//             ]
//         });
//     };

//     return (
//         <div>
//             <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//         </div>
//     );
// };

// export default WebSocketChart;
