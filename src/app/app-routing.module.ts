import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ChartComponent } from './chart/chart.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addStudent', component: AddStudentComponent },
  { path: 'markAttendance', component: MarkAttendanceComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'view/:id', component: ViewPageComponent },
  { path: 'edit/:id', component: EditPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
