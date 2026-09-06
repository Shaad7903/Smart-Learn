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
    const overlap = 2;
    const totalWidth = gapWidth + 2 * overlap;
    const centerX = totalWidth / 2;

    const curveHeight = 10;
    const waistHeight = 10;
    const bridgeHeight = 6 * curveHeight + waistHeight;

    const renderBridge = (topOffset: number, bridgeKey: string) => {
        const pathDataLeft = `M 0 ${topOffset} ` +
            `C 0 ${topOffset + curveHeight * 0.55}, ${centerX * 0.45} ${topOffset + curveHeight}, ${centerX} ${topOffset + curveHeight} ` +
            `L ${centerX} ${topOffset + curveHeight + waistHeight} ` +
            `C ${centerX * 0.45} ${topOffset + curveHeight + waistHeight}, 0 ${topOffset + curveHeight + waistHeight + curveHeight * 0.45}, 0 ${topOffset + bridgeHeight} Z`;

        const pathDataRight = `M ${totalWidth} ${topOffset} ` +
            `C ${totalWidth} ${topOffset + curveHeight * 0.55}, ${totalWidth - centerX * 0.45} ${topOffset + curveHeight}, ${centerX} ${topOffset + curveHeight} ` +
            `L ${centerX} ${topOffset + curveHeight + waistHeight} ` +
            `C ${totalWidth - centerX * 0.45} ${topOffset + curveHeight + waistHeight}, ${totalWidth} ${topOffset + curveHeight + waistHeight + curveHeight * 0.45}, ${totalWidth} ${topOffset + bridgeHeight} Z`;

        return (
            <React.Fragment key={bridgeKey}>
                <Path d={pathDataLeft} fill={leftColor} />
                <Path d={pathDataRight} fill={rightColor} />
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
                width={totalWidth}
                height={height}
                viewBox={`0 0 ${totalWidth} ${height}`}
                style={{
                    marginLeft: -overlap,
                    marginRight: -overlap,
                }}
            >
                {renderBridge(topBridgeY, 'top-bridge')}
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
