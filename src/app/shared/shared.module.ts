import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualscrollComponent } from './components/virtualscroll/virtualscroll.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [VirtualscrollComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[VirtualscrollComponent],
})
export class SharedModule { }
