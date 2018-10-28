import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';

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
  favourite: {
    color: '#dc143c'
  },
  unfavourite: {
    color: 'grey'
  }
});

class Post extends React.Component {
  isLikeRecieved = false;
  isLikePending = false;
  isLiked = false;

  constructor(props) {
    super(props);
    this.state = {
      commentsCounter: 0,
      chat: false,
      likes: 0,
      changeLikeColor: false
    };
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.addToLiked = this.addToLiked.bind(this);
  }

  componentDidMount() {
    const db = firebase.firestore();

    this.unsubscribeBlog = db.collection('blog').doc(this.props.postId).onSnapshot((post) => {
      if (post.exists) {
        const commentsCounter = post.data().commentsCounter;
        const likes = post.data().likes;

        this.setState({
          commentsCounter: commentsCounter,
          likes: likes,
        });
      } else {
        console.log(`postId ${this.props.postId} doesn't exists or can't retrieve it`);
      }
    });

    if (typeof this.props.user === 'object' && this.props.user.hasOwnProperty('userId')) {
      this.unsubscribeUserLiked = db.collection('users').doc(this.props.user.userId)
        .collection('userLiked').where('postId', '==', this.props.postId).onSnapshot((userLike) => {
          if (userLike.docs.length === 1) {
            this.setState(() => {
              this.isLikeRecieved = true;
              this.isLiked = userLike.docs[0].data().isLiked;

              return {
                changeLikeColor: this.isLiked
              };
            });
          }
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (typeof user !== 'object') return;

    if (user !== prevProps.user && user.hasOwnProperty('userId')) {
      let db = firebase.firestore();
      this.unsubscribeUserLiked = db.collection('users').doc(user.userId)
        .collection('userLiked').where('postId', '==', this.props.postId).onSnapshot((userLike) => {
          if (userLike.docs.length === 1) {
            this.setState(() => {
              this.isLikeRecieved = true;
              this.isLiked = userLike.docs[0].data().isLiked;

              return {
                changeLikeColor: this.isLiked
              };
            });
          }
        });
    } else if (user !== prevProps.user && !user.hasOwnProperty('userId')) {
      this.isLikeRecieved = false;
      this.isLiked = false;

      this.setState({
        changeLikeColor: false
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribeBlog();
    if (this.unsubscribeUserLiked) {
      this.unsubscribeUserLiked();
    }
  }

  addToLiked() {
    if (typeof this.props.user !== 'object') {
      return;
    } else if (!this.props.user.hasOwnProperty('userId') && !this.isLikeRecieved) {
      return;
    } else if (this.isLikePending) {
      return;
    }

    this.isLikePending = !this.isLikePending;
    const vote = this.isLiked ? -1 : 1;

    this.setState({
      changeLikeColor: !this.state.changeLikeColor,
      likes: this.state.likes + vote
    });

    const db = firebase.firestore();
    const postRef = firebase.firestore().collection('blog').doc(this.props.postId);

    db.runTransaction((t) => {
      return t.get(postRef).then((post) => {
        const newLikes = post.data().likes + vote;
        t.update(postRef, { likes: newLikes });
      });
    }).then(() => {
      const userLiked = db.collection('users').doc(this.props.user.userId).collection('userLiked');
      userLiked.where('postId', '==', this.props.postId).get().then((liked) => {
        if (liked.docs.length === 0) {
          userLiked.add({
            postId: this.props.postId,
            isLiked: !this.isLiked
          }).then(() => {
            this.isLikePending = false;
          }).catch(err => {
            console.log(`Adding "isLiked" doc failure: `, err);
          });
        } else {
          userLiked.doc(liked.docs[0].id).update({
            isLiked: !this.isLiked
          }).then(() => {
            this.isLikePending = false;
          }).catch(err => {
            console.log(`Updating "isLiked" doc failure: `, err);
          });
        }
      });
    }).catch(err => {
      console.log(`Transaction "${vote} like" failure: `, err);
    });
  }

  handleCommentClick() {
    this.setState(state => ({
      chat: !state.chat
    }));
  };

  render() {
    const { classes, post, postId, user } = this.props;
    const { commentsCounter, chat, changeLikeColor, likes } = this.state;

    post.date = new Date(post.date).toDateString();

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
          <IconButton aria-label="Add to favorites" onClick={this.addToLiked}>
            {changeLikeColor ?
              <FavoriteIcon className={classes.favourite} /> : <FavoriteIcon className={classes.unfavourite} />}
            <Typography>{likes}</Typography>
          </IconButton>
          <IconButton
            onClick={this.handleCommentClick}
            aria-expanded={chat}
            aria-label="Comment">
            <Comment />
            <Typography>{commentsCounter}</Typography>
          </IconButton>
        </CardActions>
        <Collapse in={chat} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <CommentSection postId={postId} user={user} />
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

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
