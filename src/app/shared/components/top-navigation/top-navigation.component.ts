import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {

  navigationItems: any[] = [];
  brandNameText: string = "Admin Panel";
  imageLogoPath: string = "/assets/logo/logo.PNG";
  isTextLogo: boolean = true;
  isImageLogo: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.getNavbarContents();
  }

  getNavbarContents() {
    this.navigationItems.push(
      // {
      //   icon: 'search',
      // },
      {
        icon: 'g_translate',
      },
      {
        icon: 'notifications',
      },
      {
        icon: 'account_circle',
      }
    );
  }
}
