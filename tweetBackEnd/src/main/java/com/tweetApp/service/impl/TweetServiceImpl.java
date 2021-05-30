package com.tweetApp.service.impl;

import com.tweetApp.exception.PostTweetFailedException;
import com.tweetApp.exception.ResourceNotFoundException;
import com.tweetApp.modal.Comment;
import com.tweetApp.modal.Tweet;
import com.tweetApp.modal.User;

import com.tweetApp.repository.TweetRepository;

import com.tweetApp.repository.UserRepository;
import com.tweetApp.service.TweetService;
import com.tweetApp.utility.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TweetServiceImpl implements TweetService {

    public static final Logger LOGGER = LoggerFactory.getLogger(TweetServiceImpl.class);

    @Autowired
    TweetRepository tweetRepo;

    @Autowired
    UserRepository userRepo;


    @Override
    public String postTweet(String userId, Tweet tweet) {
        User userInfo= userRepo.getUserById(userId);
        LOGGER.info("User Details : {} ",userInfo);

        Tweet tweetObj = new Tweet();
        tweetObj.setTweetMsg(tweet.getTweetMsg());
        tweetObj.setFirstName(tweet.getFirstName());
        tweetObj.setLastName(tweet.getLastName());
        //LocalDateTime time = LocalDateTime.now();
        tweetObj.setTime(new Date());
        tweetObj.setLike(String.valueOf(0));
        tweetObj.setCommentList(new ArrayList<>());
        tweetObj.setUserId(userId);
        LOGGER.info("Tweet {}",tweetObj.toString());
        Tweet tObj = tweetRepo.save(tweetObj);

        if(!tObj.getId().isEmpty()){
            return Constants.SUCCESS;
        }

        throw new PostTweetFailedException("Tweet posting failed");
    }

    @Override
    public List<Tweet> getAllTweets() {
        List<Tweet> tweetList=null;
        tweetList = tweetRepo.findAll();
      // Collections.sort(tweetList);
//
//        for (Tweet t: tweetList
//             ) {
//            LOGGER.info("Tweet : {}",t.toString());
//        }
        return tweetList;
    }

    @Override
    public List<Tweet> getTweetByUserId(String userId) {
        List<Tweet> tweetlist = null;
        tweetlist = tweetRepo.findByUserId(userId);
      //  Collections.sort(tweetlist);
        return tweetlist;
    }

    @Override
    public  Tweet updateTweet(String userId, String id, String updatedMsg) {
        LOGGER.info("Inside update tweet method");
        Tweet tweet = tweetRepo.findByTweetId(id);
        Tweet newTweet = new Tweet();
        if(tweet!=null){
           newTweet = tweet;
           newTweet.setTweetMsg(updatedMsg);
           newTweet.setTime(new Date());

           newTweet = tweetRepo.update(newTweet);
            System.out.println("Updated successfullly");
        }
        return newTweet;
    }

    @Override
    public boolean deleteTweet(String id) {

        Tweet tweet = tweetRepo.findByTweetId(id);
        if( tweet!=null){
            tweetRepo.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public List<String> likeTweet(String userId, String id, String type) {
        LOGGER.info("Service : "+id);
        Tweet tweet = tweetRepo.findByTweetId(id);

        System.out.println("Id is ====>: "+tweet.toString());
        Tweet newTweet = new Tweet();
        List<String> likeByUser = new ArrayList<>();

        if(tweet!=null){
            newTweet = tweet;
            likeByUser =  newTweet.getLikeBy();
            if(type.contains("true")){
              likeByUser.add(userId);
                if(Integer.parseInt(newTweet.getLike())>=0){
                    newTweet.setLike( String.valueOf(Integer.parseInt(newTweet.getLike()) + 1));
                }
            }else{
                likeByUser.remove(userId);
                if(Integer.parseInt(newTweet.getLike())>0){
                    newTweet.setLike(String.valueOf(Integer.parseInt(newTweet.getLike()) - 1));
                }
            }
            newTweet.setLikeBy(likeByUser);
            tweetRepo.update(newTweet);

            return newTweet.getLikeBy();
        }
        return newTweet.getLikeBy();
    }

    @Override
    public Tweet replyTweet(String userId, String id, String reply) {
        LOGGER.info("Service : {} and Reply {} ",id,reply);
        Tweet tweet = tweetRepo.findByTweetId(id);

        Tweet newTweet = tweet;
        if(tweet!=null){

            List<Comment> commentList = new ArrayList<>();
            commentList = newTweet.getCommentList();

            Comment replyToTweet = new Comment();
            replyToTweet.setText(reply);
            replyToTweet.setCommentBy(userId);


            if(tweet.getCommentList() == null || tweet.getCommentList().size() ==0){
                commentList.add(replyToTweet);
                newTweet.setCommentList(commentList);
            }else{

                commentList.add(replyToTweet);
                newTweet.setCommentList(commentList);

            }
            newTweet = tweetRepo.update(newTweet);
            LOGGER.info("Updated successfullly {}",newTweet.toString());
        }
        return newTweet;
    }
}
