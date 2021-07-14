import { ReportConfig } from './features/ReportView/types';

const config: ReportConfig = {
  columns: [
    {
      dataField: 'FirstName',
    },
    {
      dataField: 'LastName',
    },
    {
      dataField: 'Position',
    },
    {
      dataField: 'BirthDate',
      dataType: 'date',
    },
  ],
};

export default config;
