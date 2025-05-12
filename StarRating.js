import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import StarButton from './StarButton';

type AnimationType = 
  | 'bounce' 
  | 'flash' 
  | 'jello' 
  | 'pulse' 
  | 'rotate' 
  | 'rubberBand' 
  | 'shake' 
  | 'swing' 
  | 'tada' 
  | 'wobble';

interface StarRatingProps {
  activeOpacity?: number;
  animation?: AnimationType;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  emptyStar?: string | object | number;
  emptyStarColor?: string;
  fullStar?: string | object | number;
  fullStarColor?: string;
  halfStar?: string | object | number;
  halfStarColor?: string;
  halfStarEnabled?: boolean;
  icoMoonJson?: object;
  iconSet?: string;
  maxStars?: number;
  rating?: number;
  reversed?: boolean;
  starSize?: number;
  starStyle?: TextStyle;
  selectedStar?: (rating: number) => void;
}

const defaultProps: Partial<StarRatingProps> = {
  activeOpacity: 0.2,
  animation: undefined,
  buttonStyle: {},
  containerStyle: {},
  disabled: false,
  emptyStar: 'star-o',
  emptyStarColor: 'gray',
  fullStar: 'star',
  fullStarColor: 'black',
  halfStar: 'star-half-o',
  halfStarEnabled: false,
  iconSet: 'FontAwesome',
  maxStars: 5,
  rating: 0,
  reversed: false,
  starSize: 40,
  starStyle: {},
  selectedStar: () => {},
};

class StarRating extends Component<StarRatingProps> {
  private starRef: AnimatableView[] = [];

  constructor(props: StarRatingProps) {
    super(props);
    this.onStarButtonPress = this.onStarButtonPress.bind(this);
  }

  onStarButtonPress(rating: number) {
    this.props.selectedStar?.(rating);
  }

  render() {
    const {
      activeOpacity,
      animation,
      buttonStyle,
      containerStyle,
      disabled,
      emptyStar,
      emptyStarColor,
      fullStar,
      fullStarColor,
      halfStar,
      halfStarColor,
      halfStarEnabled,
      icoMoonJson,
      iconSet,
      maxStars = 5,
      rating = 0,
      reversed,
      starSize,
      starStyle,
    } = this.props;

    const newContainerStyle: ViewStyle = {
      flexDirection: reversed ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      ...StyleSheet.flatten(containerStyle),
    };

    // Round rating down to nearest .5 star
    let starsLeft = Math.round((rating || 0) * 2) / 2;
    const starButtons = [];

    for (let i = 0; i < maxStars; i++) {
      let starIconName = emptyStar;
      let finalStarColor = emptyStarColor;

      if (starsLeft >= 1) {
        starIconName = fullStar;
        finalStarColor = fullStarColor;
      } else if (starsLeft === 0.5) {
        starIconName = halfStar;
        finalStarColor = halfStarColor || fullStarColor;
      }

      const starButtonElement = (
        <AnimatableView
          key={i}
          ref={(node: any) => { this.starRef.push(node); }}
        >
          <StarButton
            activeOpacity={activeOpacity}
            buttonStyle={buttonStyle}
            disabled={disabled}
            halfStarEnabled={halfStarEnabled}
            icoMoonJson={icoMoonJson}
            iconSet={iconSet}
            onStarButtonPress={(event: number) => {
              if (animation) {
                for (let s = 0; s <= i; s++) {
                  this.starRef[s]?.[animation]?.(1000 + (s * 200));
                }
              }
              this.onStarButtonPress(event);
            }}
            rating={i + 1}
            reversed={reversed}
            starColor={finalStarColor}
            starIconName={starIconName}
            starSize={starSize}
            starStyle={starStyle}
          />
        </AnimatableView>
      );

      starButtons.push(starButtonElement);
      starsLeft -= 1;
    }

    return (
      <View style={newContainerStyle} pointerEvents={disabled ? 'none' : 'auto'}>
        {starButtons}
      </View>
    );
  }
}

StarRating.defaultProps = defaultProps;

export default StarRating;
