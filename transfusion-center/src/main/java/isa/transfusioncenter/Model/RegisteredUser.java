package isa.transfusioncenter.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("REGISTERED_USER")
public class RegisteredUser extends User {

    @Column
    private int loyaltyPoints = 0;

    @Column
    private int penalties = 0;

    @OneToMany(mappedBy = "complainee", fetch = FetchType.EAGER)
    private List<Complaint> complaints = new ArrayList<Complaint>();

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Rating> ratings = new ArrayList<Rating>();

    @OneToOne(cascade = CascadeType.MERGE)
    private Questionaire questionaire;

    @OneToMany(mappedBy = "reserver", fetch = FetchType.EAGER)
    private List<Term> reservations = new ArrayList<Term>();

}
