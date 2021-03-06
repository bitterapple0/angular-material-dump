import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KitchenSinkComponent } from './kitchen-sink.component';


const routes: Routes = [
  {
    path:'',
    component: KitchenSinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenSinkRoutingModule { }
