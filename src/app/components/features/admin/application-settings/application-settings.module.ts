import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SupportComponent } from './support/support.component';
import { ApplicationSettingsRoutingModule } from './application-settings-routing.module';
import { ApplicationSettingsComponent } from './application-settings.component';



@NgModule({
  declarations: [
    ApplicationSettingsComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    ApplicationSettingsRoutingModule
  ]
})
export class ApplicationSettingsModule { }
