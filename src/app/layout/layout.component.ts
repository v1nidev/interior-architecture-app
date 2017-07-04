import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from '../core/auth.service';
import { LayoutContentService, Tab } from './shared/layout-content.service';
import { LayoutHeaderService } from './shared/layout-header.service';
import { LayoutSidebarService } from './shared/layout-sidebar.service';
import { ProfessionalService } from '../core/professional.service';

@Component({
  selector: 'abx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  overflowY: string = 'auto';
  userName: string;
  showHeader: boolean = true;
  showSidebar: boolean = true;
  showLoadingToast: boolean = false;
  tabs: Tab[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private profService: ProfessionalService,
    private layoutContentService: LayoutContentService,
    private headerService: LayoutHeaderService,
    private sidebarService: LayoutSidebarService,
    private router: Router
  ) {
    console.log('layout ctor');
    
    this.tabs = [
      {
        title: 'Proposta',
        selectors: '.project-proposal'
      },
      {
        title: 'Versões',
        selectors: '.project-versions'
      },
      {
        title: 'Especificação de produto',
        selectors: 'project-budgets'
      }
    ]
    this.activeRoute.data
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: { tabs: Tab[] }) => {
        if (data.tabs) {
          console.log(data.tabs);

          // this.tabs = data.tabs;
        }
      })

    this.router.events
      .filter(event => event instanceof NavigationStart)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(event => {
        this.showHeader = true;
        this.showSidebar = true;
        this.overflowY = 'auto';
      });

    this.headerService.headerHidden$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => this.showHeader = false);

    this.sidebarService.sidebarHidden$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => this.showSidebar = false);

    this.layoutContentService.overflowYDefined$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((val) => this.overflowY = val);
  }

  getRouteTabs(route: ActivatedRoute) {
    const routeDataLabel: string = 'tabs';
    console.log(route.snapshot.data[routeDataLabel]);

    if (!route.snapshot.data.hasOwnProperty(routeDataLabel)) {
      return route.snapshot.data[routeDataLabel];
    }
  }

  ngOnInit() {
    this.userName = this.authService.getCurrentUser().name;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/entrar']);
    window.location.reload();
  }

  toggleLoadingToast(isVisible: boolean): void {
    $('.abxLoadingToast').fadeOut(400);

    if (isVisible !== undefined) {
      this.showLoadingToast = isVisible;
    } else {
      this.showLoadingToast = !this.showLoadingToast;
    }

    console.log(this.showLoadingToast);

    if (this.showLoadingToast) {
      if (this.showLoadingToast) {
        let toastHtml = `
          <div style="display: flex;">
            <div class="preloader-wrapper tiny active mv-red-light">
              <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
            <div style="margin-left: 1rem;">Salvando</div>
          </div>
        `;
        let $toast = $(toastHtml);
        Materialize.toast($toast, 9999999, 'abxLoadingToast');

      } else {
      }
    }

  }
}
