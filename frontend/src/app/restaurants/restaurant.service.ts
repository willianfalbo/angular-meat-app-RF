import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Restaurant } from './restaurant/restaurant.model';
import { FOODAPP_API } from 'app/app.api';
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let requestParameters: HttpParams = undefined
    if (search) {
      requestParameters = new HttpParams().append('q', search)
    }
    return this.http.get<Restaurant[]>(`${FOODAPP_API}/restaurants`, { params: requestParameters })
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${FOODAPP_API}/restaurants/${id}`)
  }

  restaurantReviews(id: string): Observable<any> {
    return this.http.get(`${FOODAPP_API}/restaurants/${id}/reviews`)
  }

  restaurantMenu(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${FOODAPP_API}/restaurants/${id}/menu`)
  }

}
