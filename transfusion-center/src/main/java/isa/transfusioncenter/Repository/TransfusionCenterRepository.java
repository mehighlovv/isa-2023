package isa.transfusioncenter.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.model.TransfusionCenter;

@Repository
public interface TransfusionCenterRepository extends JpaRepository<TransfusionCenter, Long> {

    public ArrayList<TransfusionCenter> findAll();

}
