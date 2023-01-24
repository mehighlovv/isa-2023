package isa.transfusioncenter.model;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "terms")
@Data
@Entity
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant beginDate;

    private Long durationInMinutes;

    @JsonIgnore
    @ManyToOne
    private TransfusionCenter transfusionCenter;

    @JsonIgnore
    @ManyToOne
    private TransfusionCenterAdministrator transfusionCenterAdministrator;

    @JsonIgnore
    @ManyToOne
    private RegisteredUser reserver;

    @Column
    @Enumerated(EnumType.STRING)
    private TermType type;
}
