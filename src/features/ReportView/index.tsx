import React, { useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'devextreme-react/data-grid';
import ReportEditor from './components/ReportEditor';
import s from './index.module.css';
import { columnsSelector, employeesSelector } from './selectors';
import { Employee } from './types';
import { setColumns, setEmployees } from './reducer';

interface Props {
  employees: Array<Employee>
}

const ReportView: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const columns = useSelector(columnsSelector);
  const employees = useSelector(employeesSelector);
  const { employees: initEmployees } = props;

  useEffect(() => {
    if (initEmployees) {
      const employeeExampleKeys = Object.keys(initEmployees[0]);
      const initColumns = [
        {
          dataField: employeeExampleKeys[1],
        },
        {
          dataField: employeeExampleKeys[2],
        },
        {
          dataField: employeeExampleKeys[3],
        },
        {
          dataField: employeeExampleKeys[4],
        },
      ];
      dispatch(setColumns(initColumns));
      dispatch(setEmployees(props.employees));
    }
  }, [initEmployees]);

  return (
    <div className={s.wrapper}>
      <DataGrid
        id="reportView"
        keyExpr="ID"
        dataSource={employees}
        allowColumnReordering
        allowColumnResizing
        columnAutoWidth
        showBorders
      >
        {columns ? columns.map((column) => (
          <Column
            key={column.id}
            {...column.props}
          />
        )) : null}
      </DataGrid>
      <ReportEditor />
    </div>
  );
};

export default ReportView;
