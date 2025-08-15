import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {

  const getRandomColor = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  }

  const [currChart, setCurrChart] = useState("students");

  const studentChartData = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColor(courses.length)
      }
    ]
  }

  const incomeChartData = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColor(courses.length)
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="mt-3">
      <div>
        <button
          className={`${currChart === "students" ? "bg-richblack-700 text-yellow-50 rounded-md font-semibold" : "text-yellow-200"} px-2 py-1 transition-all duration-200`}
          onClick={() => { setCurrChart("students") }}
        >Student</button>
        <button
          className={`${currChart === "income" ? "bg-richblack-700 text-yellow-50 rounded-md font-semibold" : "text-yellow-200"} px-2 py-1 transition-all duration-200`}
          onClick={() => { setCurrChart("income") }}
        >Income</button>
      </div>
      <div className="my-6">
        <Pie data={currChart==="students"?studentChartData:incomeChartData} options={options}></Pie>
      </div>
    </div>
  )
}

export default InstructorChart
