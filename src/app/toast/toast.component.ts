import { Component, HostBinding, HostListener, Inject, OnInit, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {  Toast, ToastNoAnimation, TOAST_CONFIG } from 'ngx-toastr';
import {Toasts} from '../toastInter.module'
import {OverlayRef} from '@angular/cdk/overlay';
import {TOAST_ANIMATION_STATES} from './toast.animation'
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [TOAST_ANIMATION_STATES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {
  ttitle: string;
  content: string;
  color: boolean;
  showTitle:boolean;
  hasCloseButton: boolean;
  showDuration: boolean;
  duration: number;
  constructor( private overlay: OverlayRef, 
    @Inject(TOAST_CONFIG) private toastConf: Toasts ) { }
  
  @HostBinding('@toastAnimation')
  state: 'shiftL' | 'shiftC' | 'shiftR' |
        'backL' | 'backC' | 'backR' = 'shiftL';

  ngOnInit(): void {
    this.shiftToast();
    this.ttitle= this.toastConf.ttitle;
    this.content= this.toastConf.content;
    this.color=this.toastConf.color;
    this.showTitle=this.toastConf.showTitle;
    this.hasCloseButton=this.toastConf.hasCloseButton;
    this.showDuration=this.toastConf.showDuration;
    this.duration=this.toastConf.duration;

    
  }
  // @HostListener('@toast.done')
  // statee():void{
  //   if(this.showDuration){
  //     if(this.duration!==1){
  //       setTimeout(()=> {this.close();},
  //       this.toastConf.duration * 1000);
  //     }
  //   else{ this.hasCloseButton=true}
  //   }
  // } 

  close(){
    this.overlay.dispose();
    this.toastConf.close();
    this.backToast();
   

  }

 
  shiftToast():any{
    if(this.toastConf.horiz==='Start'){
      this.state='shiftR';
    }
    else if (this.toastConf.vert==='End'){
      this.state='shiftL';
    }
    else if (this.toastConf.horiz==='Center' || this.toastConf.horiz==='Center'){
      this.state='shiftC';
    }
  }

  backToast():any{
    if(this.toastConf.horiz==='Start'){
      return 'backR';
    }
    else if (this.toastConf.vert==='End'){
      return 'backL';
    }
    else if (this.toastConf.horiz==='Center' || this.toastConf.horiz==='Center'){
      return 'backC';
    }
  }

}
