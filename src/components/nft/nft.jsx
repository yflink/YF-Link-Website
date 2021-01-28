import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField } from '@material-ui/core';
import { colors } from '../../theme';
import HeaderLogo from '../header/logo/logo';
import NftImg from '../../assets/nft_template.png';
import NftModal from './modal/nftModal';

const styles = theme => ({
	root: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		background: `linear-gradient(0deg, ${colors.greyBackground}, ${colors.greyBackground})`,
		minWidth: '100vw',
		overflow: 'hidden',
		position: 'relative',
	},
	rightMainSection: {
		zIndex: '1',
		position: 'absolute',
		top: '-30%',
		left: '300px',
		width: '100%',
		height: '200%',
		transform: `skew(-0.03turn, 15deg)`,
		background: 'rgba(0, 0, 0, 0.2)',
		'@media (max-width: 768px)': {
			display: 'none',
		},
	},
	leftMarkSection: {
		zIndex: '1',
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		top: '15%',
		left: '-100px',
		width: '470px',
		height: '560px',
		'@media (max-width: 768px)': {
			display: 'none',
		},
	},
	topMainSection: {
		zIndex: '1',
		position: 'absolute',
		top: '-25%',
		left: '-30%',
		width: '300%',
		height: '100%',
		transform: `rotate(12deg)`,
		background: 'rgba(0, 0, 0, 0.2)',
		'@media (min-width: 768px)': {
			display: 'none',
		},
	},
	bottomMarkSection: {
		zIndex: '1',
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		top: '68%',
		left: '-20px',
		width: '200px',
		height: '230px',

		'@media (min-width: 768px)': {
			display: 'none',
		},
	},
	headerContainer: {
		top: '0',
		padding: '30px',
		zIndex: '2',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		'@media (max-width: 768px)': {
			padding: '16px',
			height: '68px',
		},
	},
	logoContainer: {
		zIndex: '2',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flex: 1,
		minWidth: '400px',
	},
	mainBodySection: {
		zIndex: '3',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '36px 24px',
		color: colors.white,
	},
	searchWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: colors.transGrayBackground0,
		backdropFilter: 'blur(10px)',
		borderRadius: '8px',
		padding: '40px 10px',
		marginTop: '36px',
	},
	input: {
		background: colors.transGrayBackground0,
		backdropFilter: 'blur(10px)',
		borderRadius: '3px',
		padding: '12px 16px',
		'& input': {
			color: colors.white,
			padding: '0',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '210px',
		},
	},
	button: {
		height: '43px',
		color: colors.white,
		borderColor: `white !important`,
		background: 'transparent',
		marginLeft: '12px',
	},
	itemWrapper: {
		width: '100%',
		marginTop: '60px',
	},
	itemHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
	tabs: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			marginBottom: '10px',
		},
	},
	tabItem: {
		height: '43px',
		color: colors.white,
		background: 'transparent',
		marginRight: theme.spacing(1),
		borderBottom: '1px solid transparent',
		borderRadius: 0,
	},
	tabItemActive: {
		borderBottom: '1px solid white',
	},
	itemContent: {
		marginTop: '20px',
		display: 'grid',
		gridGap: theme.spacing(1),
		gridTemplateColumns: `repeat(auto-fit, minmax(216px, 1fr))`,
	},
	nftItem: {
		width: '216px',
		height: '323px',
		background: colors.darkBackground,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		cursor: 'pointer',
	},
	nftIndex: {
		width: '40px',
		margin: '6px',
		padding: '6px',
		background: colors.darkGray1,
		borderRadius: '8px',
		textAlign: 'right',
		color: colors.purpleText,
	},
	nftSearchWrapper: {
		display: 'flex',
		marginTop: '20px',
	},
	nftBuyButton: {
		height: '43px',
		color: colors.white,
		background: colors.brandBlue,
		marginTop: '24px',
		'&:hover': {
			backgroundColor: colors.brandBlue,
			opacity: 0.7,
		},
	},
});

