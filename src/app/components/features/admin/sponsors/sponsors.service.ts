import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

    baseURL: string = '';

    constructor(private http: HttpClient, private commonService: CommonService) {
      this.baseURL = this.commonService.base_URL;
    }

    getSponsors(): Observable<any> {
        let token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };
        const apiUrl = this.baseURL + 'admin/sponsor-images';
        return this.http.get(apiUrl, httpOptions);
    }

    createSponsors(sponsorData: any): Observable<any> {
        let token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
            'Accept': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }),
        };
        const apiUrl = this.baseURL + 'admin/sponsor-images';
        return this.http.post(apiUrl, sponsorData, httpOptions);
    }
    
    deleteSponsor(sponsorId: string): Observable<any> {
        let token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };
        const apiUrl = this.baseURL + 'admin/sponsor-images/' + sponsorId;
        return this.http.delete(apiUrl, httpOptions);
      }

}
