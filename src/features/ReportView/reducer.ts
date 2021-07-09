import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnProps } from 'devextreme-react/data-grid';
import { Employee, EmployeeName } from './types';

export interface Column {
  id: number
  type: 'active' | 'disable'
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
    addColumns(state, action: PayloadAction<{columns: Array<IColumnProps>, type: 'active' | 'disable'}>) {
      const lastId = state.columns ? state.columns[state.columns.length - 1].id : 0;
      const newColumns: Array<Column> = action.payload.columns.map((columnProps, i) => {
        const column: Column = {
          id: lastId + i,
          type: action.payload.type,
          props: columnProps,
        };
        return column;
      });
      if (state.columns) state.columns.push(...newColumns);
      else state.columns = newColumns;
    },
    setEmployees(state, action: PayloadAction<Array<Employee>>) {
      state.employees = action.payload;
    },
    changeColumnName(state, action: PayloadAction<{prevName: EmployeeName, newName: string}>) {
      const { prevName, newName } = action.payload;
      if (state.employees && state.columns && (prevName !== newName)) {
        const employeesResult = state.employees.map((employee) => {
          const result = {
            ...employee,
            [newName]: employee[prevName],
          };
          delete result[prevName];
          return result;
        });

        const columnsResult = state.columns.map((column) => {
          if (column.props?.dataField === prevName) {
            return {
              ...column,
              props: {
                ...column.props,
                dataField: newName,
              },
            };
          }
          return column;
        });

        state.employees = employeesResult;
        state.columns = columnsResult;
      }
    },
    changeColumnType(state, action: PayloadAction<{ id: number, type: 'active' | 'disable'}>) {
      state.columns = state.columns?.map((column) => {
        if (column.id === action.payload.id) {
          return {
            ...column,
            type: action.payload.type,
          };
        }
        return column;
      });
    },
  },
});

export const {
  addColumns,
  setEmployees,
  changeColumnName,
  changeColumnType,
} = reportViewSlice.actions;

export default reportViewSlice.reducer;
