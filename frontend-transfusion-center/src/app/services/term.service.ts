import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermServiceService {

  private urlBase = "http://localhost:8080/api/terms";

  constructor(private httpClient : HttpClient) {}
}
