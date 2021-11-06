import React from 'react';
import { AbsoluteFill, Img } from 'remotion';
import '../fonts.css';

const fontFamily = 'Inter';

const titleStyle: React.CSSProperties = {
    fontSize: '8.5em',
    marginTop: 0,
    fontWeight: 700,
    marginBottom: 0,
    zIndex: 10,
};

const gradientText: React.CSSProperties = {
    background: 'linear-gradient(to right, white, #9146ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily,
};

const PreviewCard: React.FC<{
    title: string;
    img: string;
}> = ({ title, img }) => {
    return (
        <>
            <AbsoluteFill>
                <Img src={img} />
            </AbsoluteFill>
            <div style={titleStyle}>
                <span style={gradientText}>{title}</span>
            </div>
        </>
    );
};

export default PreviewCard;
