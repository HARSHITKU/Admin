import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  baseURL: string = '';

  constructor(private http:HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
   }

   getAllVideo(): Observable<any> {
     let token = localStorage.getItem('token');

     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/videos';
    return this.http.get<any>(apiUrl, httpOptions);
   }
   getVideoById(userId: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/videos/' + userId;
    return this.http.get<any>(apiUrl, httpOptions);
  }
  addVideo(videoData: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/videos';
    return this.http.post(apiUrl, videoData, httpOptions);
  }
  deleteAbout(userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/videos/' + userId;
    return this.http.delete(apiUrl, httpOptions);
  }

  updateVideo(aboutData: any, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/videos/' + userId;
    return this.http.patch(apiUrl, aboutData, httpOptions);
  }
 
}
