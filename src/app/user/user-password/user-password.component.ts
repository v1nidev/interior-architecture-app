import { SpinnerService } from './../../core/spinner/spinner.service';
import { ProfessionalService } from './../../core/professional.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { Professional } from '../../core/professional';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'mbx-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  professional: Professional;
  errorMessage: string;
  id: string;
  email: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profService: ProfessionalService,
    private spinnerService: SpinnerService
  ) {
    this.createForm();
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.spinnerService.toggleLoadingIndicator(true);
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.email = params['email'];

      if (this.id && this.email) {
        this.getProfessional(this.id);
      }
    })

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   let id = params['id'];
    //   let email = params['email'];
    //   console.log(id, email);

    // })
  }

  activeProfessional(email) {
    this.profService.activate(email).subscribe(resp => {
      console.log('activate response: ', resp);

      this.spinnerService.toggleLoadingIndicator(false);
    })
  }

  authenticate(prof: Professional) {
    this.profService.professional = prof;
    this.auth.login(prof);

    if (this.professional.profession === undefined) {
      console.log('no profession');

      this.spinnerService.toggleLoadingIndicator(false);
      // this.router.navigate(['/profissao?id=' + this.id + '&email=' + this.email,]);
      console.log(this.id, this.email);
      
      this.router.navigate(['/profissao',]);
    }
  }

  getProfessional(id) {
    this.profService.getOne(id).subscribe(prof => {
      this.activeProfessional(this.email);
      this.professional = prof;
      this.profService.professional = prof;
      console.log(prof);

      // this.auth.setCurrentUser(prof);
    });
  }

  definePassword() {
    this.spinnerService.toggleLoadingIndicator(true);
    console.log(this.passwordForm.value.password);

    this.professional.id = this.id;
    this.professional.password = this.passwordForm.value.password;
    this.professional.profession = 0;
    this.profService.update(this.professional).subscribe(resp => {
      console.log('password resp: ', resp);
      this.professional.profession = undefined;
      this.authenticate(this.professional);
    });
  }


  private createForm() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      showPassword: [false]
      // passwordConfirm: ['', Validators.required]
    });
  }
}