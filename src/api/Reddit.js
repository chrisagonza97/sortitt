import snoowrap from 'snoowrap';
import {CLIENTID, CLIENTSECRET, REFRESHTOKEN} from './config'
const CLIENT_ID    =CLIENTID;
const CLIENT_SECRET=CLIENTSECRET;
const REFRESH_TOKEN=REFRESHTOKEN;

const Reddit = {
    async getSubredditPosts(subreddit){
        const r = new snoowrap({
            userAgent: 'get-subreddit-posts',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        })
        const retPost = await r.getSubreddit(subreddit).getHot()
        return retPost
    },
    //method to search through all of reddit's posts'
    async searchAllReddit(query){
        const r = new snoowrap({
            userAgent: 'search-all-reddit',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        })
        const searchResults = await r.search({
            query: query,
            subreddit: 'all',
            sort: 'relevance'
        })
        return searchResults
    },
    //method to search through a specific subreddit's posts
    async searchThroughSubreddit(query,subreddit){
        const r = new snoowrap({
            userAgent: 'search-a-subreddit',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        })
        const searchResults = await r.search({
            query: query,
            subreddit: subreddit,
            sort: 'relevance'
        })
        return searchResults
    },

    async searchForSubreddits(query){
        const r = new snoowrap({
            userAgent: 'search-a-subreddit',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        })
        const searchResults = await r.searchSubredditNames({
            query: query
        })
        return searchResults
    },

    async getSubreddit (subreddit){
        //return subreddit icon, description
        //icon is community_icon
        //description is public_description
        let resultObject={}
        const r = new snoowrap({
            userAgent: 'search-through-a-subreddit',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        })
        //const subredditResult = await r.getSubreddit(subreddit)
        const waitfor =await  r.getSubreddit(subreddit).community_icon.then(result=> {resultObject.community_icon=result})
        const ready = await r.getSubreddit(subreddit).public_description.then(result=> {resultObject.public_description=result})

        //console.log(resultObject)

        return resultObject;
    }

}

export default Reddit;