import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddComment from '@material-ui/icons/AddComment';
import Comment from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';

import WriteComment from './WriteComment';
import CommentSection from './CommentSection';

const styles = theme => ({
  card: {
    boxShadow: 'none',
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
  content: {
    height: 80,
    display: '-webkit-box',
    overflow: 'hidden',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    lineClamp: 4
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      chat: false,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
  }

  handleExpandClick() {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  };

  handleCommentClick() {
    this.setState(state => ({
      chat: !state.chat
    }));
  };

  render() {
    const { classes, post, postId, user, comments, subcomments } = this.props;
    const { expanded, chat } = this.state;
    return (
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
          <Typography className={classes.content} component="p">
            {post.content}
          </Typography>
          <Typography component="p" align="left" variant="caption">
            Main page: <a type="button" target="_blank" rel="noopener noreferrer"
              href={post.homepageUrl}>
              {post.homepageUrl}
            </a>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={this.handleCommentClick}
            aria-expanded={expanded}
            aria-label="Comment">
            <Comment />
          </IconButton>
          <Typography>{comments.length + subcomments.filter((el) => el.postId === postId).length}</Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <AddComment />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            {Object.values(user).length !== 0 ?
              <WriteComment postId={postId} user={user} /> :
              <Typography>Sign in to write a comment.</Typography>
            }
          </CardContent>
        </Collapse>
        <Collapse in={chat} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <CommentSection postId={postId} comments={comments} subcomments={subcomments} user={user} />
            {Object.values(user).length !== 0 ?
              <WriteComment postId={postId} user={user} /> :
              <Typography>Sign in to write a comment.</Typography>
            }
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Posts);
