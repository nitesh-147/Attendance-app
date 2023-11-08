interface attendanceData{
    id?:string;
    rollNo:string;
    name:string;
    attendanceRecord:record[];
}

interface record{
    date:Date;
    status:string;
}