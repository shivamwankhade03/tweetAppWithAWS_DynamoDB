package com.tweetApp.service.impl;

import com.tweetApp.exception.EmailIdAlreadyExitsException;
import com.tweetApp.exception.InvalidInputException;
import com.tweetApp.exception.UserNameAlreadyExistsException;
import com.tweetApp.exception.UserNotFoundException;
import com.tweetApp.modal.LoginDetails;
import com.tweetApp.modal.User;
import com.tweetApp.repository.UserRepository;
import com.tweetApp.service.UserService;
import com.tweetApp.utility.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceimpl implements UserService {

    public static final Logger LOGGER = LoggerFactory.getLogger(UserServiceimpl.class);

    @Autowired
    UserRepository userRepository;

    @Override
    public String registerNewUser(User resgistrationDetails) {
/*
        User isuserExits = userRepository.getUserByEmailId(resgistrationDetails.getEmail());

        if(isuserExits!=null) throw new EmailIdAlreadyExitsException("Email Id already exits");
        try{
            userRepository.registerNewUser(resgistrationDetails);
        }catch (DuplicateKeyException e){
                throw new UserNameAlreadyExistsException(e.getMessage());
        }
*/

        userRepository.registerNewUser(resgistrationDetails);

        return Constants.SUCCESS;
    }

    @Override
    public User authenticateLogin(LoginDetails loginDetails) {

       LOGGER.info("Login Details {}",loginDetails.toString());

        if(loginDetails.getUserName().isEmpty() || loginDetails.getUserName().isEmpty() ||
                loginDetails.getUserName()==null || loginDetails.getUserName()==null){

            throw  new InvalidInputException(" Enter valid details inputs are empty ");
        }
        User i =userRepository.getUserById(loginDetails.getUserName());
        if(i!=null){
            if(loginDetails.getPassword().equals(i.getPassword())){
                return i;
            }

        }
        throw  new InvalidInputException(" Enter valid details inputs are empty ");

    }

    @Override
    public boolean forgotPassword(LoginDetails loginDetails) {


        User user = userRepository.getUserByEmailId(loginDetails.getUserName());
        LOGGER.info("User info : {}, eamilId : {}",user,loginDetails.getUserName());
        if(user!=null){
            User u =  user;
            u.setPassword(loginDetails.getPassword());
            userRepository.update(u);
            return true;
        }else{
            throw new EmailIdAlreadyExitsException("User with this email not exits");
        }

    }

    @Override
    public User getUserById(String id) {
        User userInfo = userRepository.getUserById(id);

        if(userInfo==null){
            throw new UserNotFoundException("User not found exception");
        }

        LOGGER.info("User Details {} ",userInfo.toString());


        return userInfo;

    }

    @Override
    public List<User> getAllUsers() {
        List<User> userList = null;
        userList = userRepository.findAll();
        if(userList==null){
            throw  new UserNotFoundException("List is empty");
        }
        return userList;
    }
}
