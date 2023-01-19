package isa.transfusioncenter.Controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import isa.transfusioncenter.Dto.QuestionaireDto;
import isa.transfusioncenter.Model.Questionaire;
import isa.transfusioncenter.Model.RegisteredUser;
import isa.transfusioncenter.Service.QuestionaireService;
import isa.transfusioncenter.Service.RegisteredUserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class QuestionaireController {
    private final QuestionaireService questionaireService;
    private final RegisteredUserService registeredUserService;
    private final ModelMapper modelMapper;

    @Autowired
    public QuestionaireController(QuestionaireService questionaireService,
            RegisteredUserService registeredUserService, ModelMapper modelMapper) {
        this.questionaireService = questionaireService;
        this.registeredUserService = registeredUserService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(path = "/questionaire/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        try {
            return new ResponseEntity<Questionaire>(questionaireService.findByUserId(userId), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(path = "/questionaire")
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
