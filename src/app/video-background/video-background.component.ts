import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-video-background',
  templateUrl: './video-background.component.html',
  styleUrls: ['./video-background.component.scss'],
})
export class VideoBackgroundComponent  implements OnInit {

  @ViewChild('miVideo')
  miVideo!: ElementRef;

  constructor() { }

  ngOnInit() {}

  public reproducirVideo() {
    const videoElement = this.miVideo.nativeElement as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
  }
  
  public pausarVideo() {
    const videoElement = this.miVideo.nativeElement as HTMLVideoElement;
    if (videoElement) {
      videoElement.pause();
    }
  }

}
