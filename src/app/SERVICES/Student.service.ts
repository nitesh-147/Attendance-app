export interface Student{
    id?:string;
    rollNo:string;
    name:string;
    gender:string;
    email:string;
    attendanceData?:attendanceFormat[];
}

export interface attendanceFormat{
    date:Date;
    status:string;
}