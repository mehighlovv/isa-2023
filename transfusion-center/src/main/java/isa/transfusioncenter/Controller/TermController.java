package isa.transfusioncenter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import isa.transfusioncenter.dto.ReserveTermDto;
import isa.transfusioncenter.model.Term;
import isa.transfusioncenter.service.TermService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(value = "/api/terms", produces = MediaType.APPLICATION_JSON_VALUE)
public class TermController {
    private final TermService termService;

    @PutMapping(path = "/cancel/{id}")
    public ResponseEntity<?> cancelTerm(@PathVariable Long id) {
        try {
            return new ResponseEntity<Term>(termService.cancelTerm(id), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (NotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/reserve")
    public ResponseEntity<?> reserveTerm(@RequestBody ReserveTermDto reserveTermDto) {
        try {
            return new ResponseEntity<Term>(
                    termService.reserveTerm(reserveTermDto.getTermId(), reserveTermDto.getReserverEmail()),
                    HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (NotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
