import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnProps } from 'devextreme-react/data-grid';
import { Employee, EmployeeName } from './types';

export interface Column {
  id: number
  type: 'hidden' | 'visible'
  props: IColumnProps
}

interface IS {
  columns: Array<Column> | undefined
  employees: Array<Employee> | undefined
}

const initialState: IS = {
  columns: undefined,
  employees: undefined,
};

const reportViewSlice = createSlice({
  name: 'reportView',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<Array<IColumnProps>>) {
      state.columns = action.payload.map((columnProps, i) => {
        const column: Column = {
          id: i,
          type: 'hidden',
          props: columnProps,
        };
        return column;
      });
    },
    setEmployees(state, action: PayloadAction<Array<Employee>>) {
      state.employees = action.payload;
    },
    changeColumnName(state, action: PayloadAction<{prevName: EmployeeName, newName: string}>) {
      if (state.employees && state.columns) {
        const { prevName, newName } = action.payload;

        const employeesResult = state.employees.map((employee) => {
          const result = {
            ...employee,
            [newName]: employee[prevName],
          };
          delete result[prevName];
          return result;
        });

        const columnsResult = state.columns.map((column) => ({
          ...column,
          props: {
            ...column.props,
            dataField: newName,
          },
        }));

        state.employees = employeesResult;
        state.columns = columnsResult;
      }
    },
  },
});

export const {
  setColumns,
  setEmployees,
  changeColumnName,
} = reportViewSlice.actions;

export default reportViewSlice.reducer;
