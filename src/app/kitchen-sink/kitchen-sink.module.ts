import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenSinkRoutingModule } from './kitchen-sink-routing.module';
import { MaterialModule } from '../material/material.module';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomSnackComponent} from '../custom-snack/custom-snack.component'
@NgModule({
  declarations: [KitchenSinkComponent,CustomSnackComponent],
  entryComponents:[CustomSnackComponent],
  imports: [
    CommonModule,
    KitchenSinkRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KitchenSinkModule { }
