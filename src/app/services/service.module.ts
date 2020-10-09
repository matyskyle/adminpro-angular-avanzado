import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  } from './settings/settings.service';
import {  } from './shared/shared.service';
import {  } from './shared/sidebar.service';

import {
  SettingsService,
  SharedService,
  SidebarService
} from './service.index';

@NgModule({
  declarations: [],
  providers:[
    SettingsService,
    SharedService,
    SidebarService,
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }
