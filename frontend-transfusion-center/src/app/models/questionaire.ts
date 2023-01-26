import { RegisteredUser } from './registered-user';

export interface Questionaire {
  id: Number;
  answerToFirstQuestion: boolean;
  answerToSecondQuestion: boolean;
  answerToThirdQuestion: boolean;
  answerToFourthQuestion: boolean;
  answerToFifthQuestion: boolean;
  answerToSixthQuestion: boolean;
  answerToSeventhQuestion: boolean;
  answerToEighthQuestion: boolean;
  answerToNinethQuestion: boolean;
  answerToTenthQuestion: boolean;
  answerToEleventhQuestion: boolean;
  answerToTwelfthQuestion: boolean;
  answerToThirteenthQuestion: boolean;
  answerToFourteenthQuestion: boolean;
  answerToFifteenthQuestion: boolean;
  answerToSixteenthQuestion: boolean;
  answerToSeventeenthQuestion: boolean;
  answerToEighteenthQuestion: boolean;
  answerToNineteenthQuestion: boolean;
  answerToTwentiethQuestion: boolean;
  answerToTwentyFirstQuestion: boolean;
  answerToTwentySecondQuestion: boolean;
  answerToTwentyThirdQuestion: boolean;
  answerToTwentyFourthQuestion: boolean;
  answerToTwentyFifthQuestion: boolean;
  answerToTwentySixthQuestion: boolean;
  user: RegisteredUser;
}
