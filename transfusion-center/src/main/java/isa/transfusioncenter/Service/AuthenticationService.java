package isa.transfusioncenter.service;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.dto.LoginDto;
import isa.transfusioncenter.dto.RegisterUserDto;
import isa.transfusioncenter.dto.TokenDto;
import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.model.Role;
import isa.transfusioncenter.repository.RegisteredUserRepository;
import isa.transfusioncenter.security.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RegisteredUserRepository registeredUserRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final EmailService emailService;

    public TokenDto register(RegisterUserDto registerUserDto) {
        RegisteredUser user = modelMapper.map(registerUserDto, RegisteredUser.class);
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        user.setRole(Role.REGISTERED_USER);
        registeredUserRepository.save(user);
        String to = registerUserDto.getEmail();
        String subject = "Activate Account";
        String body = "http://localhost:8080/api/users/activate/" + user.getId().toString();
        emailService.sendEmail(to, subject, body);
        Map<String, Object> claims = new HashMap<String, Object>() {
        };
        claims.put("role", user.getAuthorities());
        String jwt = jwtService.generateToken(claims, user);
        return new TokenDto(jwt);
    }

    public TokenDto authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        RegisteredUser user = registeredUserRepository.findByEmail(loginDto.getEmail())
                .orElseThrow();
        String jwt = jwtService.generateToken(user);
        return new TokenDto(jwt);
    }
}
