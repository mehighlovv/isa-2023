package isa.transfusioncenter.Dto;

import lombok.Data;

@Data
public class RatingDto {

    private Long userId;
    private Long transfusionCenterId;
    private int score;

}
