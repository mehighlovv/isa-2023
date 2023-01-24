package isa.transfusioncenter.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.service.RegisteredUserService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final RegisteredUserService registeredUserService;

    @GetMapping(path = "/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('TRANSFUSION_CENTER_ADMIN')")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            return new ResponseEntity<RegisteredUser>(registeredUserService.findByEmail(email), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/activate/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> activateAccount(@PathVariable Long id) {
        try {
            return new ResponseEntity<RegisteredUser>(registeredUserService.updateAccountStatus(id), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
