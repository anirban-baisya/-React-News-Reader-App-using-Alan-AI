import { makeStyles } from '@material-ui/core/styles';
//here in material-ui we have to write styling in style.js not in css
export default makeStyles({
    // this makeStyles creates a hook so to call it in NewsCard.js useStyles()
 
    media: {
        height: 250,
      },
      border: {
        border: 'solid',
      },
      fullHeightCard: {
        height: '100%',
      },
      card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '10px solid white',
      },
      activeCard: {
        borderBottom: '10px solid #22289a',
      },
      grid: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      title: {
        padding: '0 16px',
      },
      cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      },
});