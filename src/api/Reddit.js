import snoowrap from "snoowrap";
import { CLIENTID, CLIENTSECRET, REFRESHTOKEN } from "./config";
const CLIENT_ID = CLIENTID;
const CLIENT_SECRET = CLIENTSECRET;
const REFRESH_TOKEN = REFRESHTOKEN;

const Reddit = {
  async getSubredditPosts(subreddit) {
    const r = new snoowrap({
      userAgent: "get-subreddit-posts",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    const retPost = await r.getSubreddit(subreddit).getHot();
    return retPost;
  },
  //method to search through all of reddit's posts'
  async searchAllReddit(query) {
    const r = new snoowrap({
      userAgent: "search-all-reddit",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    const searchResults = await r.search({
      query: query,
      subreddit: "all",
      sort: "relevance",
    });
    return searchResults;
  },
  async searchAllRedditBefore(query, beforeDate) {
    const r = new snoowrap({
      userAgent: "search-all-reddit-before",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    let returnResults = [];
    let searchResults = await r
      .search({
        query: query,
        subreddit: "all",
        sort: "relevance",
      })
      .fetchAll({ append: true });

    //let searchLen = searchResults.length;
    //let flag=true;
    //console.log('here1')
    returnResults = searchResults.filter(
      (post) => post.created_utc < beforeDate
    );

    //console.log('here')
    return returnResults;
  },
  async searchAllRedditAfter(query, afterDate) {
    const r = new snoowrap({
      userAgent: "search-all-reddit-after",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    let returnResults = [];
    let searchResults = await r
      .search({
        query: query,
        subreddit: "all",
        sort: "relevance",
      })
      .fetchAll({ append: true });

    //let searchLen = searchResults.length;
    //let flag=true;
    //console.log('here1')
    returnResults = searchResults.filter(
      (post) => post.created_utc > afterDate
    );

    //console.log('here')
    return returnResults;
  },
  async searchAllRedditBeforeAfter(query, beforeDate, afterDate) {
    const r = new snoowrap({
      userAgent: "search-all-reddit-before-after",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    let returnResults = [];
    let searchResults = await r
      .search({
        query: query,
        subreddit: "all",
        sort: "relevance",
      })
      .fetchAll({ append: true });

    //let searchLen = searchResults.length;
    //let flag=true;
    //console.log('here1')
    returnResults = searchResults.filter(
      (post) => post.created_utc > afterDate && post.created_utc < beforeDate
    );

    //console.log('here')
    return returnResults;
  },
  //method to search through a specific subreddit's posts
  async searchThroughSubreddit(query, subreddit) {
    const r = new snoowrap({
      userAgent: "search-a-subreddit",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    const searchResults = await r.search({
      query: query,
      subreddit: subreddit,
      sort: "relevance",
    });
    return searchResults;
  },
  async searchThroughSubredditBefore(query, subreddit, beforeDate) {
    const r = new snoowrap({
      userAgent: "search-sub-reddit-before",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    let returnResults = [];
    let searchResults = await r
      .search({
        query: query,
        subreddit: subreddit,
        sort: "relevance",
      })
      .fetchAll({ append: true });

    //let searchLen = searchResults.length;
    //let flag=true;
    //console.log('here1')
    returnResults = searchResults.filter(
      (post) => post.created_utc < beforeDate
    );

    //console.log('here')
    return returnResults;
  },
  async searchThroughSubredditAfter(query, subreddit, afterDate) {
    const r = new snoowrap({
      userAgent: "search-sub-reddit-after",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    let returnResults = [];
    let searchResults = await r
      .search({
        query: query,
        subreddit: subreddit,
        sort: "relevance",
      })
      .fetchAll({ append: true });

    //let searchLen = searchResults.length;
    //let flag=true;
    //console.log('here1')
    returnResults = searchResults.filter(
      (post) => post.created_utc > afterDate
    );

    //console.log('here')
    return returnResults;
  },
  async searchThroughSubredditBeforeAfter(
    query,
    subreddit,
    beforeDate,
    afterDate
  ) {
    const r = new snoowrap({
      userAgent: "search-sub-reddit-before-after",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    let returnResults = [];
    let searchResults = await r
      .search({
        query: query,
        subreddit: subreddit,
        sort: "relevance",
      })
      .fetchAll({ append: true });

    //let searchLen = searchResults.length;
    //let flag=true;
    //console.log('here1')
    returnResults = searchResults.filter(
      (post) => post.created_utc > afterDate && post.created_utc < beforeDate
    );

    //console.log('here')
    return returnResults;
  },
  async searchForSubreddits(query) {
    const r = new snoowrap({
      userAgent: "search-for-subreddit",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    const searchResults = await r.searchSubredditNames({
      query: query,
    });
    return searchResults;
  },

  async getSubreddit(subreddit) {
    //return subreddit icon, description
    //icon is community_icon
    //description is public_description
    let resultObject = {};
    const r = new snoowrap({
      userAgent: "search-through-a-subreddit",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    });
    //const subredditResult = await r.getSubreddit(subreddit)
    const waitfor = await r
      .getSubreddit(subreddit)
      .community_icon.then((result) => {
        resultObject.community_icon = result;
      });
    const ready = await r
      .getSubreddit(subreddit)
      .public_description.then((result) => {
        resultObject.public_description = result;
      });

    //console.log(resultObject)

    return resultObject;
  },
};

export default Reddit;
