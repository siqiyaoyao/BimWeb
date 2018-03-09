import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() navToggledtest = new EventEmitter(); // 监听事件 并传递给父组件
  navOpen = false;

  constructor(
    private router: Router,
    public auth: AuthService,// 该属性会应用在整个框架中，所以用public
  ) { }

  ngOnInit() {
    this.router.events
        .filter(event => event instanceof NavigationStart && this.navOpen)
        .subscribe(event => this.toggleNav());// close panel when arrive a new router
  }
  // click event
  toggleNav(){
    this.navOpen = !this.navOpen;
    this.navToggledtest.emit(this.navOpen);
  }
}

