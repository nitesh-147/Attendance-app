import { Student } from './Student.service'
import { studentHttpService } from './httpService.service'
import { Injectable, OnInit } from '@angular/core'
@Injectable({
    providedIn: "root"
})
export class StudentData {
    studentList: Student[] = [];
    constructor(private studentHttpService: studentHttpService) {
        this.fetchStudentData();
    }

    private fetchStudentData() {
        this.studentHttpService.fetchStudent().subscribe((studentList) => {
            this.studentList = studentList;
        });
    }
}