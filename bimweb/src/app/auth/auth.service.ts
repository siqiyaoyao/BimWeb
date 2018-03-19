import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE,
    
  });
  
  userProfile: any;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  isAdmin: boolean; // 储存用户的admin状态
 

  

  constructor(private router: Router) {
    // If authenticated, set local profile property
    // and update login status subject.
    // If not authenticated but there are still items
    // in localStorage, log out.
    const lsProfile = localStorage.getItem('profile');

    if (this.tokenValid) {// 如果用户被授权，我们在本地储存的信息中找isAdmin的关键字，
      this.userProfile = JSON.parse(localStorage.getItem('profile'));//将数据转换为js对象
      this.isAdmin = localStorage.getItem('isAdmin') === 'true'; //转换string 为boolean
      this.setLoggedIn(true);
    }

  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(redirect?:string) {
    /*
    确认redirect属性，如果没有，用户是从网址进来而不是从guard进来
    这种情况我们会把当前的URL保存到——redirect到本地，当用户的登陆后会重新返回该页面
    */
    // Set redirect after login
    const _redirect = redirect ? redirect : this.router.url; // 进行页面跳转判断
    localStorage.setItem('authRedirect', _redirect);//将当前页面保存到本地
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {//登录失败后的行为
        this._clearRedirect();//情况本地储存的当前页面地址
        this.router.navigate(['/']);//回到主页
        console.error(`Error authenticating: ${err.error}`);
      }
     // this.router.navigate(['/']); //无法通过路径访问其他页面
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        //..
        this.router.navigate([localStorage.getItem('authRedirect') || '/']);
        this._clearRedirect();
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
      this._redirect();
      this._clearRedirect();
    });
  }
  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    
    const fullRedirect = decodeURI(localStorage.getItem('authRedirect'));
    const redirectArr = fullRedirect.split('?tab=');
    const navArr = [redirectArr[0] || '/'];
    const tabObj = redirectArr[1] ? { queryParams: { tab: redirectArr[1] }} : null;

    if (!tabObj) {
      this.router.navigate(navArr);
    } else {
      this.router.navigate(navArr, tabObj);
    }
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    // Set tokens and expiration in localStorage and props
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
    // Update login status in loggedIn$ stream
    this.isAdmin = this._checkAdmin(profile);
    localStorage.setItem('isAdmin',this.isAdmin.toString());
    this.setLoggedIn(true);
  }

  // 确认用户的权限信息
  private _checkAdmin(profile){
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf('admin') > -1;
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem('authRedirect');
  }



  logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    localStorage.removeItem('isAdmin');
    this._clearRedirect();
    // Reset local properties, update loggedIn$ stream
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.setLoggedIn(false);
    // Return to homepage
    this.router.navigate(['/']);
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }



}