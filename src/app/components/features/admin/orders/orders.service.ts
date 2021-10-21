import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseURL: string = '';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }

  getAllOrders(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/orders';
    return this.http.get<any>(apiUrl, httpOptions);
  }

  getAllUndeliveredOrders(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/undelivered-orders';
    return this.http.get<any>(apiUrl, httpOptions);
  } 

  getOrderById(orderId: string): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/orders/' + orderId;
    return this.http.get<any>(apiUrl, httpOptions);
  }
  
  deleteOrder(orderId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/orders/' + orderId;
    return this.http.delete(apiUrl, httpOptions);
  }

  updateOrderStatus(status: any, orderId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/orders/' + orderId + '/update-status';
    return this.http.post(apiUrl, status, httpOptions);
  }
}
