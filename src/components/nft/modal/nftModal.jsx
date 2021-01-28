import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { DialogContent, Dialog, IconButton, Zoom, Typography, Button, TextField, Divider } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

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
		overflow: 'visible',
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
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
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
		width: '12px',
		height: '12px',
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
	input: {
		background: colors.transGrayBackground0,
		borderRadius: '3px',
		padding: '12px',
		'& input': {
			color: colors.white,
			padding: '0',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '210px',
		},
	},
	divider: {
		width: 'calc(100% + 32px)',
		transform: 'translateX(-16px)',
		height: '2px',
		background: colors.transGrayBackground0,
		margin: '16px 0',
	},
	sellButton: {
		width: '100%',
		height: '43px',
		color: colors.white,
		background: colors.brandBlue,
		padding: 0,
		'&:hover': {
			backgroundColor: colors.brandBlue,
			opacity: 0.7,
		},
		'&:disabled': {
			backgroundColor: colors.brandBlue,
			opacity: 0.5,
			color: colors.white,
		},
	},
	arrowButton: {
		position: 'absolute',
		top: '50%',
		padding: 0,
		color: colors.white,
		background: 'transparent',
		width: '43px',
		minWidth: '43px',
		height: '43px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '2px solid white',
		boxSizing: 'border-box',
		borderRadius: '3px',
		'&:hover': {
			background: 'transparent',
		},
	},
	prevButton: {
		left: '-80px',
	},
	nextButton: {
		right: '-80px',
	},
});

class NftModal extends Component {
	constructor() {
		super();

		this.state = {
			filled: false,
			price: '',
			recipient: '',
		};
	}

	renderFillPanel() {
		const { classes } = this.props;
		const { filled } = this.state;

		return (
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
					<Button className={classes.button} disabled={filled} onClick={() => this.setState({ filled: true })}>
						<Typography>Refill</Typography>
					</Button>
					<Button className={classes.button} disabled={!filled} onClick={() => this.setState({ filled: false })}>
						<Typography>Stake NFT Value</Typography>
					</Button>
				</div>

				<div className={classes.contentItemRow}>
					<Typography className={classes.greyText}>Wallet:</Typography>
					&nbsp;
					<Typography>203.46 YFL</Typography>
				</div>
			</div>
		);
	}

	renderSellPanel() {
		const { classes } = this.props;
		const { price, recipient } = this.state;

		return (
			<div className={classes.contentBox}>
				<div className={classes.contentItemRow}>
					<Typography variant="h3" style={{ fontWeight: 'bold' }}>
						Offer to Sell
					</Typography>
				</div>

				<div style={{ padding: '8px 0' }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Typography>Sell Price</Typography>
						<InfoOutlinedIcon className={classes.infoIcon} />
					</div>
					<div style={{ display: 'flex', alignItems: 'center', marginTop: '11px' }}>
						<TextField
							className={classes.input}
							placeholder="Set price"
							style={{ width: '100px' }}
							onChange={e => this.setState({ price: e.target.value })}
							inputProps={{ style: { textAlign: 'right' } }}
						/>
						<Typography style={{ marginLeft: '12px' }}>YFL</Typography>
					</div>
				</div>

				<div className={classes.contentItemRow}>
					<TextField
						className={classes.input}
						placeholder="Add Recipient"
						style={{ width: '100%' }}
						onChange={e => this.setState({ recipient: e.target.value })}
					/>
				</div>

				<Divider className={classes.divider} />

				<div className={classes.contentItemRow}>
					<Button className={classes.sellButton} disabled={!price || !price.length || !recipient || !recipient.length}>
						<Typography>Sell NFT</Typography>
					</Button>
				</div>
			</div>
		);
	}

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
								{this.renderFillPanel()}
								{this.renderSellPanel()}
							</div>
						</div>
					</div>
				</DialogContent>

				{nftIndex > 0 && (
					<Button className={clsx(classes.arrowButton, classes.prevButton)} onClick={this.props.onPrev}>
						<KeyboardArrowLeftIcon />
					</Button>
				)}

				{nftIndex < 20 - 1 && (
					<Button className={clsx(classes.arrowButton, classes.nextButton)} onClick={this.props.onNext}>
						<KeyboardArrowRightIcon />
					</Button>
				)}
			</Dialog>
		);
	}
}
export default withRouter(withStyles(styles)(NftModal));
