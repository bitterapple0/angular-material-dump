import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SidenavComponent } from './sidenav.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { 
  constructor() {}
}

