package com.tweetApp.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.tweetApp.modal.Tweet;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.tweetApp.modal.User;
import com.tweetApp.service.impl.TweetServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TweetRepository {
    public static final Logger LOGGER = LoggerFactory.getLogger(TweetRepository.class);

    @Autowired
    DynamoDBMapper dynamoDBMapper;

    public Tweet save(Tweet tweet) {
        dynamoDBMapper.save(tweet);
        LOGGER.info("Tweet in Repo {}",tweet.toString());

        return tweet;
    }

    public List<Tweet> findAll() {
        List<Tweet> tweetList = new ArrayList<>();
        try {
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            tweetList = dynamoDBMapper.scan(Tweet.class, scanExpression);

        } catch (Exception e) {
            e.printStackTrace();
        }
        LOGGER.info("Tweet in Repo {}",tweetList.toString());

        return tweetList;

    }

    public List<Tweet> findByUserId(String userId) {
        List<Tweet> tweetList = new ArrayList<>();
        try {
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            if (userId != null) {
                scanExpression.addFilterCondition("userId",
                        new Condition()
                                .withComparisonOperator(ComparisonOperator.EQ)
                                .withAttributeValueList(new AttributeValue().withS(userId)));

                tweetList = dynamoDBMapper.scan(Tweet.class, scanExpression);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        LOGGER.info("Tweet in Repo {}",tweetList.toString());

        return tweetList;
    }

    public Tweet findByTweetId(String tweetId) {
        List<Tweet> tweetList = new ArrayList<>();
        try {
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            if (tweetId != null) {
                scanExpression.addFilterCondition("id",
                        new Condition()
                                .withComparisonOperator(ComparisonOperator.EQ)
                                .withAttributeValueList(new AttributeValue().withS(tweetId)));

                tweetList = dynamoDBMapper.scan(Tweet.class, scanExpression);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        LOGGER.info("Tweet in Repo {}",tweetList.toString());

        return tweetList.get(0);
    }

    //
    public Tweet update(Tweet tweet) {
        dynamoDBMapper.save(tweet,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("id",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withS(tweet.getId())
                                )));
        return tweet;
    }


    public void deleteById(String tweetId) {
        Tweet tweet = dynamoDBMapper.load(Tweet.class, tweetId);
        dynamoDBMapper.delete(tweet);
    }
}
