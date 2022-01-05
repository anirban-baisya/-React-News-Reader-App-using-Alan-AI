import React from 'react'
import NewsCard from '../NewsCard/NewsCard';
import { Grid , Grow, Typography} from '@material-ui/core';//this 3 thins provide mobile, animation ,text 

import useStyles from './styles.js'; //importing styling to define classes

const infoCards = [ //this instructions cards array i have to map 
  { color: '#00838f', title: 'SmallTalk by Terms', info: 'Hello, Talk to me, Where are you from, accent, help, who programmed, birth date, age, Are we friends, Bye ...', text: 'Above terms to talk with Alan' },
  { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest news ... or  Technology news' },
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];


 const NewsCards = ({articles, activeArticle}) => { //rafc //in NewsCards.js we get the articles as a props
   
  const classes = useStyles(); //calling style.js as a hook //now we can apply the style here by classes name

  // !articles.length same as articles.length === 0
  if (!articles.length) { //here i designing voice commands instructions card page using infoCards array
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (  // itterating each infoCard
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                
                {infoCard.info ? <Typography variant="h6" component="h6"> {/* infoCard.info ? == if in the infoCards array there is any 'info' available in the array elements then only this block of code show the info */}
                          <strong>
                      {infoCard.title.split(' ')[2]} {/* it split the infoCard's title into an array , & take the last element from the array*/}
                            </strong>: 
                          <br />{infoCard.info} {/*getting info text from the array */}
                    </Typography> : null } {/*: null  if ther is no info the it will be null*/}
                
                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }








  return (
       /*
       <div>
                {articles.map((article,i) => ( //this to fetch the articles array data
                    <NewsCard/> // for each article we have to return a card component so it can display
                ))}
        </div>*/

        <Grow in> 
        {/*(in) if its true it showes the animation  */}
      <Grid className={classes.container}  container alignItems="stretch" spacing={3}> {/* spacing between the cards ; container to wrap all itemes(cards) */}
        {articles.map((article, i) => (  //this to fetch the articles array data
          
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}> {/*item type grid  */}
           {/*map over the cards  */}
            <NewsCard  i={i} article={article} activeArticle={activeArticle}/> {/*for each article we have to return a card component so it can display*/}
                     {/*^^^ in NewsCard we send our article & i(index) ; & sending activeArticle to know the card is active or not  */}
          </Grid>
        ))}
      </Grid>
    </Grow>
    );
}
export default NewsCards;