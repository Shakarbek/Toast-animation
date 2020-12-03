import { Component, Input, ViewChild, HostListener, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toastt: ToastService) { }
  @Input()
  title = 'toast-project';
  ttitle:string;
  content:string;
  failOrSuccess:boolean;
  showTitle: boolean;
  hasCloseButton: boolean;
  duration: boolean;
  durationn:number;

  @ViewChild ('fail') fail: HTMLInputElement;
  @ViewChild ('success') success: HTMLInputElement;
  @ViewChild ('showtitle') showTitlee: HTMLInputElement;
  @ViewChild ('hasClose') hasClose: HTMLInputElement;
  @ViewChild ('showDuration') showDuration: HTMLInputElement;
  @ViewChild ('topV') topV: HTMLInputElement;
  @ViewChild ('cenV') cenV: HTMLInputElement;
  @ViewChild ('botV') botV: HTMLInputElement;
  @ViewChild ('startH') startH: HTMLInputElement;
  @ViewChild ('cenH') cenH: HTMLInputElement;
  @ViewChild ('endH') endH: HTMLInputElement;

 
  
  showToaster():void{
    this.allFunctions();
    const posHor= this.getPositionH();
    const posVer=this.getPositionV();
    this.toastt.showToast({ttitle: this.ttitle, content: this.content, 
      color: this.failOrSuccess, showTitle: this.showTitle, 
      showDuration:this.duration, duration:this.durationn,
      vert: posVer, horiz: posHor, 
      hasCloseButton: this.hasCloseButton });

    this.ttitle='';
    this.content='';
    
  } 

  showTitl():void{
    if(this.showTitlee.checked){
      this.showTitle=true;
    }
    else{
      this.showTitle=false;
    }
  }

  failSuccess():void{
    if(this.fail.checked){
      this.failOrSuccess=false;
    }
    else if(this.success.checked){
      this.failOrSuccess=true;
    }
  }


  getPositionH(): string{
    if(this.startH.checked){
      return this.startH.value;
    }
    else if(this.cenH.checked){
      return this.cenH.value;
    }
    else if(this.endH.checked){
      return this.endH.value;
    }
  }

  getPositionV(): string{
    if(this.topV.checked){
      return this.topV.value;
    }
    else if(this.cenV.checked){
      return this.cenV.value;
    }
    else if(this.botV.checked){
      return this.botV.value;
    }
  }

  hasCloseButtonn():void{
    if (this.hasClose.checked){
      this.hasCloseButton=true;
    }
    else{
      this.hasCloseButton=false;
    }
  }

  showDurationn():void{
    if(this.showDuration.checked){
      this.duration=true;
    }
    else{
      this.duration=false;
    }
  }

  allFunctions():void{
    this.showTitl();
    this.failSuccess();
    this.hasCloseButtonn();
    this.showDurationn();
  }

  // public toasts = [
  //   { ttitle: 'Warning !', content: 'There was a problem with your network connection.', isOpen: false },
  //   { ttitle: 'Success !', content: 'Your message has been sent successfully.', isOpen: false },
  // ];


  
}
