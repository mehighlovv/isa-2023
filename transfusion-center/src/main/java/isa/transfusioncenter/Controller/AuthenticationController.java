package isa.transfusioncenter.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import isa.transfusioncenter.dto.LoginDto;
import isa.transfusioncenter.dto.RegisterUserDto;
import isa.transfusioncenter.dto.TokenDto;
import isa.transfusioncenter.service.AuthenticationService;
import lombok.RequiredArgsConstructor;

@Controller
@CrossOrigin
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        return new ResponseEntity<TokenDto>(authenticationService.register(registerUserDto), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        return new ResponseEntity<TokenDto>(authenticationService.authenticate(loginDto), HttpStatus.OK);
    }
}
