import { Injectable } from "@angular/core";
import { Http, RequestOptions, RequestMethod, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FileService } from "./file.service";

let header = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
});
let options = new RequestOptions({
    headers:header
})

@Injectable()
export class MusicService{
    playingInfo:any;
    playingObject:any;
    playingMusic:any;

    /**
     * 0 暂停中
     * 1 播放中
     *
     * @type {number}
     */
    playingStatus:number;
    constructor(
        private file:FileService,
        private http:Http
    ){
        let lastMusic = localStorage.getItem("lastMusic")
        if(!!lastMusic){
            this.playingInfo = JSON.parse(lastMusic)
        }

    }
    consoleMusic(){
        console.log(this.playingMusic)

        console.log(this.playingMusic.getDuration())
        // console.log(this.playingMusic.getCurrentPosition())
    }

    /**
     * 获取音乐
     *
     * @param {any} obj
     */
    getMusic(obj,i){
        console.log(obj);
        this.playingInfo = obj;

        if(!!this.playingMusic){
            this.playingMusic.stop();
        }
        this.playingInfo.count = i;
        //保持上一次播放的音乐
        localStorage.setItem("lastMusic",JSON.stringify(this.playingInfo));

        this.playingMusic = new window["Media"]("cdvfile:///sdcard"+obj.nativeURL.split("/0")[1]);

        let int = setInterval(() => {
            let time = this.playingMusic.getDuration();
            if(time > 0){
                clearInterval(int);
                this.playingInfo.totalTime = time;
            }
        },100)

        this.getTime();


        this.playMusic();

    }
    /**
     * 播放音乐
     */
    playMusic(){
        if(!!this.playingMusic){
            this.playingMusic.play();
            this.playingStatus = 1;
        }else{
            let lastMusic = JSON.parse(localStorage.getItem("lastMusic"));

            if(!!lastMusic){
                this.getMusic(lastMusic,lastMusic.count);
            }
        }
    }

    /**
     * 暂停音乐
     */
    pauseMusic(){
        if(!!this.playingMusic){
            this.playingMusic.pause();
            this.playingStatus = 0;
        }
    }

    /**
     * 停止音乐
     */
    stopMusic(){
        if(!!this.playingMusic){
            this.playingMusic.stop();
            this.playingStatus = 0;
        }
    }


    /**
     * 获取播放时间
     */
    getTime(){
        setInterval(() => {
            this.playingMusic.getCurrentPosition((time) => {
                if(time > -1){
                    this.playingInfo.playTime = time;
                }
            })
        },1000);
    }


    /**
     * 上一曲
     */
    preMusic(){
        let lastMusic = JSON.parse(localStorage.getItem("lastMusic"));
        console.log(lastMusic)
        this.file.getList().then((list) =>{
            this.getMusic(list[lastMusic.count - 1],lastMusic.count - 1)
        });
    }

    /**
     * 下一曲
     */
    nextMusic(){
        let lastMusic = JSON.parse(localStorage.getItem("lastMusic"));
        console.log(lastMusic.count)
        this.file.getList().then((list) => {
            this.getMusic(list[lastMusic.count + 1],lastMusic.count + 1)
        })
    }

    getLrc(song:string){
        this.http.get("http://sou.kuwo.cn/ws/NSearch?key=%E5%BE%AE%E5%BE%AE%E4%B8%80%E7%AC%91",options)
            .subscribe((res) => {
                console.log(res)
            })
    }
}
