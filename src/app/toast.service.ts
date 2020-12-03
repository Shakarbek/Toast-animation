import { OverlayModule } from '@angular/cdk/overlay';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Toasts } from './toastInter.module';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from './toast/toast.component';
import { Injector } from '@angular/core';
import { TOAST_CONFIG } from './ToastConf';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  cnt=0
  lastOverRef: OverlayRef;
  overRef: OverlayRef;
  
  constructor(private overlay: Overlay) { }

  public createInjector(ref: OverlayRef, toast: Toasts){
    const inject =Injector.create({ providers:[
      {provide: OverlayRef, useValue: ref},
      {provide: TOAST_CONFIG, useValue: toast}
    ]});
    return inject;
  }

  public async showToast(toastt: Toasts): Promise<void>{
    console.log("toastt")
    return new Promise<any>((resolve) =>{
      if(toastt.color){
        this.overRef = this.overlay.create({
          backdropClass: 'toast-backdrop',
          hasBackdrop: true,
          positionStrategy: this.getPositionHorVer(toastt.vert, toastt.horiz)
        });
      }
      else{
        this.overRef =this.overlay.create({
          backdropClass: 'toast-backdrop',
          hasBackdrop: true,
          positionStrategy: this.getPositionHorVer(toastt.vert, toastt.horiz)
        });
      }
      this.cnt++;
      this.lastOverRef=this.overRef;
      const injector =this.createInjector(this.overRef, { ...toastt, close:resolve});
      const portal = new ComponentPortal( ToastComponent, null, injector);
      this.overRef.attach(portal)
    })

  }

  getPositionVert(position: string): string {
    if (this.lastOverRef && this.lastOverRef.overlayElement && position === 'bot') {
      return this.lastOverRef.overlayElement.getBoundingClientRect().height * this.cnt + 'px';
    } 
    else if (this.lastOverRef && this.lastOverRef.overlayElement && position === 'cen') {
      return this.lastOverRef.overlayElement.getBoundingClientRect().width * this.cnt + 'px';
    } 
    else if (this.lastOverRef && this.lastOverRef.overlayElement && position === 'top') {
      return this.lastOverRef.overlayElement.getBoundingClientRect().bottom + 'px';
    } 
    else {
      this.cnt = 0;
      return '5px';
    }
  }
  getPositionHorVer(vert:string, horiz:string){
    if (vert==='Top' && horiz==='Start'){
      return this.overlay.position().global().top(this.getPositionVert('top')).left('15px');
    }
    else if (vert==='Top' && horiz==='Center'){
      return this.overlay.position().global().centerHorizontally().top(this.getPositionVert('top'));
    }
    else if (vert==='Top' && horiz==='End'){
      return this.overlay.position().global().top(this.getPositionVert('top')).right('15px');
    }
    else if (vert==='Center' && horiz==='Start'){
      return this.overlay.position().global().centerVertically(this.getPositionVert('cen')).left('15px');
    }
    else if (vert==='Center' && horiz==='Center'){
      return this.overlay.position().global().centerHorizontally().centerVertically();
    }
    else if (vert==='Center' && horiz==='End'){
      return this.overlay.position().global().centerVertically(this.getPositionVert('cen')).right('15px');
    }
    else if (vert==='Bottom' && horiz==='Start'){
      return this.overlay.position().global().bottom(this.getPositionVert('bot')).left('15px');
    }
    else if (vert==='Bottom' && horiz==='Center'){
      return this.overlay.position().global().centerHorizontally().bottom(this.getPositionVert('bot'));
    }
    else if (vert==='Bottom' && horiz==='End'){
      return this.overlay.position().global().bottom(this.getPositionVert('bot')).right('15px');
    }
  }
}
