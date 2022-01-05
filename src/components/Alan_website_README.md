# This is alan ai studio code

//**  https://studio.alan.app/projects/ai_news_reader_app/scripts/ai_news_reader_app

## Ai_news_reader_app (coppied from alan website):-

// Use this sample to create your own voice commands
intent('hello world', p => { //within intent() we assign the input that user will give by voice commands
    p.play('(hello|hi there)'); //this is the reply that user will get as an voice reply 
});

intent('what does this app do?', 'what can i do here?', //within intent() we assign the input that user will give by voice commands
    reply('This is a news project')); //this is the reply that user will get as an voice reply 

/*
intent('start a command', (p) => { //this is a callback fun. , that will triger after alan lisent the command ('start a command' )
    p.play( { command: 'testCommand' }); //this is the way to perform any action by giving voice commands to alan
});
*/


const API_KEY = '41c73b7a9f3b448ca713891a701aec35'; //coping it from https://newsapi.org/account

//News by Source (ex. give newses from CNN ,ABC etc ..)   
let savedArticles = [];



// News by Source
intent('Give me the news from $(source* (.+))', (p) => { // to make this command dynamic i use  $(source* (.*)
   
   // https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=41c73b7a9f3b448ca713891a701aec35  // copied from https://newsapi.org/docs/endpoints/top-headlines   (Top headlines from BBC News)
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`; // to make this command dynamic i removed this part sources=bbc-news&  from the url
    
    if(p.source.value) { // if there is any value foundes then it returns true
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
        /*   ^^ this is api will understand and reply   BBC News
                & this is what we need to call the api  bbc-news
        */
    }
    
    api.request(NEWS_API_URL, (error, response, body) => { //(request to api, (passing 3 parameter in this callback :- 1st par error , 2nd part response, 3rd part is body))
        const { articles } = JSON.parse(body); //get the actual data using api.request from api
        
        if(!articles.length) { //response  // if no articles are fetched then :-
            p.play('Sorry, please try searching for news from a different source');
            return;
        }
        
        savedArticles = articles; //if the any articles is found then we heve to store it in a global variable 
        
        
        //once we have the articles doing same thing as previous ({'passing voice command , that is use to get the articles ' , passing some data })
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) ${p.source.value}.`); //this to say something as reply ; (latest|recent) | -it means or sometimes alan speak latest or sometimes recent 
  
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
})



// News by Term
intent('what\'s up with $(term* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}` //q means query
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
})




// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;  //this is the way to map the category form category array

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`, // this is or sign ' | '  ; user can gave any combination of word as comand that why i use  |   
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        
        if(p.C.value) { //if the category. is then play this
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation); //if useer gives yes command then it call the confirmation context
    });
});


//now i going to build read news headlines funcationally by alan
//context is a dialog like alan asking me "if u want me to read the newes " , then i reply back to alan as "YES or NO"

const confirmation = context(() => {
    intent('yes', async (p) => { //1st intent is yes
        for(let i = 0; i < savedArticles.length; i++){ //now map all the articles and read them one by one
            p.play({ command: 'highlight', article: savedArticles[i]}); //its hilght each article when alan read the particular article   
            p.play(`${savedArticles[i].title}`); // for read the news title one by one
        }
    })
    
    intent('no', (p) => { //2nd intent is yes
        p.play('Sure, sounds good to me.')
    })
})

//implementing logic to opening the ariticale
intent('open (the|) (article|) (number|) $(number* (.*))', (p) => { //it open the article by articles number 
    if(p.number.value) { //if article no existis
        p.play({ command:'open', number: p.number.value, articles: savedArticles}) // passing open and ariticale no. , 
    }
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []}) // i calling newHeadlines to reset the article with emty array [] , so it immediately going back                                             ,                                                          
})


//******************** for adding new predefined script like smallTalk(gives respones of small conversation like google assistant) 
    ///********************** steps :-  click on left side + icon to create a new script then choose a prebuild script;  after choosing clickon add predefined script button that'sit  *****************//