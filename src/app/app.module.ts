import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './../_helpers/auth.interceptor';
import { AuthService } from './_services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'sign-in', component: SignInComponent},
      {path: 'dashboard', component: DashboardComponent}
    ]),
    NgbModule
  ],
  providers: [authInterceptorProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
