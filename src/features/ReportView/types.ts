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

export type EmployeeName = 'ID' | 'FirstName' |
  'LastName' | 'Position' |
  'BirthDate' | 'HireDate' |
  'Title' | 'Address' |
  'City' | 'State' |
  'Zipcode' | 'Email' |
  'Skype' | 'HomePhone' |
  'DepartmentID' | 'MobilePhone';
