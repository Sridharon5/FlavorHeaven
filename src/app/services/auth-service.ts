 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
private isAuthenticated:boolean=false;
private userId:string='';
private username:string='';
setUserId(value:string){
  this.userId=value;
}
getUserId(){
  return this.userId;
}
setUsername(value:string){
  this.username=value;
}
getUsername(){
  return this.username;
}
setIsAuthenticated(value:boolean){
    this.isAuthenticated=value;
}
getIsAuthenticated(){
    return this.isAuthenticated;
}

}