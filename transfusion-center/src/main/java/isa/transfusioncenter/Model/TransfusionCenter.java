package isa.transfusioncenter.model;

import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "transfusion_centers")
@NoArgsConstructor
@AllArgsConstructor
public class TransfusionCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String description;

    @Column(nullable = true)
    private Time workingHoursBegin;

    @Column(nullable = true)
    private Time workingHoursEnd;

    @JsonIgnore
    @OneToMany(mappedBy = "transfusionCenter")
    private List<TransfusionCenterComplaint> complaints;

    @OneToOne(fetch = FetchType.EAGER)
    private TransfusionCenterAdministrator administrator;

    @JsonIgnore
    @OneToMany(mappedBy = "transfusionCenter")
    private List<Rating> ratings;

    @OneToMany(mappedBy = "transfusionCenter", fetch = FetchType.EAGER)
    private List<Term> terms;

    @Column
    private double avgRating;

}
