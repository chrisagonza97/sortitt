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
    }
}

export default Reddit;