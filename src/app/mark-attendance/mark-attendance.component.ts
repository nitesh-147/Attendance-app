import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Student } from '../SERVICES/Student.service';
import { StudentData } from '../SERVICES/studentData.service';
import { FormGroup, FormControl, Validator } from '@angular/forms'
import { studentHttpService } from '../SERVICES/httpService.service'
@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {
  studentsList: Student[] = [];
  name: string = "";
  rollNo: string = "";
  date: Date = new Date();
  status: string = "";

  constructor(private StudentData: StudentData, private http: studentHttpService) {

  }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  private fetchStudentData() {
    this.http.fetchStudent().subscribe((studentList) => {
      this.studentsList = studentList;
    });
  }

  onChangeRollNo(): void {
    this.studentsList.forEach(element => {
      if (element.rollNo == this.rollNo) this.name = element.name;
    });
  }

  onSubmit() {
    const currentStudent = this.studentsList.find((obj) => obj.rollNo == this.rollNo);
    const attendanceData = currentStudent?.attendanceData ? currentStudent.attendanceData : [];
    attendanceData.push({ date: this.date, status: this.status });
    let id=currentStudent?.id? currentStudent.id:'';
    this.http.updateStudent(id,{...currentStudent,attendanceData});
  }
}
