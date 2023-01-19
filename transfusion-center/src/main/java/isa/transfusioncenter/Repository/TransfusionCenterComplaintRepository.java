package isa.transfusioncenter.Repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.Model.RegisteredUser;
import isa.transfusioncenter.Model.TransfusionCenter;
import isa.transfusioncenter.Model.TransfusionCenterComplaint;

@Repository
public interface TransfusionCenterComplaintRepository extends JpaRepository<TransfusionCenterComplaint, Long> {
    public ArrayList<TransfusionCenterComplaint> findByTransfusionCenter(TransfusionCenter transfusionCenter);

    public ArrayList<TransfusionCenterComplaint> findByComplainee(RegisteredUser complainee);
}
