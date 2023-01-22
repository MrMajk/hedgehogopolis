import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Reservations statistic',
        },
    }
}

const Account = () => {
    const reservations = useSelector((state: any) => state.admin.reservations)
    const [chartValues, setChartValues] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);

    useEffect(() => {
        // @ts-ignore
        const data = reservations.reduce((res, {startDate}) => {
            const year = new Date(startDate).getFullYear(),
                month = new Date(startDate).getMonth()+1
            res[`${year}-${month}`] = (res[`${year}-${month}`] || 0) + 1
            return res
        }, {})
        setChartValues(Array.from(Object.values(data)))
        // @ts-ignore
        setChartLabels(Array.from(Object.keys(data)))
        console.log(data, chartValues, chartLabels)
    }, [reservations]);



    return <Bar options={options} data={{
        // @ts-ignore
        labels:chartLabels,
        datasets: [
            {
                label: 'Reservation count',
                data: chartValues
            }
        ],}
    } />;
}

export default Account
