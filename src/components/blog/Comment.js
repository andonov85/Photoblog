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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import SubComment from './SubComment';
import { uploadComment } from './uploadSource'

const styles = theme => ({
  card: {
    borderRadius: 'unset',
    boxShadow: 'none',
  },
  header: {
    padding: 0
  },
  subcomments: {
    paddingLeft: 50
  },
  paper: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    boxShadow: 'unset'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
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

    uploadComment('subcomments', subcomment);
  }

  render() {
    const { classes, comment, user, subcomments } = this.props;
    const { expanded } = this.state;

    const filteredSubcomments = subcomments.filter((el) => el.commentId === comment.commentId);

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt={comment.userName} src={comment.imageUrl} />
          }
          title={comment.userName}
          titleTypographyProps={{ variant: "body2" }}
          subheader={comment.date}
          subheaderTypographyProps={{ variant: "body2" }}
          className={classes.header}
        />
        <CardContent>
          <Paper className={classes.paper}>
            <Typography component="p" >{comment.content}</Typography>
          </Paper>
        </CardContent>
        {/* <Divider /> */}
        <CardActions style={{ justifyContent: 'flex-end', marginTop: -10 }} disableActionSpacing>
          <Typography variant="caption">
            Answers: {filteredSubcomments.length}
          </Typography>
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.subcomments}>
              {filteredSubcomments.map((subcomment) => {
                return (
                  <SubComment key={subcomment.subcommentId} subcomment={subcomment} />
                )
              })
              }
              <Grid container spacing={8} alignItems="flex-start">
                <Grid item style={{ flexGrow: 1 }}>
                  {user ?
                    <React.Fragment>
                      <TextField
                        id="outlined-multiline-static"
                        fullWidth={true}
                        label="Write a response:"
                        className={classnames(classes.textField, classes.dense)}
                        margin="normal"
                        multiline
                        rows="4"
                        variant="outlined"
                        value={this.state.commentField}
                        onChange={event => this.setState({ commentField: event.target.value })}
                      />
                      <Button variant="outlined" color="primary" className={classes.button} onClick={this.sendSubcomment}>
                        Publish
							        </Button>
                    </React.Fragment> :
                    <Typography variant="caption">Sign in to write a comment.</Typography>
                  }
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