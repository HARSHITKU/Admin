import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ApplicationSettingsComponent } from './application-settings.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SupportComponent } from './support/support.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-setup',
    pathMatch: 'full',
  },
  {
    path: 'all-setup',
    component: ApplicationSettingsComponent,
    children: [
      { path: 'video', component: VideoComponent },
      { path: 'about', component: AboutComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'support', component: SupportComponent },
      { path: 'terms-and-conditions', component: TermsConditionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationSettingsRoutingModule {}
