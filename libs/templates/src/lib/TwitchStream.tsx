import React from 'react';
import { AbsoluteFill, Img } from 'remotion';
import { ImageBackground } from './backgrounds/ImageBackground';
import { CSSBackground } from './backgrounds/CSSBackground';
import './fonts.module.css';

const colorStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to right, #b149ff 0%, #00ffff 100%)',
};

export const PreviewCard: React.FC<{
    text?: string;
    backgroundColor?: string;
    backgroundUrl?: string;
    thumbnailUrl: string;
}> = ({ backgroundColor, backgroundUrl, thumbnailUrl, text }) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {backgroundUrl && <ImageBackground src={backgroundUrl} />}
            {backgroundColor && !backgroundUrl && <CSSBackground style={colorStyle} />}
            <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}>
                <div
                    style={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        zIndex: 10,
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '33%',
                            margin: 16,
                            zIndex: 10,
                            background: 'rgb(145, 71, 255)',
                            border: '0.5rem solid rgb(145, 71, 255)',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'Inter',
                                background: 'red',
                                borderRadius: '5px',
                                color: 'white',
                                width: 'min-content',
                                height: 'min-content',
                                padding: '2px 6px 2px 5px',
                                position: 'absolute',
                                margin: '8px',
                                zIndex: 120,
                            }}
                        >
                            LIVE
                        </div>
                        <Img
                            src={thumbnailUrl}
                            style={{
                                zIndex: 10,
                            }}
                        />
                    </div>
                </div>
            </div>
            {text && (
                <div style={{ zIndex: 100, fontFamily: 'Inter' }}>
                    <h1 style={{ color: 'white', fontFamily: 'Inter' }}>{text}</h1>
                </div>
            )}
        </div>
    );
};
