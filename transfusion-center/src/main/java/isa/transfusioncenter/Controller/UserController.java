package isa.transfusioncenter.Controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import isa.transfusioncenter.RabbitMQ.RabbitMQProducer;

import isa.transfusioncenter.Dto.LoginDto;
import isa.transfusioncenter.Dto.RegisterUserDto;
import isa.transfusioncenter.Model.RegisteredUser;
import isa.transfusioncenter.Service.EmailService;
import isa.transfusioncenter.Service.RegisteredUserService;

@Controller
public class UserController {
    private final RegisteredUserService registeredUserService;
    private final ModelMapper modelMapper;
    private final EmailService emailService;
    private final RabbitMQProducer producer;

    @Autowired
    public UserController(RegisteredUserService registeredUserService, ModelMapper modelMapper,
            EmailService emailService, RabbitMQProducer producer) {
        this.registeredUserService = registeredUserService;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
        this.producer = producer;
    }

    @GetMapping(path = "/users/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            return new ResponseEntity<RegisteredUser>(registeredUserService.findByEmail(email), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/start")
    public ResponseEntity<?> startSimulation() {
        producer.sendMessage("testcina");
        return new ResponseEntity<String>("super",HttpStatus.OK);
    }

    @PostMapping(path = "/users/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDto userDto) {
        try {
            RegisteredUser userToBeCreated = modelMapper.map(userDto, RegisteredUser.class);
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            String password = userDto.getPassword();
            byte[] hashedPassword;
            if (password != null) {
                hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));
                userToBeCreated.setPasswordHash(hashedPassword);
                userToBeCreated.setPasswordSalt(salt);
                RegisteredUser newUser = registeredUserService.createUser(userToBeCreated);
                String to = newUser.getEmail();
                String subject = "Activate Account";
                String body = "http://localhost:8080/users/activateAccount/" + newUser.getId().toString();
                emailService.sendEmail(to, subject, body);
                return new ResponseEntity<RegisteredUser>(newUser, HttpStatus.OK);
            }
            return new ResponseEntity<String>("Failed to send email", HttpStatus.NOT_FOUND);
        } catch (NoSuchAlgorithmException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(path = "/users/activateAccount/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> activateAccount(@PathVariable Long id) {
        try {
            return new ResponseEntity<RegisteredUser>(registeredUserService.updateAccountStatus(id), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            return new ResponseEntity<String>(
                    registeredUserService.loginUser(loginDto.getEmail(), loginDto.getPassword()),
                    HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
