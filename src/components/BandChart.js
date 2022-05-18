import React, { useContext, useEffect } from 'react'
import { Chart, registerables } from 'chart.js';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {
    const { socket } = useContext(SocketContext);
    const ctx = React.useRef(null);
    let myChart;

    useEffect(() => {
        socket.on('band-list', bands => {
            createChart(bands);
        });

        return () => socket.off('current-bands');
    }, [socket]);


    const createChart = (bands = []) => {
        Chart.register(...registerables);
        if (myChart) { myChart.destroy(); }

        const data = {
            labels: bands.map(band => band.name),
            datasets: [{
                label: '# of Votes',
                data: bands.map(band => band.votes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                animation: false,
                scales: {
                    x: { stacked: true },
                    y: { beginAtZero: true },
                },
                indexAxis: 'y'
            }
        };

        myChart = new Chart(ctx.current, config);

    }



    return (
        <canvas ref={ctx}></canvas>
    )
}