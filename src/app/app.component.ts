import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { ColorPickerService } from './color-picker.service';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'material-theme';
  themeClass;
  constructor(private colorPicker:ColorPickerService){
    this.themeClass= this.colorPicker.getColorClass()
  }



  ngOnInit():void{

  }
}
