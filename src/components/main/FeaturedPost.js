import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  root: {
    marginLeft: '25%',
    marginRight: '25%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0%',
      marginRight: '0%',
    }
  },
  card: {
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
});

class FeaturedPost extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src="https://images-na.ssl-images-amazon.com/images/I/51wtkjMLdTL._SR600,315_SCLZZZZZZZ_.png" 
            aria-label="Recipe" className={classnames(classes.avatar, classes.bigAvatar)}>
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title = "Hands-on with new Fujifilm XF 200mm F2 and XF 8-16mm F2.8"
          subheader = "Sep 11, 2018 "
        />
        <a type="button" target="_blank" rel="noopener noreferrer" 
        href="https://www.dpreview.com/articles/3133419616/hands-on-with-new-fujifilm-xf-200mm-f2-and-xf-8-16mm-f2-8?slide=2">
        <CardMedia
          className={classes.media}
          image = "https://2.img-dpreview.com/files/p/E~TS589x442~articles/3133419616/lens01.jpeg"
          title = "Hands-on with new Fujifilm XF 200mm F2 and XF 8-16mm F2.8"
        />
        </a>
        <CardContent>
          <Typography component="p">
            The new XF 200mm F2 R LM OIS WR looks like it will be a seriously impressive lens (the sample we've had our hands on is a pre-production model, which was not cleared for testing).
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      </div>
    );
  }
}

FeaturedPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedPost);
