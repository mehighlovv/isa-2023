import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransfusionCenterService {

  private urlBase = "http://localhost:8080/api/transfusionCenters";

  constructor(private httpClient : HttpClient) {}
}
