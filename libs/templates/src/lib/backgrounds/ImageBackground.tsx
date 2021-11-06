import React from 'react';
import { AbsoluteFill, Img } from 'remotion';

type ImageBackgroundProps = {
    src: string;
};

export const ImageBackground: React.FC<ImageBackgroundProps> = ({ src }) => (
    <AbsoluteFill style={{ zIndex: 0 }}>
        <Img src={src} />
    </AbsoluteFill>
);
