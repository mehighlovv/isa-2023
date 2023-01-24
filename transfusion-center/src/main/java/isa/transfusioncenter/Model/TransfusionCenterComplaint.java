package isa.transfusioncenter.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("TRANSFUSION_CENTER_COMPLAINT")
public class TransfusionCenterComplaint extends Complaint {

    @ManyToOne
    @JoinColumn(name = "transfusion_center_id")
    private TransfusionCenter transfusionCenter;

}
