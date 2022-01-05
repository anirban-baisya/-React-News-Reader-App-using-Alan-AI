import React, { useState, useEffect, createRef } from 'react'; //createRef for scroll func.
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

import classNames from "classnames";


import useStyles from './styles.js'; //importing styling to define classes


//now designing each artical news card here
const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {      {/*acepting the props here from NewsCards */}
                //^^  here we disstructring all the property comming from article 

    const classes = useStyles(); //calling style.js as a hook //now we can apply the style here by classes name 

    //---------------
    //now i have to create refs (scroll func.) for each specific card or article 
    const [elRefs, setElRefs] = useState([]); //storing all refs in an array
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  
    useEffect(() => {
      window.scroll(0, 0);
  
      setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);
  
    useEffect(() => {
      if (i === activeArticle && elRefs[activeArticle]) {
        scrollToRef(elRefs[activeArticle]);
      }
    }, [i, activeArticle, elRefs]);
   //--------------------


return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>     {/* this is an cart element */}
     {/* ^^^ implimenting refs (scroll func.) for each card ;& ^^ here i doing dynamic logic, should be card hilighated or not ; if active article === index then i have to hilight it, if not the case i simply do null*/}
      <CardActionArea href={url} target="_blank">     {/*this is the clicklable part of the card ; href={url} means when i click any of card it open the newes source url ; target="_blank" it open in new page*/}
        <CardMedia
          className={classes.media}
          image={ urlToImage || "https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png"
          } //if there is no img comes then the url will call
        //   title={title}
        />      {/*its contain img  */}
        
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}  {/*creating data obj from publishedAt, after toDateString it only gives the date */}
          </Typography> 
          
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >     {/*for some padding or margin in the buttom  */}
          {title}
        </Typography>
       
        <CardContent >
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      
      </CardActionArea>
 
    <CardActions className={classes.cardActions}>     {/*btn area  */}
        <Button size="small" color="primary" href={url}>
          Learn More
        </Button>
        
        <Typography variant="h5" color="textSecondary" component="h2">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