class Nft extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabIndex: 0,
			searchName: '',
			showSearch: false,
			showModal: false,
			nftDetailIndex: 0,
		};
	}

	handleTabChange = index => {
		this.setState({
			tabIndex: index,
		});
	};

	handleSearchByName = () => {
		const { searchName } = this.state;
		this.setState({ showSearch: searchName && searchName.length > 0 });
	};

	renderHeader = () => {
		const { classes } = this.props;
		return (
			<div className={classes.headerContainer}>
				<div className={classes.logoContainer}>
					<HeaderLogo />
				</div>
			</div>
		);
	};

	renderBackground = screenType => {
		const { classes } = this.props;

		if (screenType === 'DESKTOP') {
			return (
				<>
					<div className={classes.rightMainSection} />
					<div className={classes.leftMarkSection}>
						<img alt="up" src={require('../../assets/yfl-up.svg')} height="200px" />
						<img alt="down" src={require('../../assets/yfl-down.svg')} height="200px" />
					</div>
				</>
			);
		} else if (screenType === 'MOBILE') {
			return (
				<>
					<div className={classes.topMainSection} />
					<div className={classes.bottomMarkSection}>
						<img alt="up" src={require('../../assets/yfl-up.svg')} height="112px" />
						<img alt="down" src={require('../../assets/yfl-down.svg')} height="112px" />
					</div>
				</>
			);
		}
	};

	renderNftItem = idx => {
		const { classes } = this.props;
		return (
			<div
				className={classes.nftItem}
				key={idx}
				style={{ backgroundImage: `url(${NftImg})` }}
				onClick={() => {
					this.setState({ nftDetailIndex: idx, showModal: true });
				}}
			>
				<div className={classes.nftIndex}>
					<Typography>#{idx + 1}</Typography>
				</div>
			</div>
		);
	};

	renderSearchView = () => {
		const { classes } = this.props;
		const { searchName, showSearch } = this.state;

		return (
			<div className={classes.searchWrapper}>
				<Typography variant={'h3'}>Mint / Buy</Typography>
				<div style={{ marginTop: '30px' }}>
					<TextField
						className={classes.input}
						placeholder="Enter token ID"
						style={{ width: '400px' }}
						value={searchName}
						onChange={e => this.setState({ searchName: e.target.value })}
						onKeyPress={e => e.key === 'Enter' && this.handleSearchByName()}
					/>
					<Button className={classes.button} variant="outlined" color="primary" onClick={this.handleSearchByName}>
						<Typography>Preview</Typography>
					</Button>
				</div>
				{showSearch && (
					<div className={classes.nftSearchWrapper}>
						{this.renderNftItem(1)}
						<div style={{ marginLeft: '36px' }}>
							<Typography variant={'h3'} style={{ fontWeight: 'bold' }}>
								Lorem Ipsum
							</Typography>
							<Button variant="contained" className={classes.nftBuyButton}>
								<Typography>Buy NFT</Typography>
							</Button>
						</div>
					</div>
				)}
			</div>
		);
	};

	renderNftItemView = () => {
		const { classes } = this.props;
		const { tabIndex } = this.state;

		return (
			<div className={classes.itemWrapper}>
				<div className={classes.itemHeader}>
					<div className={classes.tabs}>
						<Button
							className={clsx(classes.tabItem, { [classes.tabItemActive]: tabIndex === 0 })}
							onClick={() => this.handleTabChange(0)}
						>
							<Typography>YFL</Typography>
						</Button>
						<Button
							className={clsx(classes.tabItem, { [classes.tabItemActive]: tabIndex === 1 })}
							onClick={() => this.handleTabChange(1)}
						>
							<Typography>LINKSMAS</Typography>
						</Button>
						<Button
							className={clsx(classes.tabItem, { [classes.tabItemActive]: tabIndex === 2 })}
							onClick={() => this.handleTabChange(2)}
						>
							<Typography>MY NFTs</Typography>
						</Button>
					</div>

					<TextField className={classes.input} placeholder="Search" style={{ width: '500px' }} />
				</div>

				<div className={classes.itemContent}>
					{Array(20)
						.fill(0)
						.map((_, idx) => this.renderNftItem(idx))}
				</div>
			</div>
		);
	};

	renderNftModal = () => {
		const { showModal, nftDetailIndex } = this.state;
		return (
			<NftModal
				closeModal={() => this.setState({ showModal: false })}
				modalOpen={showModal}
				nftIndex={nftDetailIndex}
				onPrev={() => {
					this.setState({ nftDetailIndex: nftDetailIndex - 1 });
				}}
				onNext={() => {
					this.setState({ nftDetailIndex: nftDetailIndex + 1 });
				}}
			/>
		);
	};

	render = () => {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.renderBackground('DESKTOP')}
				{this.renderBackground('MOBILE')}
				{this.renderHeader()}

				<div className={classes.mainBodySection}>
					<Typography variant={'h1'}>NFTs</Typography>
					{this.renderSearchView()}
					{this.renderNftItemView()}
				</div>

				{this.renderNftModal()}
			</div>
		);
	};
}

export default withRouter(withStyles(styles)(Nft));
