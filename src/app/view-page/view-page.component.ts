import { Component, OnInit } from '@angular/core';
import { studentHttpService } from '../SERVICES/httpService.service';
import { ActivatedRoute } from '@angular/router';
import { Student, attendanceFormat } from '../SERVICES/Student.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

  studentData: Student={
    name:'',
    rollNo:"0",
    gender:'Male',
    email:''
  };
  attendance!:attendanceFormat[];

  constructor(private http: studentHttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  private fetchStudentData() {
    this.http.fetchStudent().subscribe((studentList) => {
      let id = this.route.snapshot.paramMap.get('id');
      studentList.forEach((student) => {
        if (student.rollNo == id) {
          this.studentData = student;
          if(student.attendanceData){
            this.attendance=student.attendanceData;
            this.attendance.sort((a,b)=>{
              if(a.date>b.date) return 1;
              else return -1;
            });
            
          }
        }
      })
    });
  }
}
