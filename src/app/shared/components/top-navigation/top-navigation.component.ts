import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'admin-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {

  navigationItems: any[] = [];
  brandNameText: string = "ChotaPaisa.com";
  imageLogoPath: string = "/assets/logo/logo.jpeg";
  isTextLogo: boolean = true;
  isImageLogo: boolean = true;
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getNavbarContents();
  }

  getNavbarContents() {
    this.navigationItems.push(
      // {
      //   icon: 'search',
      // },
      // {
      //   icon: 'g_translate',
      // },
      // {
      //   name: 'Notification',
      //   icon: 'notifications',
      // },
      // {
      //   name: 'Account',
      //   icon: 'account_circle',
      // },
      {
        name: 'Logout',
        icon: 'power_settings_new'
      }
    );
  }

  action(selectedAction: string){
    if(selectedAction === 'Logout'){
      this.onLogout();
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
