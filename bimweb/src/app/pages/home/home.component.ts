import { Component, OnInit,OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';


@Component({ //装饰器 用来往类，函数里注入额外的信息（元数据）
  selector: 'app-home', // css3选择器 匹配模板上的DOM元素 
  templateUrl: './home.component.html', //模板 html 页面
  styleUrls: ['./home.component.scss'] // 样式
})
export class HomeComponent implements OnInit, OnDestroy { // TS/ES6 类
  pageTitle = '我是一个标题'; // 标题变量

  eventListSub: Subscription;
  eventList: EventModel[];
  filteredEvents: EventModel[];
  loading: boolean;
  error: boolean;
  query: '';

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService
  ) { }
 

  ngOnInit() {
    this.title.setTitle(this.pageTitle); // 用Title的类的方法将pageTitle赋值给页面title
    this._getEventList();
    
  }

  private _getEventList(){
    this.loading = true;

    this.eventListSub = this.api
      .getEvents$()
      .subscribe(
        res =>{
          this.eventList = res;
          this.loading = false;
          console.log("get events")
          console.log(res)
          this.searchEvents();
        }
      ,
        err=>{
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      )
  }

  // _id哪里来？
  searchEvents(){
    this.filteredEvents = this.fs.search(this.eventList,this.query,'_id','mediumDate')
    console.log("search")
    console.log(this.filteredEvents)
  }


  resetQuery(){
    this.query ='';
    this.filteredEvents = this.eventList;
  }

  ngOnDestroy(){
    this.eventListSub.unsubscribe();
  }
}
