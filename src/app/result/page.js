"use client"
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/result_sub');
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Data:', data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  const genderData = [
    { name: 'Male', value: students.filter(student => student.gender === 'male').length },
    { name: 'Female', value: students.filter(student => student.gender === 'female').length },
  ];
  console.log('Gender Data:', genderData);

  const ageData = students.reduce((accumulator, student) => {
    const existingEntry = accumulator.find(entry => entry.age === student.age);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      accumulator.push({ age: student.age, count: 1 });
    }
    return accumulator;
  }, []);
  ageData.sort((a, b) => a.age - b.age);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <h1 className="text-2xl font-bold mb-4">Response sheet</h1>
      {students.length > 0 ? (
        <>
          <div className="bg-white shadow-xl rounded-lg p-4">
            {/* Check dimensions and data format for PieChart */}
            <PieChart width={400} height={400}>
              <Pie
                data={genderData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-4">
            <BarChart
              width={500}
              height={300}
              data={ageData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -10 }} /> {/* Display age distribution on the x-axis */}
              <YAxis dataKey="count" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} /> {/* Display the number of students in the age group on the y-axis */}
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}