import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';
import { AlgoliaUpdateSearchIndex } from '../../AlgoliaUpdateSearchIndex'

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'grey'
  },
  userName: {
    display: 'inline'
  }
});

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      content: '',
      avatarUrl: '',
      imageUrl: '',
      linkUrl: '',
      homepageUrl: '',
      date: firebase.firestore.Timestamp.now(),
      commentsCounter: 0,
      likes: 0
    };
    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleAddPost() {
    const { title, content, avatarUrl, imageUrl, linkUrl, homepageUrl, date, commentsCounter } = this.state;
    let post = { title, content, avatarUrl, imageUrl, linkUrl, homepageUrl, date, commentsCounter };

    const blog = firebase.firestore().collection('blog');
    blog.add(post).then((postRef) => {
      delete post.commentsCounter;
      delete post.likes;
      post.date = post.date.toDate().getTime();
      post.objectID = postRef.id;
      
      AlgoliaUpdateSearchIndex(post);
    });

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {/* <Typography variant="body1" className={classes.userName}>
          Hello admin!
        </Typography> */}
        <Button className={classes.button} aria-label="Add post" onClick={this.handleClickOpen}>
          <i className="material-icons">
            library_add
          </i>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Article:</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="title"
              type="string"
              fullWidth
              onChange={event => this.setState({ title: event.target.value })}
            />
            <TextField
              margin="dense"
              id="name"
              label="content"
              type="string"
              fullWidth
              onChange={event => this.setState({ content: event.target.value })}
            />
            <TextField
              margin="dense"
              id="name"
              label="avatarUrl"
              type="url"
              fullWidth
              onChange={event => this.setState({ avatarUrl: event.target.value })}
            />
            <TextField
              margin="dense"
              id="name"
              label="imageUrl"
              type="url"
              fullWidth
              onChange={event => this.setState({ imageUrl: event.target.value })}
            />
            <TextField
              margin="dense"
              id="name"
              label="linkUrl"
              type="url"
              fullWidth
              onChange={event => this.setState({ linkUrl: event.target.value })}
            />
            <TextField
              margin="dense"
              id="name"
              label="homepageUrl"
              type="url"
              fullWidth
              onChange={event => this.setState({ homepageUrl: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddPost} color="primary">
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AdminTools.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTools);
