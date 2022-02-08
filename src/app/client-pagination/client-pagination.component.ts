import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-client-pagination',
  templateUrl: './client-pagination.component.html',
  styleUrls: ['./client-pagination.component.css'],
})

export class ClientPaginationComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  employeeData: Employee[] = [];
  desig: any[] = [];
  public rows: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [1, 2, 5, 10, 20],
      processing: true,
      order: [[7, 'asc']],
      rowGroup: {
        dataSrc: 7,
      },
    };
    this.http
      .get<Employee[]>('http://localhost:3000/getAllEmps')
      .subscribe((data: any) => {
        // const desig: any[] = [];

        // data.response.data.forEach((el: any, index: number) => {
        //   desig[index] = el.Designation;
        // });

        //this.desig = [...new Set(desig)];

        //const allData: any = [];

        // this.desig.forEach((desig) => {
        //   allData[desig] = data.response.data.filter(
        //     (el: any) => el.Designation == desig
        //   );
        // });

        // this.desig.forEach((desg) => {
        //   //  this.rows.push(desig)
        //   allData[desg].forEach((el: any) => {
        //     this.employeeData.push(el);
        //   });
        // });

        this.employeeData = data.response.data;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
