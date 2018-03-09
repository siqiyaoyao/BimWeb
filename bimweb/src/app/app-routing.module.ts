import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { CallbackComponent } from './pages/callback/callback.component';

const routes: Routes = [ 
  //将路径指向制定组件
  {
    path:'',
    component:HomeComponent
  },{
    path:'callback',
    component:CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
