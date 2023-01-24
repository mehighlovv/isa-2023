package isa.transfusioncenter.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "questionaires")
@Entity
public class Questionaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private boolean answerToFirstQuestion;
    @Column
    private boolean answerToSecondQuestion;
    @Column
    private boolean answerToThirdQuestion;
    @Column
    private boolean answerToFourthQuestion;
    @Column
    private boolean answerToFifthQuestion;
    @Column
    private boolean answerToSixthQuestion;
    @Column
    private boolean answerToSeventhQuestion;
    @Column
    private boolean answerToEighthQuestion;
    @Column
    private boolean answerToNinethQuestion;
    @Column
    private boolean answerToTenthQuestion;
    @Column
    private boolean answerToEleventhQuestion;
    @Column
    private boolean answerToTwelfthQuestion;
    @Column
    private boolean answerToThirteenthQuestion;
    @Column
    private boolean answerToFourteenthQuestion;
    @Column
    private boolean answerToFifteenthQuestion;
    @Column
    private boolean answerToSixteenthQuestion;
    @Column
    private boolean answerToSeventeenthQuestion;
    @Column
    private boolean answerToEighteenthQuestion;
    @Column
    private boolean answerToNineteenthQuestion;
    @Column
    private boolean answerToTwentiethQuestion;
    @Column
    private boolean answerToTwentyFirstQuestion;
    @Column
    private boolean answerToTwentySecondQuestion;
    @Column
    private boolean answerToTwentyThirdQuestion;
    @Column
    private boolean answerToTwentyFourthQuestion;
    @Column
    private boolean answerToTwentyFifthQuestion;
    @Column
    private boolean answerToTwentySixthQuestion;

    @OneToOne(cascade = CascadeType.MERGE)
    private RegisteredUser user;
}
