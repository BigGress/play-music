import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File } from 'ionic-native';

import { Observable } from "rxjs/observable";

let fs = File;
// let platform = new Platform();
declare var cordova: any;

@Injectable()
export class FileService{
    file:File = fs;
    list:any[] = [];
    baseUrl:any = cordova.file
    constructor(
        // private file:File
        // private platform:Platform
    ){
        // console.log(platform)
    }

    getFile(type:string){
        let getFiles = localStorage.getItem("file");
        if(typeof getFiles === "string"){
            this.list = JSON.parse(getFiles);
        }else{
            this.checkFile(this.baseUrl.externalRootDirectory,"",type);
        }
    }

    checkFile(url:string,lastName:string,type:string){
        File.listDir(url,lastName)
            .then((files)=>{
                files.forEach((file)=>{
                    if(file.isFile){

                        if(file.name.endsWith(type)){
                            this.list.push(file);
                            localStorage.setItem("file",JSON.stringify(this.list))
                        }
                    }else{

                        let urlNext = file.fullPath.slice(1,file.fullPath.length);
                        // console.log(urlNext)
                        this.checkFile(url,urlNext,type);
                    }
                })
            })
            .catch((error)=>{
                console.error("get error:" + JSON.stringify(error))
            });

    }

    getList(){
        // let arr = JSON.parse(localStorage.getItem("file"));
        if(this.list.length === 0){
            this.getFile(".mp3");
        }
        return Promise.resolve(this.list)
        // console.log(this.list)
    }
}
