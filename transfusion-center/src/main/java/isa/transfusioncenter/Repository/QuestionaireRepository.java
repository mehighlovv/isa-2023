package isa.transfusioncenter.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.Model.Questionaire;

@Repository
public interface QuestionaireRepository extends JpaRepository<Questionaire, Long> {

    Questionaire findByUserId(Long id);
}
