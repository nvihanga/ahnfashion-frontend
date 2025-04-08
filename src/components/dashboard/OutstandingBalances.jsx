import React from 'react';

const OutstandingBalances = ({
  data = [
    { name: 'Customer A', customer: 150000 },
    { name: 'Supplier X', supplier: 75000 },
    { name: 'Customer B', customer: 90000 },
    { name: 'Supplier Y', supplier: 120000 },
    { name: 'Customer C', customer: 60000 },
  ],
  title = 'Outstanding Balances',
  textColor = '#4B5563'
}) => {
  // Separate data into customers and suppliers
  const customers = data.filter(item => item.customer > 0);
  const suppliers = data.filter(item => item.supplier > 0);

  // Calculate totals
  const customerTotal = customers.reduce((sum, entry) => sum + (entry.customer || 0), 0);
  const supplierTotal = suppliers.reduce((sum, entry) => sum + (entry.supplier || 0), 0);

  // Table component
  const renderTable = (title, items, type) => (
    <div className="mb-6">
      <h3 className="text-md font-semibold mb-2 p-2 bg-gray-50 rounded-t">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="flex bg-gray-50 p-3 border-b border-gray-200 font-semibold">
            <div className="w-3/5">Name</div>
            <div className="w-2/5 text-right">Amount</div>
          </div>

          {/* Table Rows */}
          {items.map((entry, index) => (
            <div 
              key={index}
              className="flex p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="w-3/5">{entry.name}</div>
              <div className="w-2/5 text-right">
                Rs.{(type === 'customer' ? entry.customer : entry.supplier).toLocaleString()}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {items.length === 0 && (
            <div className="p-3 text-center text-gray-500">
              No outstanding {type === 'customer' ? 'customers' : 'suppliers'}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-full">
      <h2 className="text-lg font-semibold mb-4" style={{ color: textColor }}>
        {title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Table */}
        <div className="border rounded-lg overflow-hidden">
          {renderTable('Customer Outstanding', customers, 'customer')}
        </div>

        {/* Supplier Table */}
        <div className="border rounded-lg overflow-hidden">
          {renderTable('Supplier Outstanding', suppliers, 'supplier')}
        </div>
      </div>

      {/* Totals Section */}
      <div className="mt-6 text-sm" style={{ color: textColor }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded">
            <span className="block font-medium">Total Customer Outstanding:</span>
            <b className="text-lg">Rs.{customerTotal.toLocaleString()}</b>
          </div>
          <div className="p-3 bg-green-50 rounded">
            <span className="block font-medium">Total Supplier Outstanding:</span>
            <b className="text-lg">Rs.{supplierTotal.toLocaleString()}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingBalances;