import {Component,ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Tabs} from 'ionic-angular';
import {StatusBar,File, LaunchNavigator} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import { FileService } from "./service/file.service";
import { MusicService } from "./service/music.service";
import { TabService } from "./service/tab.service";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  public rootPage: any;

  constructor(
    private platform: Platform
  ) {
    this.rootPage = TabsPage;

    platform.ready().then((res) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,[FileService,File,MusicService,TabService]);
