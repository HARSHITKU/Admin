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
import { NewPrivacyPolicyComponent } from './privacy-policy/new-privacy-policy/new-privacy-policy.component';
import { ViewPrivacyPolicyComponent } from './privacy-policy/view-privacy-policy/view-privacy-policy.component';
import { DeletePrivacyPolicyComponent } from './privacy-policy/delete-privacy-policy/delete-privacy-policy.component';
import { NewQuotationComponent } from './quotation/new-quotation/new-quotation.component';
import { ViewQuotationComponent } from './quotation/view-quotation/view-quotation.component';
import { DeleteQuotationComponent } from './quotation/delete-quotation/delete-quotation.component';
import { QuotationComponent } from './quotation/quotation.component';
import { NewTermsConditionsComponent } from './terms-conditions/new-terms-conditions/new-terms-conditions.component';
import { DeleteTermsConditionsComponent } from './terms-conditions/delete-terms-conditions/delete-terms-conditions.component';
import { ViewTermsConditionsComponent } from './terms-conditions/view-terms-conditions/view-terms-conditions.component';


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
    ViewSupportComponent,
    NewPrivacyPolicyComponent,
    ViewPrivacyPolicyComponent,
    DeletePrivacyPolicyComponent,
    NewQuotationComponent,
    ViewQuotationComponent,
    DeleteQuotationComponent,
    QuotationComponent,
    NewTermsConditionsComponent,
    DeleteTermsConditionsComponent,
    ViewTermsConditionsComponent
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
