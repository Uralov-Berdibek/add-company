import React from 'react';

interface TableItemProps {
  name: string;
  employeeCount: number;
}

const TableItem: React.FC<TableItemProps> = ({ name, employeeCount }) => {
  return (
    <tr className='border-b'>
      <td className='p-3'>{name}</td>
      <td className='p-3'>{employeeCount} человек</td>
    </tr>
  );
};

export default TableItem;
