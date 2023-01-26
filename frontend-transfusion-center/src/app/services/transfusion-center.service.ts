import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransfusionCenter } from '../models/transfusion-center';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TransfusionCenterService {
  private urlBase = 'http://localhost:8080/api/transfusionCenters';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAllCenters(): Observable<TransfusionCenter[]> {
    return this.httpClient.get<TransfusionCenter[]>(this.urlBase, {
      headers: { Authorization: 'Bearer ' + this.authService.getToken() },
    });
  }
}
