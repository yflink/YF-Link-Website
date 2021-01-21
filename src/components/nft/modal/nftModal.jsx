import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { DialogContent, Dialog, IconButton, Zoom, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { colors } from '../../../theme';
import NftImg from '../../../assets/nft_template.png';

function Transition(props) {
	return <Zoom {...props} />;
}

const styles = theme => ({
	container: {
		background: colors.transGrayBackground0,
		backdropFilter: 'blur(10px)',
	},
	paper: {
		boxShadow: 'none',
	},
	root: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		background: colors.darkBackground,
		minWidth: '100%',
		minHeight: '100%',
		overflow: 'hidden',
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: '0px',
		'&:first-child': {
			paddingTop: '0px',
		},
	},
	paperWidthSm: {
		maxWidth: '850px',
	},
	closeButton: {
		position: 'absolute',
		right: '24px',
		top: '24px',
	},
	modalContainer: {
		padding: '25px 94px',
		color: colors.white,
		width: '850px',
	},
	modalHeader: {
		display: 'flex',
		alignItems: 'center',
	},
	nftIndex: {
		padding: '6px 16px',
		background: colors.darkGray1,
		borderRadius: '8px',
		color: colors.white,
		marginRight: '12px',
	},
	modalContent: {
		display: 'flex',
		marginTop: '24px',
	},
	nftImg: {
		width: '380px',
		height: 'auto',
		marginRight: '20px',
	},
});

class NftModal extends Component {
	render() {
		const { classes, closeModal, modalOpen, nftIndex } = this.props;

		const fullScreen = window.innerWidth < 768;

		return (
			<Dialog
				classes={{
					container: classes.container,
					paper: classes.paper,
					paperWidthSm: classes.paperWidthSm,
				}}
				open={modalOpen}
				onClose={closeModal}
				fullWidth={true}
				maxWidth={'sm'}
				TransitionComponent={Transition}
				fullScreen={fullScreen}
			>
				<DialogContent classes={{ root: classes.root }}>
					<IconButton aria-label="close" className={classes.closeButton} onClick={closeModal}>
						<CloseIcon style={{ color: colors.white, width: '32px', height: '32px' }} />
					</IconButton>
					<div className={classes.modalContainer}>
						<div className={classes.modalHeader}>
							<Typography variant="h1" className={classes.nftIndex}>
								#{nftIndex + 1}
							</Typography>
							<Typography variant="h1">Lorem Ipsum</Typography>
						</div>

						<div className={classes.modalContent}>
							<img className={classes.nftImg} src={NftImg} alt="nft" />
							<div>
								<Typography variant="h3">Winner</Typography>
								<Typography style={{ marginTop: '16px' }}>0x817bb...3db35</Typography>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
}
export default withRouter(withStyles(styles)(NftModal));
