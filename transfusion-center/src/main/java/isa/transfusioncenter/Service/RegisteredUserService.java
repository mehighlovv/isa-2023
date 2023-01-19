package isa.transfusioncenter.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.Model.RegisteredUser;
import isa.transfusioncenter.Model.Term;
import isa.transfusioncenter.Repository.RegisteredUserRepository;

@Service
public class RegisteredUserService {

    private final RegisteredUserRepository registeredUserRepository;

    @Autowired
    public RegisteredUserService(RegisteredUserRepository registeredUserRepository) {
        this.registeredUserRepository = registeredUserRepository;
    }

    public RegisteredUser findByEmail(String email) {
        return registeredUserRepository.findByEmail(email);
    }

    public RegisteredUser createUser(RegisteredUser user) {
        return registeredUserRepository.save(user);
    }

    public RegisteredUser updateAccountStatus(Long id) {
        RegisteredUser userToBeUpdated = registeredUserRepository.findById(id).get();
        userToBeUpdated.setAccepted(true);
        return registeredUserRepository.save(userToBeUpdated);
    }

    public String loginUser(String email, String password) {
        RegisteredUser account = registeredUserRepository.findByEmail(email);
        String token = "";
        if (account == null) {
            throw new IllegalStateException("The user with the email address " + email + " doesn't exist!");
        }
        if (!account.isAccepted()) {
            throw new IllegalStateException(
                    "The user with the email address " + email + " hasn't activated their account!");
        }
        try {
            byte[] passwordSalt = account.getPasswordSalt();
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(passwordSalt);
            byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));
            String incomingPassword = new String(hashedPassword);
            String originalPassword = new String(account.getPasswordHash());
            if (incomingPassword.equals(originalPassword)) {
                token = "Auth bearer";
                return token;
            }
            throw new Exception("Something went wrong!");

        } catch (NoSuchAlgorithmException e) {
            return e.getMessage();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void scheduledMonthlyPenaltyReset() {
        ArrayList<RegisteredUser> allRegisteredUsers = registeredUserRepository.findByPenaltiesGreaterThan(0);
        for (var user : allRegisteredUsers) {
            user.setPenalties(0);
        }
        registeredUserRepository.saveAll(allRegisteredUsers);
    }

    public boolean checkForTermInLastSixMonths(RegisteredUser user) {
        List<Term> terms = user.getReservations();
        Instant now = Instant.now();
        Instant sixMonthsAgo = now.minus(6 * 30, ChronoUnit.DAYS);
        for (var term : terms) {
            if (term.getBeginDate().isAfter(sixMonthsAgo)) {
                return false;
            }
            continue;
        }
        return true;
    }
}
