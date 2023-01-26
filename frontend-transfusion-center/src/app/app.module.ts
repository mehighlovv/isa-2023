import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TransfusionCenterProfileComponent } from './components/transfusion-center-profile/transfusion-center-profile.component';
import { TransfusionCenterListComponent } from './components/transfusion-center-list/transfusion-center-list.component';
import { QuestionairePageComponent } from './components/questionaire-page/questionaire-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TermListComponent } from './components/term-list/term-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserTermHistoryComponent } from './components/user-term-history/user-term-history.component';
import { UserFutureTermsComponent } from './components/user-future-terms/user-future-terms.component';
import { UserTermsQRCodesComponent } from './components/user-terms-qrcodes/user-terms-qrcodes.component';
import { UserComplaintPageComponent } from './components/user-complaint-page/user-complaint-page.component';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    UserProfileComponent,
    TransfusionCenterProfileComponent,
    TransfusionCenterListComponent,
    QuestionairePageComponent,
    NavbarComponent,
    TermListComponent,
    RegisterComponent,
    UserTermHistoryComponent,
    UserFutureTermsComponent,
    UserTermsQRCodesComponent,
    UserComplaintPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
