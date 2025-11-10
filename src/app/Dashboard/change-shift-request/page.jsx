'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ChangeWorkshiftForm() {
  const [formData, setFormData] = useState({
    workShift: '',
    fromDate: '',
    toDate: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const workShiftOptions = [
    { value: '', label: 'Choose Work Shift' },
    { value: 'morning', label: 'Morning Shift (6 AM - 2 PM)' },
    { value: 'day', label: 'Day Shift (9 AM - 5 PM)' },
    { value: 'evening', label: 'Evening Shift (2 PM - 10 PM)' },
    { value: 'night', label: 'Night Shift (10 PM - 6 AM)' },
    { value: 'flexible', label: 'Flexible Shift' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.workShift) newErrors.workShift = 'Please select a work shift';
    if (!formData.fromDate) newErrors.fromDate = 'Please select start date';
    if (!formData.toDate) newErrors.toDate = 'Please select end date';
    if (formData.fromDate && formData.toDate) {
      if (new Date(formData.toDate) <= new Date(formData.fromDate)) {
        newErrors.toDate = 'End date must be after start date';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch('https://your-backend-url.com/api/change-workshift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Workshift Changed Successfully!',
          showConfirmButton: false,
          timer: 2000
        });

        setFormData({ workShift: '', fromDate: '', toDate: '' });
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed to Submit',
          text: data?.message || 'Something went wrong.'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'API Error',
        text: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your entered data will be lost!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({ workShift: '', fromDate: '', toDate: '' });
        setErrors({});
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-100 flex items-center gap-3">
        <div className="text-indigo-600 text-2xl">✈️</div>
        <h1 className="text-2xl font-semibold text-indigo-600">Change Workshift</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Work Shift */}
          <div>
            <label htmlFor="workShift" className="block text-sm font-medium text-gray-700 mb-2">
              Work Shift <span className="text-red-600">*</span>
            </label>
            <select
              id="workShift"
              name="workShift"
              value={formData.workShift}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                errors.workShift ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {workShiftOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.workShift && <p className="mt-1 text-sm text-red-600">{errors.workShift}</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">
                From Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.fromDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fromDate && <p className="mt-1 text-sm text-red-600">{errors.fromDate}</p>}
            </div>

            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">
                To Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                min={formData.fromDate}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.toDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.toDate && <p className="mt-1 text-sm text-red-600">{errors.toDate}</p>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 pt-8 border-t-2 border-gray-100 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md transition-all flex items-center gap-2 ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-3 bg-white text-red-600 font-semibold border border-gray-300 rounded-md hover:bg-red-50 transition-all flex items-center gap-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
