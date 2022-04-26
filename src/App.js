import React, {useEffect ,useState} from 'react';
import './App.css';
import { Typography } from '@material-ui/core';
import alanBtn from '@alan-ai/alan-sdk-web' //importing alan 

import wordsToNumbers from 'words-to-numbers'; //to covert open artical no comand string to no(ex. open arti. 4)

import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js'; //importing styling to define classes

import AlanLogo from './AlanLogo.png';
import Footer from './components/Footer/Footer';

const alanKey= 'f77fa48b2f1195c01df117f9c0355fc32e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const [newsArticles, setNewsArticles] = useState([]) //now i have create cards to display the news content from console to webpage using  useState
  const [activeArticle, setActiveArticle] = useState(-1); //it stores the index of the arical that alan reading

  const classes = useStyles(); //calling style.js as a hook //now we can apply the style here by classes name


  useEffect(() => { //When we want to perform something after each render of component then we can use the useEffect() hook ; (its a function ,if there is any changes occurs it automatically run the component).
let alanBtnInstance = alanBtn({ //calling alanBtn as a fun.
      key: alanKey, //providing api key
      onCommand: ({command ,articles, number }) => { //passing the user inputed command as paramater && the news aricles
        if (command === 'newHeadlines') { // its the way to do action after recognising sertain command by input
              // alert('This code was executed'); //this block of code will execute after giving the above comand 
                console.log(articles);
                setNewsArticles(articles);//setting hooks
                setActiveArticle(-1); //when i search the new news i have to rest the activeArticle no 
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1); //this the techniqe when we want change the state value based on prev. state we call it as a callback fun. (prevActiveArticle) & icrement it
        }else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
           alanBtn().playText('Please try that again...');
          } else if (article) { //if article exites
            window.open(article.url, '_blank');//to open in new page
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }

      },
      onConnectionStatus: async function (status) { //this is for welcome voice note
        if (status === 'authorized') { //for this i storing alanBtn func. into an variable called alanBtnInstance (line: 22)
          await alanBtnInstance.activate();
          alanBtnInstance.playText(
            'Welcome to the Alan AI News Reader App'

          )
          alanBtnInstance.playText(
            'Hello I am Alan , i was programmed by my best friend Anirban,  i am happy to help you ,please give your command '
          );
        }
      },

    });

  }, []);
  
  return (
    <div className="App">
     
     <div className={classes.logoContainer}>
     {newsArticles.length ? ( // newsArticles.length ? == if in the newsArticles array there is any 'news Articles' available  then only this block of code excute
          //console.log({newsArticles}),
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant='h5' component='h2' style={{ fontSize: 15 }}>
                Try saying: <br />
                <br />
                Open the article number 2 or 3 or 4 etc
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant='h5' component='h2' style={{ fontSize: 15 }}>
                Try saying: <br />
                <br />
                Go back
                <br />
                {/* or
                <br />
                Give me the Instructions */}
              </Typography>
            </div>
          </div>
        ) : null}
        <img src={AlanLogo} className={classes.alanLogo} alt='logo' />
      </div>

      <NewsCards articles={newsArticles} activeArticle={activeArticle}/> {/*passing newsArticles & activeArticle as an props so that we can access it NewesCards.js */}
      <Footer />
        

    </div>
  );
}

export default App;
