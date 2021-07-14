import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnProps } from 'devextreme-react/data-grid';

export interface Column {
  id: number
  type: 'active' | 'disable'
  props: IColumnProps
}

interface IS {
  columns: Array<Column> | undefined
  data: Array<{[index: string]:any}> | undefined
}

const initialState: IS = {
  columns: undefined,
  data: undefined,
};

const reportViewSlice = createSlice({
  name: 'reportView',
  initialState,
  reducers: {
    addColumns(state, action: PayloadAction<{columns: Array<IColumnProps>, type: 'active' | 'disable'}>) {
      const lastId = (state.columns && state.columns.length !== 0)
        ? state.columns[state.columns.length - 1].id : 0;
      const newColumns: Array<Column> = action.payload.columns.map((columnProps, i) => {
        const column: Column = {
          id: lastId + 1 + i,
          type: action.payload.type,
          props: columnProps,
        };
        return column;
      });
      if (state.columns) state.columns.push(...newColumns);
      else state.columns = newColumns;
    },
    setData(state, action: PayloadAction<Array<{}>>) {
      state.data = action.payload;
    },
    changeColumnName(state, action: PayloadAction<{prevName: string, newName: string}>) {
      const { prevName, newName } = action.payload;
      if (state.data && state.columns && (prevName !== newName) && prevName) {
        const dataResult = state.data.map((item) => {
          const result = {
            ...item,
            [newName]: item[prevName],
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

        state.data = dataResult;
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
  setData,
  changeColumnName,
  changeColumnType,
} = reportViewSlice.actions;

export default reportViewSlice.reducer;
