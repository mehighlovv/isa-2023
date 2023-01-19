package isa.transfusioncenter.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import isa.transfusioncenter.Dto.ReserveTermDto;
import isa.transfusioncenter.Model.Term;
import isa.transfusioncenter.Service.TermService;

@Controller
public class TermController {
    private final TermService termService;

    @Autowired
    public TermController(TermService termService) {
        this.termService = termService;
    }

    @PutMapping(path = "/cancelTerm/{id}")
    public ResponseEntity<?> cancelTerm(@PathVariable Long id) {
        try {
            return new ResponseEntity<Term>(termService.cancelTerm(id), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (NotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/reserveTerm")
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
