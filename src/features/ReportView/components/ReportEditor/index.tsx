import React from 'react';
import { useSelector } from 'react-redux';
import { columnsSelector } from '../../selectors';
import { Column } from '../../reducer';
import ColumnEdit from './atoms/ColumnEdit';
import ColumnAdd from './atoms/ColumnAdd';

const ReportEditor: React.FC = () => {
  const columns = useSelector(columnsSelector);
  const activeColumns = columns?.filter((column: Column) => column.type === 'active');

  return (
    <div>
      {activeColumns?.map((column: Column) => (
        <ColumnEdit {...column} />
      ))}
      <ColumnAdd />
    </div>
  );
};

export default ReportEditor;
