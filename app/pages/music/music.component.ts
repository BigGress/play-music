import {
    Component,
    Host,
    ElementRef,
 } from "@angular/core";

import { MusicService } from "../../service/music.service";

import { PlayRangeComponent } from "./component/play.range.component";

@Component({
    templateUrl:"build/pages/music/music.component.html",
    directives: [PlayRangeComponent],
    styles:[]
})
export class MusicComponent{
    @Host() host:ElementRef;
    constructor(
        private play:MusicService
    ){

        // this.play.getLrc("");
    }

    test(){
        console.log(
            this.host
        )
    }
}
