import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-ui',
  templateUrl: './material-ui.component.html',
  styleUrls: ['./material-ui.component.scss']
})
export class MaterialUiComponent implements OnInit {
  notification_1:number = 5;
  notification_2:string = "!";
  show_spinner:boolean = false
  
  loadData(){
    this.show_spinner = true;
    setTimeout(() => {
      this.show_spinner=false;
    },30000)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
