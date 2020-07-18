import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkRoutingModule } from './cdk-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CdkRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class CdkModule { }
