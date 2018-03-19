import { Component, OnInit } from '@angular/core';
import {FileUploader, FileSelectDirective, FileDropDirective, } from 'ng2-file-upload';
import { CommonModule }     from '@angular/common';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-viewsubmit',
  templateUrl: './viewsubmit.component.html',
  styleUrls: ['./viewsubmit.component.scss']
})
export class ViewsubmitComponent  {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
