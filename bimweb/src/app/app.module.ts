import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ElementRef} from '@angular/core';
import { DatePipe ,CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './core/loading.component';

import { AuthService } from './auth/auth.service';
import { ApiService } from './core/api.service';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';

import { CallbackComponent } from './pages/callback/callback.component'

import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { EventComponent } from './pages/event/event.component';
import { EventDetailComponent } from './pages/event/event-detail/event-detail.component';
import { RsvpComponent } from './pages/event/rsvp/rsvp.component';
import { ViewpageComponent } from './viewpage/viewpage.component';
import { ViewsubmitComponent } from './viewsubmit/viewsubmit.component';
import {FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    AdminComponent,
    EventComponent,
    EventDetailComponent,
    RsvpComponent,
    ViewpageComponent,
    ViewsubmitComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    
  ],
  providers: [
    Title,
    AuthService,
    ApiService,
    DatePipe,
    UtilsService,
    FilterSortService,
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
