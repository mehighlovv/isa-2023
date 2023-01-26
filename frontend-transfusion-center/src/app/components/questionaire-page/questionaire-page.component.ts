import { Component } from '@angular/core';
import { QuestionaireRequest } from 'src/app/models/questionaire-request';
import { RegisteredUserService } from 'src/app/services/registered-user.service';
import { QuestionaireService } from 'src/app/services/questionaire.service';
import { Questionaire } from 'src/app/models/questionaire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionaire-page',
  templateUrl: './questionaire-page.component.html',
  styleUrls: ['./questionaire-page.component.css']
})
export class QuestionairePageComponent {
  isQuestionairePopulated: boolean = false;
  authenticated: boolean = false;
  answerToFirstQuestion: boolean | undefined;
  answerToSecondQuestion: boolean | undefined;
  answerToThirdQuestion: boolean | undefined;
  answerToFourthQuestion: boolean | undefined;
  answerToFifthQuestion: boolean | undefined;
  answerToSixthQuestion: boolean | undefined;
  answerToSeventhQuestion: boolean | undefined;
  answerToEighthQuestion: boolean | undefined;
  answerToNinethQuestion: boolean | undefined;
  answerToTenthQuestion: boolean | undefined;
  answerToEleventhQuestion: boolean | undefined;
  answerToTwelfthQuestion: boolean | undefined;
  answerToThirteenthQuestion: boolean | undefined;
  answerToFourteenthQuestion: boolean | undefined;
  answerToFifteenthQuestion: boolean | undefined;
  answerToSixteenthQuestion: boolean | undefined;
  answerToSeventeenthQuestion: boolean | undefined;
  answerToEighteenthQuestion: boolean | undefined;
  answerToNineteenthQuestion: boolean | undefined;
  answerToTwentiethQuestion: boolean | undefined;
  answerToTwentyFirstQuestion: boolean | undefined;
  answerToTwentySecondQuestion: boolean | undefined;
  answerToTwentyThirdQuestion: boolean | undefined;
  answerToTwentyFourthQuestion: boolean | undefined;
  answerToTwentyFifthQuestion: boolean = false;
  answerToTwentySixthQuestion: boolean = false;
  registeredUserEmail: string | undefined;

  constructor(
    private registeredUserService: RegisteredUserService,
    private questionareService: QuestionaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registeredUserService.getUserByEmail().subscribe((response) => {
      this.registeredUserEmail = response.email;
      this.questionareService.getQuestionaireByUsedId(response.id).subscribe((response1) => {
        if (response1 != null) {
          this.bindHtmlValues(response1);
        }
      });
    });
  }

  bindHtmlValues(questionaire : Questionaire) {
    this.answerToFirstQuestion = questionaire.answerToFirstQuestion;
    this.answerToSecondQuestion = questionaire.answerToSecondQuestion;
    this.answerToThirdQuestion = questionaire.answerToThirdQuestion;
    this.answerToFirstQuestion = questionaire.answerToFirstQuestion;
    this.answerToFourthQuestion = questionaire.answerToFourthQuestion;
    this.answerToFifthQuestion = questionaire.answerToFifthQuestion;
    this.answerToSixthQuestion = questionaire.answerToSixthQuestion;
    this.answerToSeventhQuestion = questionaire.answerToSeventhQuestion;
    this.answerToEighthQuestion = questionaire.answerToEighthQuestion;
    this.answerToNinethQuestion = questionaire.answerToNinethQuestion;
    this.answerToTenthQuestion = questionaire.answerToTenthQuestion;
    this.answerToEleventhQuestion = questionaire.answerToEleventhQuestion;
    this.answerToTwelfthQuestion = questionaire.answerToTwelfthQuestion;
    this.answerToThirteenthQuestion = questionaire.answerToThirteenthQuestion;
    this.answerToFourteenthQuestion = questionaire.answerToFourteenthQuestion;
    this.answerToFifteenthQuestion = questionaire.answerToFifteenthQuestion;
    this.answerToSixteenthQuestion = questionaire.answerToSixteenthQuestion;
    this.answerToSeventeenthQuestion = questionaire.answerToSeventeenthQuestion;
    this.answerToEighteenthQuestion = questionaire.answerToEighteenthQuestion;
    this.answerToNineteenthQuestion = questionaire.answerToNineteenthQuestion;
    this.answerToTwentiethQuestion = questionaire.answerToTwentiethQuestion;
    this.answerToTwentyFirstQuestion = questionaire.answerToTwentyFirstQuestion;
    this.answerToTwentySecondQuestion = questionaire.answerToTwentySecondQuestion;
    this.answerToTwentyThirdQuestion = questionaire.answerToTwentyThirdQuestion;
    this.answerToTwentyFourthQuestion = questionaire.answerToTwentyFourthQuestion;
    this.answerToTwentyFifthQuestion = questionaire.answerToTwentyFifthQuestion;
    this.answerToTwentySixthQuestion = questionaire.answerToTwentySixthQuestion;
    this.isQuestionairePopulated = true;
  }

  getRadioButtonValues() : QuestionaireRequest {
    let questionaire : QuestionaireRequest = {
      answerToFirstQuestion: this.answerToFirstQuestion!,
      answerToSecondQuestion: this.answerToSecondQuestion!,
      answerToThirdQuestion: this.answerToThirdQuestion!,
      answerToFourthQuestion: this.answerToFourthQuestion!,
      answerToFifthQuestion: this.answerToFifthQuestion!,
      answerToSixthQuestion: this.answerToSixthQuestion!,
      answerToSeventhQuestion: this.answerToSeventhQuestion!,
      answerToEighthQuestion: this.answerToEighthQuestion!,
      answerToNinethQuestion: this.answerToNinethQuestion!,
      answerToTenthQuestion: this.answerToTenthQuestion!,
      answerToEleventhQuestion: this.answerToEleventhQuestion!,
      answerToTwelfthQuestion: this.answerToTwelfthQuestion!,
      answerToThirteenthQuestion: this.answerToThirteenthQuestion!,
      answerToFourteenthQuestion: this.answerToFourteenthQuestion!,
      answerToFifteenthQuestion: this.answerToFifteenthQuestion!,
      answerToSixteenthQuestion: this.answerToSixteenthQuestion!,
      answerToSeventeenthQuestion: this.answerToSeventeenthQuestion!,
      answerToEighteenthQuestion: this.answerToEighteenthQuestion!,
      answerToNineteenthQuestion: this.answerToNineteenthQuestion!,
      answerToTwentiethQuestion: this.answerToTwentiethQuestion!,
      answerToTwentyFirstQuestion: this.answerToTwentyFirstQuestion!,
      answerToTwentySecondQuestion: this.answerToTwentySecondQuestion!,
      answerToTwentyThirdQuestion: this.answerToTwentyThirdQuestion!,
      answerToTwentyFourthQuestion: this.answerToTwentyFourthQuestion!,
      answerToTwentyFifthQuestion: this.answerToTwentyFifthQuestion!,
      answerToTwentySixthQuestion: this.answerToTwentySixthQuestion!,
      registeredUserEmail: this.registeredUserEmail!
    };
    return questionaire;
  }

  submitAnswers() {
    this.questionareService.answerQuestionaire(this.getRadioButtonValues()).subscribe((response) => {
      this.isQuestionairePopulated = true;
    });
  }
}
