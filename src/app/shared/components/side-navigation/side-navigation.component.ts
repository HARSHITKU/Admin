import { Component, OnInit } from '@angular/core';
import { NavigationItems } from '../../models/navigationItems';

@Component({
  selector: 'admin-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  imageLogoPath: string = "/assets/logo/logo.PNG";
  showFiller = false;
  navigationItems: NavigationItems[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getNavbarContents();
  }

  getNavbarContents() {
    this.navigationItems.push(
      {
        icon: 'dashboard',
        name: "Dashboard"
      },
      {
        icon: 'grid_on',
        name: "Products"
      },
      {
        icon: 'sell',
        name: "Sales"
      },
      {
        icon: 'person_add_alt',
        name: "Users"
      },
      {
        icon: 'people',
        name: "Customers"
      },
      {
        icon: 'search',
        name: "Coupons"
      },
      {
        icon: 'payment',
        name: "Withdrawal"
      },
      {
        icon: 'multiline_chart',
        name: "Analytics"
      },
      {
        icon: 'paid',
        name: "Refund"
      },
      {
        icon: 'support_agent',
        name: "Support"
      },
      {
        icon: 'reviews',
        name: "Reviews"
      },
      {
        icon: 'security',
        name: "Privacy Policy"
      },
      {
        icon: 'gavel',
        name: "Terms & Conditions"
      },
    );
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}
