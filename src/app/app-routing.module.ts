import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialUiComponent } from './material-ui/material-ui.component';
import { CdkComponent } from './cdk/cdk.component';
import { MaterialUiModule } from './material-ui/material-ui.module';


const routes: Routes = [
  {
    path:"material-ui", 
    loadChildren: () => import('./material-ui/material-ui.module').then(mod => mod.MaterialUiModule)
  },
  
  {
    path:"cdk", 
    loadChildren:()=> import('./cdk/cdk.module').then(mod=>mod.CdkModule)
  },

  {
    path:"kitchen-sink", 
    loadChildren:()=> import('./kitchen-sink/kitchen-sink.module').then(mod=>mod.KitchenSinkModule)
  },

  {
    path:'', 
    redirectTo:"/kitchen-sink", 
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerComponents = [MaterialUiComponent, CdkComponent]