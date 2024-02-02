// pages/index.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    college: '',
  });

  const router=useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/form_sub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setFormData({
          name: '',
          age: '',
          gender: '',
          college: '',
        });
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    router.push('/result');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Student Entry Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-semibold mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-semibold mb-2">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="college" className="block text-sm font-semibold mb-2">
            College Name:
          </label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}