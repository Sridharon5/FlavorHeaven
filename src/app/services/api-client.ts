 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface RestResponse {
  status: boolean;
  data: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  
  constructor(private http: HttpClient) {

  }
  private apiKey='4917c4e8c51a4650aea45d99c83d782d';
  getApiKey(){
    return this.apiKey;
  }
  get(url: string) {
    return this.http.get<RestResponse>(this._getURL(url),{headers: { 'Content-Type': 'application/json' },withCredentials: true,});
  }
  public _getURL(url: string) {
    return `${environment.apiPath}${url}`;
  }
    post(url: string, data?: any, p0?: { headers: { 'Content-Type': string; }; responseType: string; }) {
    return this.http.post<RestResponse>(this._getURL(url), data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  
}