import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart () {
  return (
    <div>
      <Bar
        data={{
          labels: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday '],
          datasets: [{
            label: '# of Votes',
            data: [40000, 90000, 30000, 50000, 20000, 30000, 60000],
            backgroundColor: [
              '#6379F4'
            ],
            color: '#6379F4',
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            borderRadius: 15,
            barThickness: 14
            // maxBarThickness: 20,
          }]
        }}
        height={330}
        width={650}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    </div>
  )
}

export default BarChart
