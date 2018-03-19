import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  pageTitle: string;
  id: string;
  routeSub: Subscription;
  tabSub: Subscription;
  eventSub: Subscription;
  event: EventModel;
  loading: boolean;
  error: boolean;
  tab: string;
  eventPast: boolean;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title
  ) { }

  ngOnInit() {
    // 从路径中提取时间id并订阅该事件
    this.routeSub = this.route.params
    .subscribe(params =>{
      this.id = params['id'];
      this._getEvent();
    });

    //订阅请求params 来监测tab改变
    this.tabSub = this.route.queryParams
    .subscribe(queryParams =>{
      this.tab = queryParams['tab'] ||'details'
    })

  }

  private _getEvent(){
    this.loading = true;
    // 通过id获取事件
    this.eventSub = this.api
    .getEventById$(this.id)
    .subscribe(
      res =>{
        this.event = res;
        this._setPageTitle(this.event.title);
        this.loading = false;
        this.eventPast = this.utils.eventPast(this.event.endDatetime);
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this._setPageTitle('Event Details');
      }
      
    )
  }
  
  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.eventSub.unsubscribe();
  }
}
