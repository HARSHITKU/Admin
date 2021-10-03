import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationItems } from '../../models/navigationItems';

@Component({
  selector: 'admin-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  imageLogoPath: string = '/assets/logo/logo.PNG';
  showFiller = false;
  expandSubNavMenu: boolean = false;
  parentMenu: string = '';
  navigationItems: NavigationItems[] = [];
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getNavbarContents();
  }

  getNavbarContents() {
    this.navigationItems.push(
      {
        icon: 'dashboard',
        name: 'Dashboard',
        route: '/chotapaisa/admin/dashboard',
        isSubItemPresent: false,
      },
      // {
      //   icon: 'grid_on',
      //   name: "Products",
      //   route: '/admin/users'
      // },
      // {
      //   icon: 'sell',
      //   name: "Sales"
      // },
      {
        icon: 'people',
        name: 'Users',
        route: '/chotapaisa/admin/users',
        isSubItemPresent: true,
        submenu: [
          {
            icon: 'person_add_alt',
            name: 'Add User',
            route: '/chotapaisa/admin/users/new-user',
          },
          // {
          //   icon: 'people',
          //   name: 'Users',
          //   // route: '/admin/users',
          // },
          // {
          //   icon: 'person_add_alt',
          //   name: 'Users',
          //   // route: '/admin/users',
          // },
        ],
      }
      // {
      //   icon: 'people',
      //   name: "Customers"
      // },
      // {
      //   icon: 'search',
      //   name: "Coupons"
      // },
      // {
      //   icon: 'payment',
      //   name: "Withdrawal"
      // },
      // {
      //   icon: 'multiline_chart',
      //   name: "Analytics"
      // },
      // {
      //   icon: 'paid',
      //   name: "Refund"
      // },
      // {
      //   icon: 'support_agent',
      //   name: "Support"
      // },
      // {
      //   icon: 'reviews',
      //   name: "Reviews"
      // },
      // {
      //   icon: 'security',
      //   name: "Privacy Policy"
      // },
      // {
      //   icon: 'gavel',
      //   name: "Terms & Conditions"
      // },
    );
  }

  expandSubMenu(navItem: any){
    console.log('called')
    this.parentMenu = navItem.name;
    if(navItem.isSubItemPresent){
      // this.expandSubNavMenu = !this.expandSubNavMenu;
      this.expandSubNavMenu = true;
    }
  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
