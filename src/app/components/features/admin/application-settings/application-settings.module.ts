import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SupportComponent } from './support/support.component';
import { ApplicationSettingsRoutingModule } from './application-settings-routing.module';
import { ApplicationSettingsComponent } from './application-settings.component';
import { NewAboutComponent } from './about/new-about/new-about.component';
import { ViewAboutComponent } from './about/view-about/view-about.component';
import { DeleteAboutComponent } from './about/delete-about/delete-about.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoComponent } from './video/video.component';
import { NewVideoComponent } from './video/new-video/new-video.component';
import { DeleteVideoComponent } from './video/delete-video/delete-video.component';
import { ViewVideoComponent } from './video/view-video/view-video.component';
import { ViewSupportComponent } from './support/view-support/view-support.component';



@NgModule({
  declarations: [
    ApplicationSettingsComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    SupportComponent,
    NewAboutComponent,
    ViewAboutComponent,
    DeleteAboutComponent,
    VideoComponent,
    NewVideoComponent,
    DeleteVideoComponent,
    ViewVideoComponent,
    ViewSupportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationSettingsRoutingModule
  ]
})
export class ApplicationSettingsModule { }
