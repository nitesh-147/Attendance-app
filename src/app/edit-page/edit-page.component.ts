import { Component, OnInit } from '@angular/core';
import { studentHttpService } from '../SERVICES/httpService.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../SERVICES/Student.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  rollNo!: string;
  name!: string;
  email!: string;
  gender!: string;
  currentStudent!:Student;

  constructor(private http: studentHttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  private fetchStudentData() {
    this.http.fetchStudent().subscribe((studentList) => {
      let id = this.route.snapshot.paramMap.get('id');
      studentList.forEach((st) => {
        if (st.rollNo == id) {
          this.currentStudent=st;
          this.rollNo = st.rollNo;
          this.name = st.name;
          this.email = st.email;
          this.gender = st.gender;
        }
      })
    });
  }

  onSubmit() {
     this.http.updateStudent(this.currentStudent.id || '',{...this.currentStudent,name:this.name,rollNo:this.rollNo,email:this.email,gender:this.gender})
  }
}
