import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { EmployeeServiceService } from '../Services/employee-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //initializing LoginForm
  loginFrom: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  //By Defaulat submitted is false
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private emplpyeeService: EmployeeServiceService
  ) {}

  //Initializing Validators
  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email: ['Sincere@april.biz', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
    });
  }

  //Getter to get the data for validation
  get f(): { [key: string]: AbstractControl } {
    return this.loginFrom.controls;
  }

  //On Submit Function
  onSubmit(): void {
    this.submitted = true;
    if (this.loginFrom.invalid) return;
    this.emplpyeeService.login(this.loginFrom.value).subscribe(
      (res) => {
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/homepage']);
        console.log(res);
        debugger;
      },
      (err) => {
        console.log(err);
        debugger;
      }
    );
  }

  // Sign up Button
  onSignUp(): void {
    this.submitted = true;
    this.loginFrom.reset();
  }
}
