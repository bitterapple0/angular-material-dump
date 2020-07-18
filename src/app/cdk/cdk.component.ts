import { Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-cdk',
  templateUrl: './cdk.component.html',
  styleUrls: ['./cdk.component.scss'],
})
export class CdkComponent implements OnInit{

  items: string[] = Array(1000).fill(1).map( (_, i) => `Item #${i}` );  
  constructor(){};
  ngOnInit(): void {};


}
