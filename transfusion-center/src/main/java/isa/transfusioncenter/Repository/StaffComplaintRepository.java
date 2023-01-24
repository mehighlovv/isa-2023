package isa.transfusioncenter.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.model.StaffComplaint;

@Repository
public interface StaffComplaintRepository extends JpaRepository<StaffComplaint, Long> {
    public ArrayList<StaffComplaint> findAll();
}
