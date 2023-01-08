package isa.transfusioncenter.Dto;

import lombok.Data;

@Data
public class RegisterUserDto {
    private String email;
    private String password;
    private String name;
    private String lastname;
    private String address;
    private String city;
    private String country;
    private String phone;
    private String socialSecurityNumber;
    private String gender;
    private String occupation;
    private String companyInfo;
}
