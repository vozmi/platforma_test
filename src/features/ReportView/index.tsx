import React, { useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'devextreme-react/data-grid';
import ReportEditor from './components/ReportEditor';
import s from './index.module.css';
import { activeColumnsSelector, dataSelector } from './selectors';
import { ReportConfig } from './types';
import { addColumns, setData } from './reducer';

interface Props {
  config: ReportConfig
  data: Array<object>
}

const ReportView: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const activeColumns = useSelector(activeColumnsSelector);
  const { config, data: propsData } = props;
  const data = useSelector(dataSelector);

  useEffect(() => {
    dispatch(setData(propsData));
  }, []);

  useEffect(() => {
    if (config) {
      dispatch(addColumns({ columns: config.columns, type: 'active' }));
    }
  }, [config]);

  useEffect(() => {
    if (data) {
      const dataFields = Object.keys(data[0]);
      const columns = dataFields.map((dataField) => ({
        dataField,
      }))
        .filter((column) => { // remove active columns from config
          if (config) {
            for (let i = 0; i < config.columns.length; i += 1) {
              const configColumn = config.columns[i];
              if (configColumn.dataField === column.dataField) {
                return false;
              }
            }
          }
          return true;
        });
      dispatch(addColumns({ columns, type: 'disable' }));
    }
  }, [data]);

  return (
    <div className={s.wrapper}>
      <DataGrid
        id="reportView"
        keyExpr="ID"
        dataSource={(activeColumns && activeColumns.length !== 0) ? data : undefined}
        style={{ height: '440px', overflowX: 'scroll' }}
        allowColumnReordering
        allowColumnResizing
        columnAutoWidth
        showBorders
      >
        {(activeColumns && activeColumns.length !== 0) ? activeColumns.map((column) => (
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
