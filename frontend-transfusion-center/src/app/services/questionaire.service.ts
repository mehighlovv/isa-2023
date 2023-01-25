import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questionaire } from '../models/questionaire';
import { QuestionaireRequest } from '../models/questionaire-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

  private urlBase = "http://localhost:8080/api/questionaires";

  constructor(private httpClient : HttpClient, private authService : AuthService) {}

  answerQuestionaire(request : QuestionaireRequest) : Observable<Questionaire>{
    return this.httpClient.post<Questionaire>(this.urlBase,request,{headers:{"Authorization":"Bearer "+ this.authService.getToken()}});
  }
}
