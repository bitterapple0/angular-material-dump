import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualscrollComponent } from './components/virtualscroll/virtualscroll.component';
import { MaterialModule } from '../material/material.module';
import { OnboardingComponent } from './components/onboarding/onboarding.component';



@NgModule({
  declarations: [VirtualscrollComponent, OnboardingComponent],
  entryComponents:[OnboardingComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[VirtualscrollComponent, OnboardingComponent],
})
export class SharedModule { }
