package isa.transfusioncenter.service;

import org.springframework.stereotype.Service;

import isa.transfusioncenter.model.Questionaire;
import isa.transfusioncenter.repository.QuestionaireRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionaireService {
    private final QuestionaireRepository questionaireRepository;

    public Questionaire findByUserId(Long id) {
        return questionaireRepository.findByUserId(id);
    }

    public Questionaire save(Questionaire questionaire) {
        return questionaireRepository.save(questionaire);
    }
}
