import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReserveTermRequest } from '../models/reserve-term-request';
import { Term } from '../models/term';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TermServiceService {
  private urlBase = 'http://localhost:8080/api/terms';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  cancelTerm(termId: BigInteger): Observable<Term> {
    return this.httpClient.put(
      this.urlBase + '/cancel/' + termId.toString(),
      null,
      {
        headers: { Authorization: 'Bearer ' + this.authService.getToken() },
      }
    );
  }

  reserveTerm(request: ReserveTermRequest): Observable<Term> {
    return this.httpClient.put(this.urlBase + '/reserve', request, {
      headers: { Authorization: 'Bearer ' + this.authService.getToken() },
    });
  }
}
