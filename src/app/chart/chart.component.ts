import { Component, OnInit } from '@angular/core';
import { Student } from '../SERVICES/Student.service';
import { studentHttpService } from '../SERVICES/httpService.service';
import { Chart , registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chart!:Chart;
  studentList: Student[] = [];
  constructor(private http: studentHttpService) { }
  ngOnInit(): void {
    this.fetchdata();
  }
  private fetchdata() {
    this.http.fetchStudent().subscribe(res => {
      const presentCount = new Map();
      const labels = [];
      const data = [];
      res.forEach((student) => {
        student.attendanceData?.forEach(({ date, status }) => {
          if (status == 'Present') {
            if (presentCount.get(date)) {
              presentCount.set(date, presentCount.get(date) + 1);
            } else {
              presentCount.set(date, 1);
            }
          }
          else if (!presentCount.get(date)) {
            presentCount.set(date, 0);
          }
        });

      });
      for (let [key, value] of presentCount) {
        labels.push(key.substring(0,10));
        data.push(value);
      }
      this.createChart(labels, data);
    });
  }

  createChart(labels: Date[], data: number[]) {
    // console.log(typeof labels[0]);
     const config={
      type:'bar' as const,
      data:{
        labels:labels,
        datasets:[{
          label:'No. of student present',
          data:data,
          backgroundColor:[
            'red',
            'blue',
            'lightseagreen',
            'purple'
          ],
          borderColor:[
            'pink',
            'yellow',
            'orange',
            'blue'
          ],
          borderWidth:1
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true
          }
        }
      },
     };
     this.chart=new Chart('myChart',config);
  }
}
