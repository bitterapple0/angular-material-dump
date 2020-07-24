import { Injectable } from '@angular/core';
import {OnboardingComponent } from './components/onboarding/onboarding.component'
@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }
  private overlays: Map<number, OnboardingComponent> = new Map();
  private latestShownOverlayId = -1;

  public showOverlay(id: number) {
    console.log(this.overlays);
    const overlay = this.overlays.get(id);
    if (overlay) {
      overlay.showOverlay();
    }
  }

  public registerOverlay(overlay: OnboardingComponent) {
    console.log('registered'+ overlay.id);
    this.overlays.set(overlay.id, overlay)
  }

  public destroyOverlay(overlay: OnboardingComponent) {
    this.overlays.delete(overlay.id);
  }

  public wasClosed(overlayId: number) {
    this.latestShownOverlayId = overlayId;
    const overlay = this.overlays.get(this.latestShownOverlayId + 1);
    if (overlay) {
      console.log('triggered wasClosed')
      setTimeout(() => overlay.showOverlay(), 500);
    }
  }
}
