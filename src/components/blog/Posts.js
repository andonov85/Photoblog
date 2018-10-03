import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    boxShadow: 'none',
    marginBottom: '8px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
});

class Posts extends React.Component {
  render() {
    const { classes, post } = this.props;

    return (
      <Grid item xs={12} key={post.linkUrl}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar src={post.avatarUrl}
                aria-label="Recipe" className={classnames(classes.avatar, classes.bigAvatar)}>
              </Avatar>
            }
            title={post.title}
            subheader={post.date}
          />
          <a type="button" target="_blank" rel="noopener noreferrer"
            href={post.linkUrl}>
            <CardMedia
              className={classes.media}
              image={post.imageUrl}
              title={post.title}
            />
          </a>
          <CardContent>
            <div>
              <Typography component="p">
                {post.content}
              </Typography>
              <Typography component="p" align="left" variant="caption">
                Main page: <a type="button" target="_blank" rel="noopener noreferrer"
                  href={post.homepageUrl}>
                  {post.homepageUrl}
                </a>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Posts);
