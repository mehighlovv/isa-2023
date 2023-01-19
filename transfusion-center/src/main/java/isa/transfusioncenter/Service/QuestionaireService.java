package isa.transfusioncenter.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.Model.Questionaire;
import isa.transfusioncenter.Repository.QuestionaireRepository;

@Service
public class QuestionaireService {
    private final QuestionaireRepository questionaireRepository;

    @Autowired
    public QuestionaireService(QuestionaireRepository questionaireRepository) {
        this.questionaireRepository = questionaireRepository;
    }

    public Questionaire findByUserId(Long id) {
        return questionaireRepository.findByUserId(id);
    }

    public Questionaire save(Questionaire questionaire) {
        return questionaireRepository.save(questionaire);
    }
}
