package isa.transfusioncenter.Repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isa.transfusioncenter.Model.RegisteredUser;

@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {

    public RegisteredUser findByEmail(String email);

    public ArrayList<RegisteredUser> findAll();

    public ArrayList<RegisteredUser> findByPenaltiesGreaterThan(int penalties);

}
