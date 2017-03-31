import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ReflectiveInjector,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Event,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { UserService } from '../core/user/shared/user.service';

import { professionalPartners, currentProfessional } from './professional/shared/mock-professional';

@Component({
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
})
export class InternalComponent implements OnInit {

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private userService: UserService
    ) {
  }

  ngOnInit(): void {
    this.userService.setCurrentUser(currentProfessional);
  }

  ngOnDestroy(): void {
  }

}
