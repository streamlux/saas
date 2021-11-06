import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import '../fonts.css';

const colorStyle: React.CSSProperties = {
	height: '100%',
	width: '100%',
	background: 'linear-gradient(to right, #b149ff 0%, #00ffff 100%)',
};

const PreviewCard: React.FC<{
	text?: string;
	backgroundColor?: string;
	backgroundUrl?: string;
	thumbnailUrl: string;
}> = ({backgroundColor, backgroundUrl, thumbnailUrl, text}) => {
	return (
		<>
			{backgroundUrl && (
				<AbsoluteFill>
					<Img src={backgroundUrl} />
				</AbsoluteFill>
			)}
			{backgroundColor && !backgroundUrl && (
				<AbsoluteFill>
					<div
						style={{
							...colorStyle,
						}}
					/>
				</AbsoluteFill>
			)}
			<div>
				<div
					style={{
						fontFamily: 'Inter',
						background: 'red',
						borderRadius: '5px',
						color: 'white',
						width: 'min-content',
						padding: '2px 6px 2px 5px',
						position: 'absolute',
						bottom: '210px',
						right: '350px',
						zIndex: 12,
					}}
				>
					LIVE
				</div>

				<Img
					src={thumbnailUrl}
					style={{
						zIndex: 10,
						height: 240,
						position: 'absolute',
						bottom: 0,
						right: 0,
						margin: 16,
						border: '12px solid rgb(145, 71, 255)',
					}}
				/>
			</div>
			{text && (
				<div style={{zIndex: 100, fontFamily: 'Inter'}}>
					<h1 style={{color: 'white', fontFamily: 'Inter'}}>{text}</h1>
				</div>
			)}
		</>
	);
};

export default PreviewCard;
