import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({ //装饰器 用来往类，函数里注入额外的信息（元数据）
  selector: 'app-home', // css3选择器 匹配模板上的DOM元素 
  templateUrl: './home.component.html', //模板 html 页面
  styleUrls: ['./home.component.scss'] // 样式
})
export class HomeComponent implements OnInit { // TS/ES6 类
  pageTitle = '我是一个标题'; // 标题变量

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle); // 用Title的类的方法将pageTitle赋值给页面title
  }

}
