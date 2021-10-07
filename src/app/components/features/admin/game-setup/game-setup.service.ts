import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Game} from 'src/app/models/game-setup.model';

@Injectable({
  providedIn: 'root'
})
export class GameSetupService {

    baseURL: string = '';

    constructor(private http: HttpClient, private commonService: CommonService) {
      this.baseURL = this.commonService.base_URL;
    }

    getGamesId(): Observable<any> {
        let token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };
        const apiUrl = this.baseURL + 'admin/games';
        return this.http.get(apiUrl, httpOptions);
      }
      
      updateGame(gameId: string, data: Game): Observable<any> {
        let token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };
        const apiUrl = this.baseURL + 'admin/games/' + gameId;
        return this.http.patch(apiUrl, data, httpOptions);
      }

}
