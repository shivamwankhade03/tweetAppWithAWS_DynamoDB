package com.tweetApp.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.tweetApp.exception.EmailIdAlreadyExitsException;
import com.tweetApp.exception.UserNameAlreadyExistsException;
import com.tweetApp.modal.User;
import com.tweetApp.utility.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    @Autowired
    DynamoDBMapper dynamoDBMapper;

    public User registerNewUser(User resgistrationDetails) {
        dynamoDBMapper.save(resgistrationDetails);
        return resgistrationDetails;
    }

    public User getUserById(String userId) {
        return dynamoDBMapper.load(User.class, userId);
    }

    public User getUserByEmailId(String emailId) {
        List<User> resp = new ArrayList<>();
        try {
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();

            scanExpression.addFilterCondition("email",
                    new Condition()
                            .withComparisonOperator(ComparisonOperator.EQ)
                            .withAttributeValueList(new AttributeValue().withS(emailId)));


            resp = dynamoDBMapper.scan(User.class, scanExpression);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return resp.get(0);
    }

    public List<User> findAll(){
        List<User> userList = new ArrayList<>();
        try {
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            userList = dynamoDBMapper.scan(User.class, scanExpression);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return userList;

    }


//
//    public String delete(String employeeId) {
//        Employee emp = dynamoDBMapper.load(Employee.class, employeeId);
//        dynamoDBMapper.delete(emp);
//        return "Employee Deleted!";
//    }
//
    public String update(User user) {
        dynamoDBMapper.save(user,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("email",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withS(user.getEmail())
                                )));
        return user.getlogInId();
    }
}
