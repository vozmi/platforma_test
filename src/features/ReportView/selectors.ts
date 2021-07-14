import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const columnsSelector = (state: RootState) => state.reportView.columns;
export const activeColumnsSelector = createSelector(
  columnsSelector,
  (columns) => columns?.filter((column) => column.type === 'active'),
);
export const disabledColumnsSelector = createSelector(
  columnsSelector,
  (columns) => columns?.filter((column) => column.type === 'disable'),
);
export const dataSelector = (state: RootState) => state.reportView.data;
