package isa.transfusioncenter.Service.Implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isa.transfusioncenter.Model.User;
import isa.transfusioncenter.Repository.UserRepository;
import isa.transfusioncenter.Service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateAccountStatus(Long id) {
        User userToBeUpdated = userRepository.getById(id);
        userToBeUpdated.setAccepted(true);
        return userRepository.save(userToBeUpdated);
    }
}
