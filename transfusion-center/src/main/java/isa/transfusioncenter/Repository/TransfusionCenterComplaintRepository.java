package isa.transfusioncenter.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.model.TransfusionCenter;
import isa.transfusioncenter.model.TransfusionCenterComplaint;

@Repository
public interface TransfusionCenterComplaintRepository extends JpaRepository<TransfusionCenterComplaint, Long> {
    public ArrayList<TransfusionCenterComplaint> findByTransfusionCenter(TransfusionCenter transfusionCenter);

    public ArrayList<TransfusionCenterComplaint> findByComplainee(RegisteredUser complainee);
}
