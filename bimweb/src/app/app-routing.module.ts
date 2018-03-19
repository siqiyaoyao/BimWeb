import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { EventComponent } from './pages/event/event.component';
import { ViewpageComponent } from './viewpage/viewpage.component';
import { ViewsubmitComponent } from './viewsubmit/viewsubmit.component';


const routes: Routes = [ 
  //将路径指向制定组件
  {
    path:'',
    component:HomeComponent
  },{
    path:'callback',
    component:CallbackComponent
  },
  {
    path:'view',
    component:ViewpageComponent
  },
  {
    path:'submit',
    component:ViewsubmitComponent
  },
  {//admin页面
    path: 'admin',
    canActivate: [
      AuthGuard,//该页面包括子页面都被authguard所保护
      AdminGuard
    ],
    children: [
      {
        path: '',
        component: AdminComponent
      }
    ]
  },
  {
    path:'event/:id',
    component:EventComponent,
    canActivate: [
      AuthGuard,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard
  ],
})
export class AppRoutingModule { }
