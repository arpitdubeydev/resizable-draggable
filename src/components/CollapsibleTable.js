import React, { useState } from 'react';

const CollapsibleTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide' : 'Show'} Table
      </button>

      {isOpen && (
        <div className="overflow-hidden transition-all duration-700 mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* Add more table headers if needed */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Add table rows and data here */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CollapsibleTable;
