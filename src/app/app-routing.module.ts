import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialUiComponent } from './material-ui/material-ui.component';
import { CdkComponent } from './cdk/cdk.component';


const routes: Routes = [
  {path:"material-ui", component: MaterialUiComponent},
  {path:"cdk", component:CdkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerComponents = [MaterialUiComponent, CdkComponent]