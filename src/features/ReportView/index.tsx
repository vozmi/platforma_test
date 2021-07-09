import React, { useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import { useDispatch, useSelector } from 'react-redux';
import { Column, ColumnFixing } from 'devextreme-react/data-grid';
import ReportEditor from './components/ReportEditor';
import s from './index.module.css';
import { activeColumnsSelector, employeesSelector } from './selectors';
import { Employee } from './types';
import { addColumns, setEmployees } from './reducer';

interface Props {
  employees: Array<Employee>
}

const ReportView: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const activeColumns = useSelector(activeColumnsSelector);
  const employees = useSelector(employeesSelector);
  const { employees: initEmployees } = props;

  useEffect(() => {
    if (initEmployees) {
      const employeeExampleKeys = Object.keys(initEmployees[0]);
      const initColumns = [
        {
          dataField: employeeExampleKeys[3],
        },
        {
          dataField: employeeExampleKeys[4],
        },
        {
          dataField: employeeExampleKeys[5],
        },
        {
          dataField: employeeExampleKeys[6],
        },
      ];
      dispatch(addColumns({ columns: initColumns, type: 'active' }));

      const disabledColumns = [];
      for (let i = 7; i < employeeExampleKeys.length; i += 1) {
        disabledColumns.push({
          dataField: employeeExampleKeys[i],
        });
      }
      dispatch(addColumns({
        columns: disabledColumns,
        type: 'disable',
      }));
      dispatch(setEmployees(props.employees));
    }
  }, [initEmployees]);

  return (
    <div className={s.wrapper}>
      <DataGrid
        id="reportView"
        keyExpr="ID"
        dataSource={employees}
        style={{ height: '440px', overflowX: 'scroll' }}
        allowColumnReordering
        allowColumnResizing
        columnAutoWidth
        showBorders
      >
        <ColumnFixing enabled />
        <Column
          caption="Employee"
          width={230}
          fixed
          calculateCellValue={(employee: Employee) => `${employee.FirstName} ${employee.LastName}`}
        />
        {activeColumns ? activeColumns.map((column) => (
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
