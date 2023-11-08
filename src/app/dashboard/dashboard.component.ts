import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../SERVICES/Student.service'
import { StudentData } from '../SERVICES/studentData.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { studentHttpService } from '../SERVICES/httpService.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['#', 'RollNo', 'Name', 'Gender', 'Email', 'Action'];
  studentsList: Student[] = [];
  loadingMode: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  // dataSource: Student[] = [];
  constructor(private StudentData: StudentData, private router: Router, private http: studentHttpService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  private fetchStudentData() {
    this.loadingMode = true;
    this.http.fetchStudent().subscribe((studentList) => {
      this.studentsList = studentList;
      this.loadingMode = false;
    });
  }

  routeAddStudent() {
    this.router.navigateByUrl('/addStudent');
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onDelete(id: string = '') {
    this.http.deleteStudent(id);
    setTimeout(() => this.fetchStudentData(), 1000);
  }

}
