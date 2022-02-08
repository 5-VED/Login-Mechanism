import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Employee } from '../models/employee.model';


class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered?: number = 0;
  recordsTotal: number = 0;
}

@Component({
  selector: 'app-server-pagination',
  templateUrl: './server-pagination.component.html',
  styleUrls: ['./server-pagination.component.css'],
})

export class ServerPaginationComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  employeeData: Employee[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      lengthMenu: [2, 5, 10],
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .get<DataTablesResponse>(
            'http://localhost:3000/getAllEmps',
            dataTablesParameters
          )
          .subscribe((resp: any) => {
            that.employeeData = resp.response.data[0];
            //console.log(dataTablesParameters)

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },

      // columns: [
      //   { data: 'id' },
      //   { data: 'firstname' },
      //   { data: 'lastname' },
      //   { data: 'gender' },
      //   { data: 'email' },
      //   { data: 'DateOfBirth' },
      //   { data: 'DateOfJoin' },8
      //   { data: 'Designation' },
      // ],
    };
  }
}
