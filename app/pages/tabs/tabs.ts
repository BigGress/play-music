import {Component,ViewChild, AfterViewInit} from '@angular/core';
import { Tabs } from "ionic-angular";
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {MusicComponent} from "../music/music.component";
import { TabService } from "../../service/tab.service";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage implements AfterViewInit {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  @ViewChild("tabs") tabs:Tabs;

  constructor(
      private service:TabService
  ) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = MusicComponent;
    this.tab3Root = ContactPage;
  }

  ngAfterViewInit(){
    this.service.service = this.tabs;
  }
}
