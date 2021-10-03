import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  base_URL: string = 'https://casino-api-088.herokuapp.com/api/v1/';

  constructor() { }
}
