// import interface Comment;

export interface TweetDetails extends Comment {
        id: string,
        tweetMsg: string ,
        userId: string ,
        like: number ,
        firstName:string,
        lastName :string,
        time:string,
        commentList: Comment[],
        likeBy:string[]
}

