import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions'
import { useEffect } from 'react'
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement)
// import faker from 'faker'


export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered',]

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])

    function getToysPrices(labels) {
        return labels.map(label => {
            const toyLabels = toys.filter(toy => toy.labels?.includes(label.toLowerCase()))
            const totalPrice = toyLabels.reduce((sum, toy) => sum + toy.price, 0)
            return totalPrice / toyLabels.length
        })
    }

    function getToysCountByLabel(labels, toys) {
        return labels.map(label => toys.filter(toy => toy.labels?.includes(label.toLowerCase())).length)
    }

    const donutData = {
        labels,
        datasets: [
            {
                label: '# price',
                data: getToysPrices(labels),
                backgroundColor: [
                    'rgba(32, 163, 223, 0.39)',
                    'rgba(224, 25, 25, 0.75)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 163, 235, 0.76)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 0.68)',
                    'rgba(173, 243, 82, 0.77)',
                ],
            },
        ],
    }

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Price by Label',
                font: { size: 20 },
            },
            legend: {
                position: 'bottom'
            }
        }
    }

    const barData = {
        labels,
        datasets: [
            {
                label: 'Inventory',
                data: getToysCountByLabel(labels, toys),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                text: 'Inventory by label',
                display: true,
                font: { size: 20 },
            },
        },
    }
    return (
        <section className="dashboard">
            <h2>Dashboard</h2>
            <div className="chart-container">
                <Doughnut className="chart" data={donutData} options={donutOptions} />
                <Bar className="chart" options={barOptions} data={barData} />
            </div>
        </section>
    )
}

