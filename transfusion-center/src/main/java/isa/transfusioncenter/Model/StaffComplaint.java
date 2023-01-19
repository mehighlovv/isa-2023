package isa.transfusioncenter.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("STAFF_COMPLAINT")
public class StaffComplaint extends Complaint {

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private TransfusionCenterAdministrator staff;
}
