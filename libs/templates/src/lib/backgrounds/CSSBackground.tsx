import React from 'react';
import { AbsoluteFill, Img } from 'remotion';

type CSSBackgroundProps = {
    style: React.CSSProperties;
};

export const CSSBackground: React.FC<CSSBackgroundProps> = ({ style, children }) => (
    <AbsoluteFill style={{ zIndex: 0, height: '100%', width: '100%', ...style }}>{children}</AbsoluteFill>
);
