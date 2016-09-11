import {Component,ContentChild, ElementRef, ViewChild, Inject, forwardRef} from '@angular/core';
import { DomSanitizationService } from "@angular/platform-browser";
import {NavController, Platform, Tabs} from 'ionic-angular';
import { File, LaunchNavigator, Httpd } from "ionic-native";

import { FileService } from "../../service/file.service";
import { MusicService } from "../../service/music.service";
import { TabService } from "../../service/tab.service";
import { STMPipe } from "../../pipes/time.pipe";

import { MyApp } from "../../app";

import { Observable } from "rxjs/Observable";
// let ctrl = window


declare var cordova: any;
// const fs:string = cordova.file.dataDirectory;

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers:[DomSanitizationService],
  pipes: [STMPipe]
})
export class HomePage {
    title:string = "test";
    mp3Arr:any[] = [];
    img:HTMLImageElement;

    constructor(
      private navCtrl: NavController,
      private service:FileService,
      private platform:Platform,
      private file:File,
      private sanitiza:DomSanitizationService,
      private play:MusicService,
      private tabs:TabService
    ) {

      this.service.getFile(".mp3");

      this.service.getList()
          .then((res) => {
              this.mp3Arr = res;
            //   console.log(this.mp3Arr)
          })
    }

    getList(){
        this.service.getList().then((res) => {
            console.log(res)
        })
    }

    goToPlayPage(){
        this.tabs.service.select(1);
    }

}
