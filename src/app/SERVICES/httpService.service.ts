import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Student } from './Student.service';
import { map, Subject, catchError, throwError } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class studentHttpService {

    error = new Subject<string>();

    constructor(private http: HttpClient) { }
    // create product in database
    addStudent(student: Student, table: string) {
        const headers = new HttpHeaders({ 'myHeader': 'nkr147' });
        this.http.post<{ name: string }>('https://attendance--management-sysyem-default-rtdb.firebaseio.com/' + table + '.json', student, { headers: headers }).subscribe((res) => {
            // console.log(res);
        }, (err) => {
            this.error.next(err.message);
        });
    }

    // Fetch product from database
    fetchStudent() {
        return this.http.get<{ [key: string]: Student }>('https://attendance--management-sysyem-default-rtdb.firebaseio.com/students.json').pipe(map((res) => {
            const students = [];
            for (const key in res) {
                if (res.hasOwnProperty(key)) {
                    students.push({ ...res[key], id: key });
                }
            }
            return students;
        }), catchError((err) => {
            return throwError(err);
        }));
    }

    // delete student from database
    deleteStudent(id: string) {
        this.http.delete('https://attendance--management-sysyem-default-rtdb.firebaseio.com/students/' + id + '.json').subscribe();
    }

    updateStudent(id: string, value: any) {
        this.http.put('https://attendance--management-sysyem-default-rtdb.firebaseio.com/students/' + id + '.json', value).subscribe();
    }
}