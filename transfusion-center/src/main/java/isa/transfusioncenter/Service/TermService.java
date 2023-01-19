package isa.transfusioncenter.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.Model.RegisteredUser;
import isa.transfusioncenter.Model.Term;
import isa.transfusioncenter.Model.TermType;
import isa.transfusioncenter.Repository.TermRepository;

@Service
public class TermService {
    private final TermRepository termRepository;
    private final RegisteredUserService registeredUserService;

    @Autowired
    public TermService(TermRepository termRepository, RegisteredUserService registeredUserService) {
        this.termRepository = termRepository;
        this.registeredUserService = registeredUserService;
    }

    public Term createTerm(Term term) {
        return termRepository.save(term);
    }

    public Term cancelTerm(Long id) throws NotFoundException, IllegalStateException {
        Term term = termRepository.findById(id).get();
        if (term != null) {
            Instant today = Instant.now();
            Instant dateBefore = term.getBeginDate();
            if (today.plus(24, ChronoUnit.HOURS).isBefore(dateBefore)) {
                if (term.getType() == TermType.PREDEFINED) {
                    term.setReserver(null);
                    return termRepository.save(term);
                } else if (term.getType() == TermType.NEW) {
                    termRepository.delete(term);
                    return term;
                }
            }
            throw new IllegalStateException();
        } else {
            throw new NotFoundException();
        }
    }

    public Term reserveTerm(Long termId, String reserverEmail) throws IllegalStateException, NotFoundException {
        Term term = termRepository.findById(termId).get();
        RegisteredUser reserver = registeredUserService.findByEmail(reserverEmail);
        if (term != null && reserver != null) {
            if (term.getReserver() == null && reserver.getQuestionaire() != null
                    && registeredUserService.checkForTermInLastSixMonths(reserver)) {
                term.setReserver(reserver);
                return termRepository.save(term);
            } else {
                throw new IllegalStateException();
            }
        } else {
            throw new NotFoundException();
        }
    }
}
