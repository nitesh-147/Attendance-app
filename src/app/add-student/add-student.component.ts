import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms'
import { Student } from '../SERVICES/Student.service'
import { studentHttpService } from '../SERVICES/httpService.service'
import Swal from 'sweetalert';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  studentData: FormGroup;
  constructor(private studentHttpService: studentHttpService) {
    this.studentData = new FormGroup(
      {
        'rollNo': new FormControl(''),
        'name': new FormControl(''),
        'gender': new FormControl(''),
        'email': new FormControl('')
      }
    );
  }
  onSubmit() {
    this.studentHttpService.addStudent({...this.studentData.value,attendanceData:[]},'students');
    Swal('Success!','Student has been added successfully!','success');
  }
}
