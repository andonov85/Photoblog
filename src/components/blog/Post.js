import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from '@material-ui/icons/Comment';
import LazyLoad from 'react-lazy-load';
import TextField from '@material-ui/core/TextField';

import CommentSection from './CommentSection';
import { getComments } from './blogSource';

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
  lazyLoad: {
    display: 'inline-block',
    position: 'relative',
    height: 600,
    [theme.breakpoints.down('sm')]: {
      height: 300,
    }
  }
});

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      expanded: false,
      chat: false,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
  }

  componentDidMount() {
    getComments(this.props.postId).then((comments) => {
      this.setState({
        comments: comments
      });
    });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleCommentClick = () => {
    this.setState(state => ({ chat: !state.chat }));
  };

  render() {
    const { classes, post, postId, user } = this.props;
    const { comments, expanded, chat } = this.state;
    return (
      <Grid item xs={12}>
        <LazyLoad className={classes.lazyLoad} offsetVertical={1000}>
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
              <Typography>{comments.length}</Typography>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={chat} timeout="auto" unmountOnExit>
              <CardContent>
                {Object.values(user).length !== 0 ?
                  <div>
                    <Avatar alt={user.userName} src={user.imageUrl} className={classes.avatar} />
                    <Typography>
                      {user.name}
                    </Typography>
                    <TextField
                      in={chat.toString()}
                      id="outlined-multiline-static"
                      label="Write a comment:"
                      fullWidth={true}
                      multiline
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </div> :
                  <Typography>Sign in to write a comment.</Typography>
                }
              </CardContent>
            </Collapse>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <CommentSection postId={postId} comments={comments}/>
              </CardContent>
            </Collapse>
          </Card>
        </LazyLoad>
      </Grid>
    );
  }
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Posts);
