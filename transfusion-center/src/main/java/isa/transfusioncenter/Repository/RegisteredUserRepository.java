package isa.transfusioncenter.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.model.RegisteredUser;

@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {

    public Optional<RegisteredUser> findByEmail(String email);

    public ArrayList<RegisteredUser> findAll();

    public ArrayList<RegisteredUser> findByPenaltiesGreaterThan(int penalties);

}
