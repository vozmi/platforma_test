import { RootState } from '../../store';

export const columnsSelector = (state: RootState) => state.reportView.columns;
export const employeesSelector = (state: RootState) => state.reportView.employees;
