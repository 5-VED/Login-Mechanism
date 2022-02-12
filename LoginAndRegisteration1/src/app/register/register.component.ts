import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Employee } from '../models/employee.model';
import Validation from './Utils/validation';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //filling data in form
  @Input() employee: Employee = new Employee();

  @Input() modal: boolean = true;

  //Event emmiter to close register popup
  @Output() public closeModal = new EventEmitter<any>();
  title = 'form';
  id: any = null;

  // employee:Employee = new Employee()
  submitted = false;

  //Form Group of Employee
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    designation: new FormControl(''),
    gender: new FormControl(''),
    DateOfBirth: new FormControl(''),
    DateOfJoin: new FormControl(''),
  });

  //Defining gender array for validation
  genderList: any = ['Female', 'Male', 'Other'];

  //Defining designation array for validation.0
  designationList: any = [
    'Jr. developer',
    'Sr. developer',
    'Project Manager',
    'Team Leader',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Calling Form Controls method
    this.formControls();
    this.setFormValues(this.id);
  }

  //Method of Form Controls
  formControls() {
    this.form = this.formBuilder.group(
      {
        firstname: [
          '',
          [
            Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(10),
          ],
        ],
        lastname: [
          '',
          [
            Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        Designation: ['', [Validators.required]],
        DateOfBirth: ['', [Validators.required]],
        DateOfJoin: ['', [Validators.required]],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  //Method to get data from form
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  //On Submit button Logic
  onSubmit(): void {
    console.log('here');
    console.log(JSON.stringify(this.form.value, null, 2));
    if (this.employee._id != null) {
      console.log('here', this.employee._id);
      this.submitted = true;
      if (this.form.invalid) return;
      this.updateEmployee();
    } else {
      this.submitted = true;
      if (this.form.invalid) return;
      console.log('out');
      this.employeeService.create(this.form.value).subscribe(
        (res) => {
          console.log(res);
          this.closeModal.emit(true);
          this.router.navigate(['/homepage']);
        },
        (err) => {
          console.log(err);
          debugger;
        }
      );
    }
  }

  //Reset button Logic
  onReset(): void {
    this.submitted = false;
    this.setFormValues(this.id);
  }

  setFormValues(id: any) {
    id = this.employee._id;
    this.form.controls['firstname'].setValue(this.employee.firstname);
    this.form.controls['lastname'].setValue(this.employee.lastname);
    this.form.controls['email'].setValue(this.employee.email);
    this.form.controls['password'].setValue(this.employee.password);
    this.form.controls['confirmPassword'].setValue(this.employee.confirmPassword);
    this.form.controls['confirmPassword'].validator = null;
    this.form.controls['gender'].setValue(this.employee.gender);
    this.form.controls['Designation'].setValue(this.employee.Designation);
    this.form.controls['DateOfBirth'].setValue(this.employee.DateOfBirth);
    this.form.controls['DateOfJoin'].setValue(this.employee.DateOfJoin);
  }

  updateEmployee() {
    //this.submitted = true
    this.employee.firstname = this.form.value.firstname;
    this.employee.lastname = this.form.value.lastname;
    this.employee.email = this.form.value.email;
    this.employee.gender = this.form.value.gender;
    this.employee.Designation = this.form.value.Designation;
    this.employee.DateOfBirth = this.form.value.DateOfBirth;
    this.employee.DateOfJoin = this.form.value.DateOfJoin;

    this.employeeService
      .updateUser(this.employee._id, this.employee)
      .subscribe((res: any) => {
        console.log(res);
        this.closeModal.emit(true);
        this.router.navigate(['/homepage']);
      });
  }
}
