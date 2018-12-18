import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    SideNavListComponent,
    HeaderComponent
    ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    SideNavListComponent, // both need to be exported because we are using its selector in the app component
    HeaderComponent
  ]
})

export class CoreModule { }
