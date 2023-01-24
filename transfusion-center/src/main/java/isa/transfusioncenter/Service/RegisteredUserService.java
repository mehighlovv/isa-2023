package isa.transfusioncenter.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.model.RegisteredUser;
import isa.transfusioncenter.model.Term;
import isa.transfusioncenter.repository.RegisteredUserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisteredUserService {

    private final RegisteredUserRepository registeredUserRepository;

    public RegisteredUser findByEmail(String email) {
        return registeredUserRepository.findByEmail(email).get();
    }

    public RegisteredUser createUser(RegisteredUser user) {
        return registeredUserRepository.save(user);
    }

    public RegisteredUser updateAccountStatus(Long id) {
        RegisteredUser userToBeUpdated = registeredUserRepository.findById(id).get();
        userToBeUpdated.setAccepted(true);
        return registeredUserRepository.save(userToBeUpdated);
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
