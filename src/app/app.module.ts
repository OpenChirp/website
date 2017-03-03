import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { MaterialModule, MdInputModule } from '@angular/material';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './404/pagenotfound.component';
import { TreeNodeComponent } from './tree/tree.component';

// Services
import { LocationService } from './resources/location.service';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TreeNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    MdInputModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
