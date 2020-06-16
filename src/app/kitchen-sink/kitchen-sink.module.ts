import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenSinkRoutingModule } from './kitchen-sink-routing.module';
import { MaterialModule } from '../material/material.module';
import { KitchenSinkComponent } from './kitchen-sink.component';


@NgModule({
  declarations: [KitchenSinkComponent],
  imports: [
    CommonModule,
    KitchenSinkRoutingModule,
    MaterialModule
  ]
})
export class KitchenSinkModule { }
