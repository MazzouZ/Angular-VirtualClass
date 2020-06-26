import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {installTempPackage} from '@angular/cli/tasks/install-package';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/organisations', title: 'Organisation',  icon: 'account_balance', class: '' },
    { path: '/users', title: 'Utilisateurs',  icon:'person', class: '' },
    { path: '/cours', title: 'Cours',  icon:'book', class: '' },
    { path: '/post', title: 'Post',  icon:'storage', class: '' },
    { path: '/devoir', title: 'Devoir',  icon:'assignment', class: '' }
    /*{ path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    //-----------------------------------
    let menuTitles=ROUTES.map(value => {
        return value.title;
    });
    let dashboardIndex=menuTitles.indexOf("Dashboard");
    let OrgIndex=menuTitles.indexOf("Organisation");
    let userIndex=menuTitles.indexOf("Utilisateurs");
    let coursIndex=menuTitles.indexOf("Cours");
    let postIndex=menuTitles.indexOf("Post");

    if (this.authService.isAdminOrganisation()){
        {
            this.menuItems.splice(coursIndex, 1);
            menuTitles.splice(coursIndex, 1);
            postIndex = menuTitles.indexOf('Post');
        }
        this.menuItems.splice(postIndex,1);
    }
    if (this.authService.isProfessor() || this.authService.isStudent()){
        {
            this.menuItems.splice(dashboardIndex, 1);
            menuTitles.splice(dashboardIndex, 1);
            userIndex = menuTitles.indexOf('Utilisateurs');
        }
        {
            this.menuItems.splice(userIndex, 1);
            menuTitles.splice(userIndex, 1);
            OrgIndex = menuTitles.indexOf('Organisation');
        }
        this.menuItems.splice(OrgIndex,1);
    }

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
