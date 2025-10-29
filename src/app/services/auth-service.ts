 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
private isAuthenticated:boolean=false;
setIsAuthenticated(value:boolean){
    this.isAuthenticated=value;
}
  getIsAuthenticated(){
    return this.isAuthenticated;
}
}