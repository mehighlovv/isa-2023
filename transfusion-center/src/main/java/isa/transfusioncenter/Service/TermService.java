package isa.transfusioncenter.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.model.Term;
import isa.transfusioncenter.model.TermStatus;
import isa.transfusioncenter.model.TermType;
import isa.transfusioncenter.repository.TermRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TermService {
    private final TermRepository termRepository;
    private final RegisteredUserService registeredUserService;
    private final QuestionaireService questionaireService;

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
            if (term.getReserver() == null && questionaireService.findByUserId(reserver.getId()) != null
                    && registeredUserService.checkForTermInLastSixMonths(reserver)) {
                term.setReserver(reserver);
                term.setStatus(TermStatus.TAKEN);
                return termRepository.save(term);
            } else {
                throw new IllegalStateException();
            }
        } else {
            throw new NotFoundException();
        }
    }

    public ArrayList<Term> findByTransfusionCenterId(Long transfusionCenterId) {
        return termRepository.findByTransfusionCenterIdAndStatus(transfusionCenterId, TermStatus.FREE);
    }
}
