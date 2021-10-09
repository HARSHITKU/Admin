import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
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
  userDetails: any;
  user: any;
  userImage: any;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.getNavbarContents();
    this.getUserProfileData();
  }

  getUserProfileData() {
    this.authenticationService.getUserProfile().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.data;
      this.userImage =
        'https://casino-api-088.herokuapp.com/' + this.userDetails.profileImage;
    });
  }

  getNavbarContents() {
    this.navigationItems.push(
      {
        icon: 'dashboard',
        name: 'Dashboard',
        route: '/chotapaisa/admin/dashboard',
        isSubItemPresent: false,
      },
      {
        icon: 'sports_esports',
        name: 'Game Setup',
        route: '/chotapaisa/admin/game-setup/all-games',
      },
      {
        icon: 'people',
        name: 'Users',
        route: '/chotapaisa/admin/users',
      },
      {
        icon: 'volunteer_activism',
        name: 'Charity',
        route: '/chotapaisa/admin/charity/all-charities',
      },
      {
        icon: 'lightbulb',
        name: 'Innovation',
        route: '/chotapaisa/admin/innovation/all-innovations',
      },
      {
        icon: 'redeem',
        name: 'Redeem',
        route: '/chotapaisa/admin/redeem/all-redeems',
      },
      {
        icon: 'groups',
        name: 'Sponsors',
        route: '/chotapaisa/admin/sponsors/all-sponsors',
      },
      // {
      //   icon: 'sell',
      //   name: "Sales"
      // },

      {
        icon: 'settings',
        name: 'App Settings',
        route: '/chotapaisa/admin/application-setup/all-setup/support',
        isSubItemPresent: true,
        submenu: [
          {
            icon: 'support_agent',
            name: 'Enquiry',
            route: '/chotapaisa/admin/application-setup/all-setup/support',
          },
          {
            icon: 'format_quote',
            name: 'Quotation',
            route: '/chotapaisa/admin/application-setup/all-setup/about',
          },
          {
            icon: 'play_circle_filled',
            name: 'Video Setup',
            route: '/chotapaisa/admin/application-setup/all-setup/video',
          },
          {
            icon: 'info',
            name: 'About',
            route: '/chotapaisa/admin/application-setup/all-setup/about',
          },
          {
            icon: 'security',
            name: 'Privacy Policy',
            route:
              '/chotapaisa/admin/application-setup/all-setup/privacy-policy',
          },
          {
            icon: 'gavel',
            name: 'Terms & Conditions',
            route:
              '/chotapaisa/admin/application-setup/all-setup/terms-and-conditions',
          },
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
      //   icon: 'reviews',
      //   name: "Reviews"
      // },
    );
  }

  expandSubMenu(navItem: any) {
    this.parentMenu = navItem.name;
    if (navItem.isSubItemPresent) {
      // this.expandSubNavMenu = !this.expandSubNavMenu;
      this.expandSubNavMenu = true;
    }
  }
}
