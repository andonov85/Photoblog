import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { uploadComment } from './uploadSource';

const styles = theme => ({
	avatar: {
		margin: 10,
	},
	button: {
		margin: theme.spacing.unit,
	}
});

class WriteComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentField: ''
		};
		this.publishComment = this.publishComment.bind(this);
	}

	publishComment() {
		const { user, postId } = this.props;
		const { commentField } = this.state;
		if (commentField === '') {
			return;
		}
		let comment = {
			userId: user.googleId,
			userName: user.name,
			postId: postId,
			content: commentField,
			date: firebase.firestore.Timestamp.now(),
			imageUrl: user.imageUrl,
			subcomments: []
		};
		this.setState({
			commentField: ''
		});
		uploadComment(comment);
	}

	render() {
		const { classes, user } = this.props;
		return (
			<div>
				<Avatar alt={user.name} src={user.imageUrl} className={classes.avatar} />
				<Typography>
					{user.name}
				</Typography>
				<TextField
					id="outlined-multiline-static"
					label="Write a comment:"
					fullWidth={true}
					multiline
					rows="4"
					className={classes.textField}
					margin="normal"
					variant="outlined"
					value={this.state.commentField}
					onChange={event => this.setState({ commentField: event.target.value })}
				/>
				<Button variant="outlined" color="primary" className={classes.button} onClick={this.publishComment}>
					Publish
        </Button>
			</div>
		);
	}
}

WriteComment.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WriteComment);
