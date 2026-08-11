declare module 'MyBoxyUI/colors/Colors' {
  export const PrimaryColors: Record<string, string>;
  export const NeutralColors: Record<string, string>;
}

declare module 'MyBoxyUI/icons/Icons' {
  import type { ComponentType } from 'react';
  import type { SvgProps } from 'react-native-svg';

  type IconProps = SvgProps & {
    color?: string;
    strokeColor?: string;
    fillColor?: string;
  };

  export const Icons: Record<string, ComponentType<IconProps>>;
}

declare module 'MyBoxyUI/icons/IconsSocial' {
  import type { ComponentType } from 'react';
  import type { SvgProps } from 'react-native-svg';

  type IconProps = SvgProps & {
    color?: string;
    strokeColor?: string;
    fillColor?: string;
  };

  export const IconsSocial: Record<string, ComponentType<IconProps>>;
}

declare module 'MyBoxyUI/icons/IconsActions' {
  import type { ComponentType } from 'react';
  import type { SvgProps } from 'react-native-svg';

  type IconProps = SvgProps & {
    color?: string;
    strokeColor?: string;
    fillColor?: string;
  };

  export const IconsActions: Record<string, ComponentType<IconProps>>;
}

declare module 'MyBoxyUI/icons/IconsNavigation' {
  import type { ComponentType } from 'react';
  import type { SvgProps } from 'react-native-svg';

  type IconProps = SvgProps & {
    color?: string;
    strokeColor?: string;
    fillColor?: string;
  };

  export const IconsNavigation: Record<string, ComponentType<IconProps>>;
}
