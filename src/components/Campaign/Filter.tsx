import React, { useState } from "react";

function FilterComponent({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const handleFilterChange = (e) => {
    setSelectedOption(e.target.value);
    onFilterChange(e.target.value); // Call parent function with selected filter value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block text-left">
      {/* Filter Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-.293.707l-4.364 4.364a1 1 0 00-.293.707v3.586a1 1 0 01-1.414.707l-2.828-1.414A1 1 0 017 14.586v-3.586a1 1 0 00-.293-.707L2.343 6.707A1 1 0 013 5V5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2">Filter</span>
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <select
              value={selectedOption}
              onChange={handleFilterChange}
              className="block w-full px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 focus:bg-gray-200 border-none focus:outline-none rounded-md"
            >
              <option value="all">All</option>
              <option value="fundraising">Fundraising</option>
              <option value="donationLink">Donation Link</option>
              <option value="paymentLink">Payment</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterComponent;
