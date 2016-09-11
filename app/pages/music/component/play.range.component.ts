import {
    Component,
    Input,
    OnChanges
 } from "@angular/core";

 import { STMPipe } from "../../../pipes/time.pipe.ts";

@Component({
    selector:"play-range",
    templateUrl: "build/pages/music/component/play.range.component.html",
    pipes: [STMPipe]
})
export class PlayRangeComponent implements OnChanges {
    @Input() time:string;
    @Input() total:string;

    constructor(){

    }

    ngOnChanges(){
        console.log(this.time,this.total)
    }
}
