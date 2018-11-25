import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'unset',
    backgroundColor: '#F5F9FA'
  },
  media: {
    objectFit: 'cover',
  },
});

class NewsCard extends React.Component {
  render() {
    const { classes, article, height } = this.props;
    const date = new Date(article.publishedAt)
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height={height || "250"}
          image={article.urlToImage}
          title="Contemplative Reptile"
        />
        <div style={{ padding: '15px 10px 15px 10px' }}>
          <CardContent>
            <Typography variant="button" style={{ display: 'inline-block', marginBottom: '0.8rem', color: "#ffbf00" }}>
              {article.author} <span style={{ color: "#848F95" }}>| {date}</span>
            </Typography>
            <Typography gutterBottom variant="h5" style={{ fontWeight: 700 }}>
              {article.title}
            </Typography>
            <Typography component="p">
              {article.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              href={article.url}
              rel="noopener noreferrer"
              target="_blank"
              size="small" style={{ marginTop: -10, fontSize: '0.857rem', color: "#848F95" }}>
              <div><span style={{ borderBottom: "2px solid" }}>READ </span>MORE</div>
            </Button>
          </CardActions>
        </div>
      </Card>
    );
  }
}

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsCard);
