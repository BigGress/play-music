import { Pipe,PipeTransform } from "@angular/core";

@Pipe({name:"seconedToMinute"})
export class STMPipe{
    transform(time:string){
        let total = parseInt(time),
            minute = parseInt((total/60).toString()),
            seconed = parseInt((total%60).toString());


        if(!isNaN(minute) && !isNaN(seconed)){
            return (minute < 10 ? "0" + minute : minute) +
                    ":" +
                    (seconed < 10 ? "0" + seconed : seconed);
        }else{
            return "00:00";
        }
    }
}
