import React from 'react';

const DatePicker = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="month"
      value={value}
      onChange={onChange}
      className="p-2 border rounded-md"
    />
  </div>
);

export default DatePicker;