package isa.transfusioncenter.Model;

import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;
    @Column
    private String name;
    @Column
    private String lastname;
    @Column
    private String gender;
    @Column
    private String phone;
    @Column
    private String socialSecurityNumber;
    @Column
    private String address;
    @Column
    private String country;
    @Column
    private String city;
    @Column
    private byte[] passwordHash;
    @Column
    private byte[] passwordSalt;
    @Column
    private String occupation;
    @Column
    private String companyInfo;

}
