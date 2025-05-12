import React, { Component } from 'react';
import { Image, StyleSheet, ViewStyle, TextStyle, ImageStyle, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import Button from 'react-native-button';

// Import all icon sets
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIconsIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIconsIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import ZocialIcons from 'react-native-vector-icons/Zocial';
import SimpleLineIconsIcons from 'react-native-vector-icons/SimpleLineIcons';

type IconSet = 
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'Zocial'
  | 'SimpleLineIcons';

type StarIconName = string | number | { uri: string };

interface StarButtonProps {
  buttonStyle?: ViewStyle;
  disabled: boolean;
  halfStarEnabled: boolean;
  icoMoonJson?: any;
  iconSet: IconSet;
  rating: number;
  reversed: boolean;
  starColor: string;
  starIconName: StarIconName;
  starSize: number;
  activeOpacity: number;
  starStyle?: TextStyle | ImageStyle;
  onStarButtonPress: (rating: number) => void;
}

const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  Feather: FeatherIcons,
  FontAwesome: FontAwesomeIcons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  MaterialCommunityIcons: MaterialCommunityIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons,
  SimpleLineIcons: SimpleLineIconsIcons,
};

class StarButton extends Component<StarButtonProps> {
  static defaultProps = {
    buttonStyle: {},
    icoMoonJson: undefined,
    starStyle: {},
  };

  private onButtonPress = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const {
      halfStarEnabled,
      starSize,
      rating,
      onStarButtonPress,
    } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  };

  private iconSetFromProps = () => {
    const { icoMoonJson, iconSet } = this.props;
    if (icoMoonJson) {
      return createIconSetFromIcoMoon(icoMoonJson);
    }
    return iconSets[iconSet];
  };

  private renderIcon = () => {
    const {
      reversed,
      starColor,
      starIconName,
      starSize,
      starStyle,
    } = this.props;

    const Icon = this.iconSetFromProps();
    const newStarStyle = {
      transform: [{ scaleX: reversed ? -1 : 1 }],
      ...StyleSheet.flatten(starStyle),
    };

    if (typeof starIconName === 'string' || typeof starIconName === 'number') {
      return (
        <Icon
          name={starIconName as string}
          size={starSize}
          color={starColor}
          style={newStarStyle as TextStyle}
        />
      );
    } else {
      const imageStyle: ImageStyle = {
        width: starSize,
        height: starSize,
        resizeMode: 'contain',
      };

      return (
        <Image
          source={starIconName}
          style={[imageStyle, newStarStyle]}
        />
      );
    }
  };

  render() {
    const {
      activeOpacity,
      buttonStyle,
      disabled,
    } = this.props;

    return (
      <Button
        activeOpacity={activeOpacity}
        disabled={disabled}
        containerStyle={buttonStyle}
        onPress={this.onButtonPress}
      >
        {this.renderIcon()}
      </Button>
    );
  }
}

export default StarButton;
