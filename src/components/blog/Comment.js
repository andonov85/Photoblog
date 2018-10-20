import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';

import { withStyles } from '@material-ui/core/styles';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SubComment from './SubComment';

const styles = theme => ({
  card: {
    borderRadius: 'unset',
    boxShadow: 'none',
  },
  header: {
    padding: 0
  },
  avatar: {
    margin: 10,
  },
  subcomments: {
    paddingLeft: 50
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
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentField: '',
      commentsNumber: '',
      expanded: false,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.sendSubcomment = this.sendSubcomment.bind(this);
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  sendSubcomment() {
    const { comment, user } = this.props;
    const { commentField } = this.state;
    if (commentField === '') {
      return;
    }
    let subcomment = {
      postId: comment.postId,
      commentId: comment.commentId,
      userId: user.googleId,
      userName: user.name,
      content: commentField,
      date: firebase.firestore.Timestamp.now(),
      imageUrl: user.imageUrl
    };
    this.setState({
      commentField: ''
    });

    const db = firebase.firestore();
    db.collection('subcomments').add(subcomment)
      .catch(function (error) {
        console.error("Error adding subcomment: ", error);
      });
  }

  render() {
    const { classes, comment, user, subcomments } = this.props;
    const { commentsNumber, expanded } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt={comment.userName} src={comment.imageUrl} className={classes.avatar} />
          }
          title={comment.userName}
          subheader={comment.date}
          className={classes.header}
        />
        <CardContent>
          <Typography component="p">{comment.content}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography>{commentsNumber}</Typography>
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
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.subcomments}>
              {subcomments.filter((el) => el.commentId === comment.commentId).map((subcomment, index) => {
                return (
                  <SubComment key={subcomment.subcommentId} subcomment={subcomment} />
                )
              })
              }
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Avatar alt={user.userName} src={user.imageUrl} className={classes.avatar} />
                </Grid>
                <Grid item >
                  <TextField
                    id="outlined-dense"
                    label="Write a response:"
                    className={classnames(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    value={this.state.commentField}
                    onChange={event => this.setState({ commentField: event.target.value })}
                  />
                  <Button variant="outlined" color="primary" className={classes.button} onClick={this.sendSubcomment}>
                    Answer
							    </Button>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);