package isa.transfusioncenter.Model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
@DiscriminatorValue("TRANSFUSION_CENTER_ADMIN")
public class TransfusionCenterAdministrator extends User {

    @OneToOne
    private TransfusionCenter transfusionCenter;

    @OneToMany(mappedBy = "transfusionCenterAdministrator")
    private List<Term> terms;

    @OneToMany(mappedBy = "staff")
    private List<StaffComplaint> complaints;

}
