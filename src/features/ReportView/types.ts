export interface Employee {
  ID: number,
  FirstName: string,
  LastName: string,
  Position: string,
  BirthDate: string,
  HireDate: string,
  Title: string,
  Address: string,
  City: string,
  State: string,
  Zipcode: number,
  Email: string,
  Skype: string,
  HomePhone: string,
  DepartmentID: number,
  MobilePhone: string,
}

interface Column {
  dataField: string
  caption?: string
  dataType?: string
  format?: string
  alignment?: string
}

export interface ReportConfig {
  columns: Array<Column>
}
