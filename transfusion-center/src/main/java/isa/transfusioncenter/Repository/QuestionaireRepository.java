package isa.transfusioncenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.model.Questionaire;

@Repository
public interface QuestionaireRepository extends JpaRepository<Questionaire, Long> {

    Questionaire findByUserId(Long id);
}
