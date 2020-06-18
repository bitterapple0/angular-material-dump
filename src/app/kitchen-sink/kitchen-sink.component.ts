import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from '../notification/notifications.service';

@Component({
  selector: 'app-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss']
})
export class KitchenSinkComponent implements OnInit {
  selectedValue:string
  options:string[]=['joe','bob','sam']
  optionsObject=[
    {name:'louis'},
    {name:'nathan'},
    {name:'kenn'}
  ]

  display(subject){
    return subject ? subject.name : undefined
  }
  
  constructor(private snackbar:MatSnackBar, public notificationService: NotificationsService) { }
  //Snackbar Stuff
  openSnackBar(message, action,){
    this.snackbar.open(message,action,{duration:2000})
  }


  //filter form stuff
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;                    //Always add to module, u lazyloaded. 
  ngOnInit(): void {
    this.filteredOptions =this.myControl.valueChanges.pipe( //When input value changes
      startWith(''),                                        //Code here is called
      map(value => this._filter(value))                     //Filtered array displayed
    )
  }
  private _filter(value:string):string[]{                   // We accept filtered text
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }                                                         /* And check if our options (defined above) 
                                                               Includes filtered text 
                                                               and returns an array*/
}
