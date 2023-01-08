package isa.transfusioncenter.Model;

import jakarta.persistence.Id;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String email;
    private String name;
    private String lastname;
    private String gender;
    private String phone;
    private String socialSecurityNumber;
    private String address;
    private String country;
    private String city;
    private String occupation;
    private String companyInfo;
    private int loyaltyPoints;
    private byte[] passwordHash;
    private byte[] passwordSalt;
    private boolean isAccepted;

}
