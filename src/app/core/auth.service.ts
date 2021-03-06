import { environment } from './../../environments/environment.stag';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from './user';
import { WindowRef } from './window-ref.service';


@Injectable()
export class AuthService {
  redirectUrl: string;
  window: any;
  private currentUser: User;
  // public token: string;
  // public currentUser: Professional;

  // isLoggedIn: boolean = false;
  // store the URL so we can redirect after logging in

  constructor(
    private winRef: WindowRef
  ) {
    this.window = winRef.getNativeWindow();
  }

  getCurrentUser(): User {
    if (environment.description === 'staging') {
      return {
        id: "59b4b919-4004-4f09-8f23-8f32f13855c7",
        email: "vinicius.rocha@muuving.com.br",
        name: "Vinicius",
        lastname: "Rocha",
      }
    }

    if (!this.currentUser) {
      let userData: any = JSON.parse(localStorage.getItem('currentUser'));

      if (userData) {
        this.currentUser = new User(userData.name, userData.email, userData.id);

        // if ((<any>this.window).Intercom && (<any>this.window).Intercom.booted) {
        //   (<any>this.window).Intercom("update", {
        //     name: this.currentUser.name,
        //     email: this.currentUser.email
        //   });
        // } else {
        //   let intervalId,
        //     that = this;
        //   intervalId = setInterval(function () {

        //     if ((<any>that.window).Intercom && (<any>this.window).Intercom.booted) {
        //       (<any>that.window).Intercom("update", {
        //         name: that.currentUser.name,
        //         email: that.currentUser.email
        //       });

        //       clearInterval(intervalId);
        //     }
        //   }, 2000);
        // }
        return this.currentUser;
      }

      return null;
    } else {
      return this.currentUser;
    }

  }

  setCurrentUser(user: User): void {
    let userData: any = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    this.currentUser = new User(userData.name, userData.email, userData.id);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  login(user: User) {
    this.setCurrentUser(user);
  }

  logout(): void {
    // (<any>this.window).Intercom('shutdown');
    localStorage.removeItem('currentUser');
  }

  // login(email: string, password: string): Observable<boolean> {
  //   let isUser: boolean = email == 'raphael@muuving.com.br' && password == 'casacor';

  //   if (isUser) {
  //     // Returned User if auth ok
  //     this.currentUser = {
  //       id: 'c11752b0-0475-4d31-9c01-223d1a98aa9f',
  //       name: 'Raphael',
  //       email: 'raphael@muuving.com.br'
  //     };

  //     // Two approaches
  //     localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  //     this.isLoggedIn = true;
  //   }

  //   return Observable.of(isUser).delay(1000).do(val => this.isLoggedIn = true);
  // }
}
