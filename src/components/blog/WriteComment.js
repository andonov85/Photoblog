import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { uploadComment } from './uploadSource';

const styles = theme => ({
	avatar: {
		margin: 10,
	},
	card: {
		// borderRadius: 'unset',
		boxShadow: 'none',
	},
	header: {
		padding: '0px 0px -5px 0px'
	},
	button: {
		margin: theme.spacing.unit,
	},
	textField: {
		marginTop: -5
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
			postId: postId,
			userId: user.googleId,
			userName: user.name,
			content: commentField,
			date: firebase.firestore.Timestamp.now(),
			imageUrl: user.imageUrl,
		};
		this.setState({
			commentField: ''
		});
		uploadComment('comments', comment);
	}

	render() {
		const { classes, user } = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<CardHeader
						className={classes.header}
						avatar={
							<Avatar alt={user.name} src={user.imageUrl} className={classes.avatar} />
						}
						title={user.name}
					/>
				</Card>
				<TextField
					className={classes.textField}
					id="outlined-multiline-static"
					label="Write a comment:"
					fullWidth={true}
					multiline
					rows="4"
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
