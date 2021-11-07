import React from 'react';
import { AbsoluteFill, Img } from 'remotion';

type CssBackgroundProps = {
    style: React.CSSProperties;
};

export const CSSBackground: React.FC<CssBackgroundProps> = ({ style, children }) => (
    <AbsoluteFill style={{ zIndex: 0, height: '100%', width: '100%', background: 'linear-gradient(to right, #b149ff 0%, #00ffff 100%)', ...style }}>{children}</AbsoluteFill>
);
