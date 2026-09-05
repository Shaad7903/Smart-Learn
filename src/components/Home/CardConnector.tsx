import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface CardConnectorProps {
    leftColor: string;
    rightColor: string;
    height?: number;
    gapWidth?: number;
    topBridgeY?: number;
    bottomBridgeY?: number;
    style?: StyleProp<ViewStyle>;
}

export const CardConnector: React.FC<CardConnectorProps> = ({
    leftColor,
    rightColor,
    height = 380,
    gapWidth = 10,
    topBridgeY = 70,
    bottomBridgeY = 312,
    style,
}) => {
    // Total SVG width includes a 2px overlap on left & right to ensure zero subpixel gap
    const overlap = 2;
    const totalW = gapWidth + 2 * overlap; // e.g. 18
    const cx = totalW / 2; // e.g. 9

    const curveH = 8;
    const waistH = 7;
    const bridgeH = 2 * curveH + waistH; // 23

    const renderBridge = (topY: number, key: string) => {
        // Left wing curves from card edge (x=0) inwards to center waist (x=cx)
        const dLeft = `M 0 ${topY} ` +
            `C 0 ${topY + curveH * 0.55}, ${cx * 0.45} ${topY + curveH}, ${cx} ${topY + curveH} ` +
            `L ${cx} ${topY + curveH + waistH} ` +
            `C ${cx * 0.45} ${topY + curveH + waistH}, 0 ${topY + curveH + waistH + curveH * 0.45}, 0 ${topY + bridgeH} Z`;

        // Right wing curves from card edge (x=totalW) inwards to center waist (x=cx)
        const dRight = `M ${totalW} ${topY} ` +
            `C ${totalW} ${topY + curveH * 0.55}, ${totalW - cx * 0.45} ${topY + curveH}, ${cx} ${topY + curveH} ` +
            `L ${cx} ${topY + curveH + waistH} ` +
            `C ${totalW - cx * 0.45} ${topY + curveH + waistH}, ${totalW} ${topY + curveH + waistH + curveH * 0.45}, ${totalW} ${topY + bridgeH} Z`;

        return (
            <React.Fragment key={key}>
                <Path d={dLeft} fill={leftColor} />
                <Path d={dRight} fill={rightColor} />
            </React.Fragment>
        );
    };

    return (
        <View
            style={[
                styles.container,
                {
                    width: gapWidth,
                    height,
                },
                style,
            ]}
            pointerEvents="none"
        >
            <Svg
                width={totalW}
                height={height}
                viewBox={`0 0 ${totalW} ${height}`}
                style={{
                    marginLeft: -overlap,
                    marginRight: -overlap,
                }}
            >
                {/* Top Bridge (adjacent to top badges) */}
                {renderBridge(topBridgeY, 'top-bridge')}

                {/* Bottom Bridge (level with Start Learning button) */}
                {renderBridge(bottomBridgeY, 'bottom-bridge')}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 5,
        overflow: 'visible',
    },
});

export default CardConnector;
