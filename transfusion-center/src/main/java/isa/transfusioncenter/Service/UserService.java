package isa.transfusioncenter.Service;

import isa.transfusioncenter.Model.User;

public interface UserService {
    User findByEmail(String email);

    User createUser(User user);

    User updateAccountStatus(Long id);
}
