import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

  //Array of incomming data
  employeeData: Employee[] = [];

  closeResult: string = '';
  employeeModalObj: Employee = new Employee();
  modal: any = true;

  constructor(
    private router: Router,
    private employeeService: EmployeeServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.reloadEmployee();
  }

  //Logic to close Employee Modal on delete button
  public handleRegisterClickEvent(e: boolean): any {
    if (e) {
      this.modalService.dismissAll();
      this.reloadEmployee();
    }
  }

  //Method to reload employee page
  reloadEmployee(): any {
    this.employeeService.getAllUsers(1).subscribe(
      (res) => {
        let response = res.response.data;
        //console.log(response);
        this.employeeData = response;
        //debugger;
      },
      (err) => {
        console.log(err);
        debugger;
      }
    );
  }

  //Method to add new Employee
  newEmployee(): any {
    this.router.navigate(['signup']);
  }

  //Method to open Employee Modal
  openEmployeeModal(cnt: any): void {
    this.modal = true;
    this.modalService.open(cnt).result.then(
      (result: any) => {
        console.log(result);
        this.closeResult = `Closed with: ${result}`;
        if (result === 'Yes') {
          this.newEmployee();
        }
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(reason);
        debugger;
      }
    );
  }

  //Method to delete Employee
  deleteEmployee(id: string): any {
    this.employeeService.delete(id).subscribe(
      (res) => {
        console.log('Done');
        console.log(res);
        this.reloadEmployee();
        //debugger;
      },
      (err) => {
        console.log(err);
        debugger;
      }
    );
  }

  //Method to update Employee
  updateEmployeeModal(ct: any, data: any) {
    this.modal = false;
    this.modalService.open(ct);
    this.employeeModalObj = data;
  }

  //Method to open delete Employee Modal
  open(content: any, id: any): void {
    this.modalService.open(content, id).result.then(
      (result: any) => {
        console.log(result);
        this.closeResult = `Closed with: ${result}`;
        if (result === 'Yes') {
          this.deleteEmployee(id);
          //debugger
        }
      },
      (reason: any) => {
        console.log(reason);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        debugger;
      }
    );
  }

  //Method for reasons of modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      //console.log('Esc pressend');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      //console.log('Backdrop pressend');
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
