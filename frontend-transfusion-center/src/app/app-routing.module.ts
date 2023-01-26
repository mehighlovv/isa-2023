import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionairePageComponent } from './components/questionaire-page/questionaire-page.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComplaintPageComponent } from './components/user-complaint-page/user-complaint-page.component';
import { UserFutureTermsComponent } from './components/user-future-terms/user-future-terms.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserTermHistoryComponent } from './components/user-term-history/user-term-history.component';
import { UserTermsQRCodesComponent } from './components/user-terms-qrcodes/user-terms-qrcodes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'history', component: UserTermHistoryComponent },
  { path: 'reservations', component: UserFutureTermsComponent },
  { path: 'confirmations', component: UserTermsQRCodesComponent },
  { path: 'questionaire', component: QuestionairePageComponent },
  { path: 'complaints', component: UserComplaintPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
