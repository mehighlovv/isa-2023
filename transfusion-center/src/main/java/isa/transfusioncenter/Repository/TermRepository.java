package isa.transfusioncenter.repository;

import java.time.Instant;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.model.Term;
import isa.transfusioncenter.model.TermStatus;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {
    public ArrayList<Term> findByBeginDate(Instant beginDate);

    public ArrayList<Term> findByReserver(RegisteredUser reserver);

    public ArrayList<Term> findByTransfusionCenterIdAndStatus(Long transfusionCenterId, TermStatus termsStatus);
}
