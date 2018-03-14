import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';//权限管理
import { AuthService } from './../auth/auth.service';//认证请求
import { Observable } from 'rxjs/Observable';// 数据流
import { catchError } from 'rxjs/operators';// 操作数据流
import 'rxjs/add/observable/throw';
import { ENV } from './env.config';//获得正确的API URIs
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';
import { error } from 'util';
import { HttpHandler } from '@angular/common/http/src/backend';


@Injectable()
export class ApiService {

  constructor(
    private http:HttpClient, // 可以用http里面的方法
    private auth:AuthService
  ){}

  // 获取储存在token内的验证用户的信息
  private get _authHeader():string{
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  //获取未来公共事件列表 EventModel[] stream
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  //获取所有事件
  getAdminEvents$():Observable<EventModel[]>{
    return this.http
      .get(`${ENV.BASE_API}events/admin`,{ //  在发送头部放入用户信息
        headers:new HttpHeaders().set('Authorization',this._authHeader)
      }
    )
      .pipe(
        catchError((error)=>this._handleError(error))
      );
  }

  // 用id获取事件
  getEventById$(id:string):Observable<EventModel>{
    return this.http
    .get(`${ENV.BASE_API}event/${id}`,{
      headers:new HttpHeaders().set('Authorization', this._authHeader)
    }
  )
    .pipe(
      catchError((error)=>this._handleError(error))
    );
  }
  
  // 用事件id 获得rsvps列表
  getRsvpsByEventId$(eventId:string):Observable<RsvpModel[]>{
    return this.http
    .get(`${ENV.BASE_API}event/${eventId}/rsvps`,{
      headers:new HttpHeaders().set('Authorization',this._authHeader)
    })
    .pipe(
      catchError((error)=>this._handleError(error))
    )
  }


  // API 返回的是JSON，可直接匹配， 当请求失败的时候需要对错误信息进行处理
  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }
}
