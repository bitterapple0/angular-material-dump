import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from '../color-picker.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private colorPicker: ColorPickerService) { }

  ngOnInit(): void {
  }
  
  pickColor(color:string) {
    let colorTheme=''
    if(color !== ''){
      colorTheme = color
    }
    this.colorPicker.setColorClass(`${colorTheme}-theme`)
  }
}
