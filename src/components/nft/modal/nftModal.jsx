import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { DialogContent, Dialog, IconButton, Zoom, Typography, Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
	contentBox: {
		width: '370px',
		background: colors.darkGray3,
		backdropFilter: 'blur(10px)',
		borderRadius: '8px',
		padding: '16px',
	},
	contentItemRow: {
		display: 'flex',
		alignItems: 'center',
		padding: '8px 0',
	},
	greyText: {
		color: colors.greyText,
	},
	infoIcon: {
		color: colors.greyText,
		marginLeft: theme.spacing(1),
	},
	emptyText: {
		color: colors.lightRed1,
	},
	button: {
		width: '163px',
		height: '43px',
		color: colors.white,
		background: colors.lightGray,
		padding: 0,
		'&:hover': {
			backgroundColor: colors.lightGray,
			opacity: 0.7,
		},
		'&:disabled': {
			backgroundColor: colors.lightGray,
			opacity: 0.5,
			color: colors.white,
		},
	},
});

class NftModal extends Component {
	constructor() {
		super();

		this.state = {
			filled: false,
		};
	}

	render() {
		const { classes, closeModal, modalOpen, nftIndex } = this.props;
		const { filled } = this.state;

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
								<div className={classes.contentBox}>
									<div className={classes.contentItemRow} style={{ justifyContent: 'space-between' }}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<Typography className={classes.greyText}>NFT Value</Typography>
											<InfoOutlinedIcon className={classes.infoIcon} />
										</div>
										<Typography>1 YFL</Typography>
									</div>

									<div className={classes.contentItemRow}>
										{filled ? (
											<>
												<CheckCircleIcon style={{ marginRight: '10px' }} />
												<Typography variant="h3">Filled</Typography>
											</>
										) : (
											<Typography variant="h3" className={classes.emptyText}>
												Empty
											</Typography>
										)}
									</div>

									<div className={classes.contentItemRow} style={{ justifyContent: 'space-between' }}>
										<Button className={classes.button} disabled={filled}>
											<Typography>Refill</Typography>
										</Button>
										<Button className={classes.button} disabled={!filled}>
											<Typography>Stake NFT Value</Typography>
										</Button>
									</div>

									<div className={classes.contentItemRow}>
										<Typography className={classes.greyText}>Wallet:</Typography>
										&nbsp;
										<Typography>203.46 YFL</Typography>
									</div>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
}
export default withRouter(withStyles(styles)(NftModal));
