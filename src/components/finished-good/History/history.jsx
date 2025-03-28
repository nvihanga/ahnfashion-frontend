import React from 'react';

const History = () => {
    const sampleData = [
        { id: 1, item: 'T-Shirt', date: '2023-10-01', status: 'Sold' },
        { id: 2, item: 'Jeans', date: '2023-10-02', status: 'Returned' },
        { id: 3, item: 'Jacket', date: '2023-10-03', status: 'Sold' },
    ];

    return (
        <div>
            <h1>Finished Goods History</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.item}</td>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;