import * as React from 'react';
import Svg, { 
  Path, Rect, Circle, Defs, ClipPath, G, Polyline, Line 
} from 'react-native-svg';

export const IconsCommunication = {
  notification: ({ stroke = '#000', strokeColor = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      {...props}
    >
      <Path
        d="M18 8.4C18 6.70261 17.3679 5.07475 16.2426 3.87452C15.1174 2.67428 13.5913 2 12 2C10.4087 2 8.88258 2.67428 7.75736 3.87452C6.63214 5.07475 6 6.70261 6 8.4C6 15.8667 3 18 3 18H21C21 18 18 15.8667 18 8.4Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  notificationOff: ({ color = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...props}
    >
      <Path
        d="M6.27049 6.5C6.09277 7.10971 6 7.74975 6 8.4C6 15.8667 3 18 3 18H18"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.75732 3.87452C8.88254 2.67428 10.4087 2 12 2C13.5913 2 15.1174 2.67428 16.2426 3.87452C17.3678 5.07475 18 6.70261 18 8.4C18 15.8667 21 18 21 18"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 3L21 21"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  documentText: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color={strokeColor}
      {...props}
    >
      <Path
        d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 10L16 10"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 18L16 18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 14L12 14"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
};