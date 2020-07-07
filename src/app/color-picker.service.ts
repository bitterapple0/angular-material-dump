import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  subject: BehaviorSubject<string> = new BehaviorSubject('color-theme')
  colorClass$: Observable<string> = this.subject.asObservable()
  constructor(private overlayContainer:OverlayContainer) { 
    overlayContainer.getContainerElement().classList.add('color-theme');
  }
  
  getColorClass(){
    return this.colorClass$
  }

  switchDarkClass(isDark:boolean){
    if(isDark){
      this.setOverlay('color-theme-dark')
      this.subject.next('color-theme-dark')
    }
    else{
      this.setOverlay('color-theme')
      this.subject.next('color-theme')
    }
  }
  setOverlay(className:string){
    let currentTheme =this.overlayContainer.getContainerElement().classList[1]
    this.overlayContainer.getContainerElement().classList.remove(currentTheme)
    this.overlayContainer.getContainerElement().classList.add(className)
  }
}
