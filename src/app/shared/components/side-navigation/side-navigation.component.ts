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
      this.userImage = this.userDetails.profileImage !== (undefined || null)? this.userDetails.profileImage : "https://www.w3schools.com/howto/img_avatar.png";
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
        icon: 'local_mall',
        name: 'Product',
        route: '/chotapaisa/admin/redeem/all-redeems',
      },
      {
        icon: 'receipt_long',
        name: 'Orders',
        route: '/chotapaisa/admin/orders/all-orders',
      },
      {
        icon: 'category',
        name: 'Categories',
        route: '/chotapaisa/admin/categories/all-categories',
      },
      {
        icon: 'groups',
        name: 'Sponsors',
        route: '/chotapaisa/admin/sponsors/all-sponsors',
      },

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
            route: '/chotapaisa/admin/application-setup/all-setup/quotation',
          },
          // {
          //   icon: 'play_circle_filled',
          //   name: 'Video Setup',
          //   route: '/chotapaisa/admin/application-setup/all-setup/video',
          // },
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
    );
  }

  expandSubMenu(navItem: any) {
    this.parentMenu = navItem.name;
    if (navItem.isSubItemPresent) {
      this.expandSubNavMenu = true;
    }
  }
}
