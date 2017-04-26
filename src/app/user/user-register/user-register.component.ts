import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import {
  MzInputDirective,
  MzInputContainerComponent
} from 'ng2-materialize';

import { SpinnerService } from '../../core/spinner/spinner.service';
import { UserService } from './../../core/user.service';

@Component({
  selector: 'mbx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
    private userService: UserService,
  ) {
    this.createForm();
  }

  ngOnInit() { }

  addUser() {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.spinnerService.toggleLoadingIndicator(true);

      let values = this.registerForm.value;

      this.userService.add(values.email, values.name).subscribe(
        response => {
          this.spinnerService.toggleLoadingIndicator(false);
          console.log(response);
          if (response.HasError) {
            this.errorMessage = response.ErrorMessage;
          } else {
            this.router.navigate(['quase-la']);
          }
        },
        error => {
          this.spinnerService.toggleLoadingIndicator(false);
          console.log(error)
        }
      );
    }
  }
}
