import * as React from 'react';
import Svg, { 
  Path, Rect, Circle, Defs, ClipPath, G, Polyline, Line 
} from 'react-native-svg';

export const IconsSocial = {
  facebookSquare: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
      {...props}
    >
      <Path
        d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 21C11 18 11 15 11 12C11 9.8125 11.5 8 15 8"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 13H11H15"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  googleSquare: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
      {...props}
    >
      <Path
        d="M15.5475 8.30327C14.6407 7.49361 13.4329 7 12.1089 7C9.28696 7 7 9.23899 7 12C7 14.761 9.28696 17 12.1089 17C15.5781 17 16.86 14.4296 17 12.4167H12.841"
        stroke={strokeColor}
        strokeWidth={2}
      />
      <Path
        d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  appStoreCircle: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth={2}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
      {...props}
    >
      <Path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 5.5L17.5 16.5"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5 5.5L6.5 16.5"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5 14H6.5"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 14H16"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  apple: ({ strokeColor = 'none', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-apple"
      {...props}
    >
      <Path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077" />
      <Path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
    </Svg>
  ),
};