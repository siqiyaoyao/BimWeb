import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilsService {

  constructor(private dataPipe:DatePipe) { }

  // 加载完成
  isLoaded(loading:boolean):boolean{
    return loading === false;
  }

  //转换日期显示格式
  eventDates(start,end):string{

    const startDate = this.dataPipe.transform(start,'mediumDate'); // 用dataPipe进行转换
    const endDate = this.dataPipe.transform(end, 'mediumDate');

    if(startDate === endDate){
      return startDate; // 如果是一天的事件，则返回开始日期
    }else{
      return `${startDate} - ${endDate}` //如果是持续的时间段，怎么返回时间段
    }

  }

  eventDatesTimes(start,end):string{
    const _shortDate = 'M/d/yyyy';
    const startDate = this.dataPipe.transform(start,_shortDate);
    const startTime = this.dataPipe.transform(start,'shorttime');
    const endDate = this.dataPipe.transform(end,_shortDate);
    const endTime = this.dataPipe.transform(end,'shorttime');

    if(startDate === endDate){
      return `${startDate}, ${startTime} - ${endTime}`;
    }else{
      return `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
    }

  }

  //判断时间是否已经过期
  eventPast(eventEnd):boolean{
    const now = new Date();
    const then = new Date(eventEnd.toString());
    return now >= then;
  }

}
