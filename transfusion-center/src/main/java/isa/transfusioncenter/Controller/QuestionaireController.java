package isa.transfusioncenter.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import isa.transfusioncenter.dto.QuestionaireDto;
import isa.transfusioncenter.model.Questionaire;
import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.service.QuestionaireService;
import isa.transfusioncenter.service.RegisteredUserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/api/questionaires", produces = MediaType.APPLICATION_JSON_VALUE)
public class QuestionaireController {
    private final QuestionaireService questionaireService;
    private final RegisteredUserService registeredUserService;
    private final ModelMapper modelMapper;

    @GetMapping(path = "/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        try {
            return new ResponseEntity<Questionaire>(questionaireService.findByUserId(userId), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    public ResponseEntity<?> answerQuestionaire(@RequestBody QuestionaireDto questionaireDto) {
        try {
            Questionaire newQuestionaire = modelMapper.map(questionaireDto, Questionaire.class);
            RegisteredUser user = registeredUserService.findByEmail(questionaireDto.getRegisteredUserEmail());
            newQuestionaire.setUser(user);
            return new ResponseEntity<Questionaire>(questionaireService.save(newQuestionaire), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
