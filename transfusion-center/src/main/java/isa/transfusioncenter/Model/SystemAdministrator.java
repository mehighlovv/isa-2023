package isa.transfusioncenter.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SYSTEM_ADMIN")
public class SystemAdministrator extends User {

}
