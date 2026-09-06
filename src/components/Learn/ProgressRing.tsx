import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Text from '../Text';
import { ProgressRingProps } from '../../types';

export const ProgressRing: React.FC<ProgressRingProps> = ({
    percentage,
    size = 64,
    strokeWidth = 5.4,
    color = '#70A325',
    trackColor = '#686F3E33',
}) => {
    const trackRadius = size * 0.355;
    const innerRadius = trackRadius - strokeWidth / 2 + 0.3;
    const circumference = 2 * Math.PI * trackRadius;
    const progressFraction = Math.max(percentage / 100, 0.22);
    const strokeLength = circumference * progressFraction;

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                },
            ]}
        >
            <Svg width={size} height={size} style={styles.svgOverlay}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 0.5}
                    fill="#FFFFFF80"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={trackRadius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={trackRadius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${strokeLength} ${circumference}`}
                    strokeLinecap="round"
                    fill="none"
                    rotation="128"
                    origin={`${size / 2}, ${size / 2}`}
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={innerRadius}
                    fill="#FFFFFF"
                />
            </Svg>
            <Text weight="medium" style={styles.progressPercentageText}>
                {percentage}%
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    svgOverlay: {
        position: 'absolute',
    },
    progressPercentageText: {
        fontSize: 12,
        color: '#161A34',
        letterSpacing: -0.4,
    },
});

export default ProgressRing;
