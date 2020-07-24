import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OverlayService } from '../shared/overlay.service';
@Component({
  selector: 'app-material-ui',
  templateUrl: './material-ui.component.html',
  styleUrls: ['./material-ui.component.scss']
})
export class MaterialUiComponent implements OnInit {
  notification_1:number = 5;
  notification_2:string = "!";
  show_spinner:boolean = false;
  open_side= false;  
  Items: string[]=["item 1", "item 2", "item 3"]
  themeColor: string[]=["primary","accent","warn"]
  loadData(){
    this.show_spinner = true;
    setTimeout(() => {
      this.show_spinner=false;
    },3000)
  }
  log(index){
    console.log(index)
  }
  constructor(private overlay: OverlayService) { }
  startOnboarding(){
    this.overlay.showOverlay(1);
  }
  ngOnInit(): void {
  }

}
