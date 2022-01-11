import logo from './logo.svg';
import './App.css';
import {Header} from  './features/Header/Header';
import {Home} from './features/Home/Home';
import { SearchPosts } from './features/SearchPosts/SearchPosts'
import { SearchSubs } from './features/SearchSubs/SearchSubs'
import { useSelector } from 'react-redux'

function App() {
  const rendering = useSelector((state)=> state.reddit.rendering)
  let main;
  if(rendering === 'allSubredditPosts'){
    main=<Home/>
  }
  else if(rendering==='searchAllPosts'||rendering==='searchInSubreddit'){
    main=<SearchPosts/>
  }
  else if(rendering=== 'searchSubreddits' ){
    main = <SearchSubs/>
  }

  
  return (
    <div >
      <Header/>
      
      {main}
    </div>
  );
}

export default App;
