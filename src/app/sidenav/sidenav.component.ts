import { Component, OnInit, Inject } from '@angular/core';
//import { ColorPickerService } from '../color-picker.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    //private colorPicker: ColorPickerService
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }
  
  /*pickColor(color:string) {
    let colorTheme=''
    if(color !== ''){
      colorTheme = color
    }
    this.colorPicker.setColorClass(`${colorTheme}-theme`)
  }*/

  loadStyle(styleName: string){
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'apply-theme-here'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = styleName 
    } else {
      const style = this.document.createElement('link');
      style.id = 'apply-theme-here';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style)
    }
  }
}
