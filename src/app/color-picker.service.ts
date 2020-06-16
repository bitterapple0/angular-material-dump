import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  colorClass$: BehaviorSubject<string> = new BehaviorSubject('blue-theme')
  constructor(private overlayContainer:OverlayContainer) { 
    overlayContainer.getContainerElement().classList.add('blue-theme');
  }
  
  getColorClass(){
    return this.colorClass$
  }

  setColorClass(className:string){
    this.overlayContainer.getContainerElement().classList.forEach(css =>{
      this.overlayContainer.getContainerElement().classList.remove(css);
    })
    this.overlayContainer.getContainerElement().classList.add(className)
    this.colorClass$.next(className)
  }
}
