import * as React from 'react';
import Svg, { 
  Path, Rect, Circle, Defs, ClipPath, G, Polyline, Line 
} from 'react-native-svg';

export const Icons = {
  home: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={color}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </Svg>
  ),
  homeSimpleBar: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color={strokeColor}
      {...props}
    >
      <Path
        d="M17 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 17H15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  lock: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </Svg>
  ),
  user: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke={color}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </Svg>
  ),
  users: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </Svg>
  ),
  userCircle: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={color}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </Svg>
  ),
  wallet: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={color}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
      />
    </Svg>
  ),
  bag: ({ strokeColor = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={strokeColor}
      {...props}
    >
      <Path
        d="M4.50828 20H19.4917C19.785 20 20.0353 19.788 20.0836 19.4986L21.8836 8.69864C21.9445 8.33292 21.6625 8 21.2917 8H2.70828C2.33751 8 2.05549 8.33292 2.11644 8.69864L3.91644 19.4986C3.96466 19.788 4.21497 20 4.50828 20Z"
        stroke={strokeColor}
        strokeWidth={2.0}
      />
      <Path
        d="M7 8V6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6V8"
        stroke={strokeColor}
        strokeWidth={2.0}
      />
    </Svg>
  ),
  shoppingBag: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"
      {...props}
    >
      <Path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" />
      <Path d="M9 11v-5a3 3 0 0 1 6 0v5" />
    </Svg>
  ),
  store: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color={strokeColor}
      {...props}
    >
      <Path
        d="M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10"
        stroke={strokeColor}
        strokeWidth={2.0}
      />
      <Path
        d="M14.8333 21V15C14.8333 13.8954 13.9379 13 12.8333 13H10.8333C9.72874 13 8.83331 13.8954 8.83331 15V21"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeMiterlimit={16}
      />
      <Path
        d="M21.8183 9.36418L20.1243 3.43517C20.0507 3.17759 19.8153 3 19.5474 3H15.5L15.9753 8.70377C15.9909 8.89043 16.0923 9.05904 16.2532 9.15495C16.6425 9.38698 17.4052 9.81699 18 10C19.0158 10.3125 20.5008 10.1998 21.3465 10.0958C21.6982 10.0526 21.9157 9.7049 21.8183 9.36418Z"
        stroke={strokeColor}
        strokeWidth={2.0}
      />
      <Path
        d="M14 10C14.5675 9.82538 15.2879 9.42589 15.6909 9.18807C15.8828 9.07486 15.9884 8.86103 15.9699 8.63904L15.5 3H8.5L8.03008 8.63904C8.01158 8.86103 8.11723 9.07486 8.30906 9.18807C8.71207 9.42589 9.4325 9.82538 10 10C11.493 10.4594 12.507 10.4594 14 10Z"
        stroke={strokeColor}
        strokeWidth={2.0}
      />
      <Path
        d="M3.87567 3.43517L2.18166 9.36418C2.08431 9.7049 2.3018 10.0526 2.6535 10.0958C3.49916 10.1998 4.98424 10.3125 6 10C6.59477 9.81699 7.35751 9.38698 7.74678 9.15495C7.90767 9.05904 8.00913 8.89043 8.02469 8.70377L8.5 3H4.45258C4.18469 3 3.94926 3.17759 3.87567 3.43517Z"
        stroke={strokeColor}
        strokeWidth={2.0}
      />
    </Svg>
  ),
  fire: ({ color = '#fff', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24} height={24} viewBox="0 0 512 512"
      {...props}
    >
      <Path d="M394.23,197.56a300.43,300.43,0,0,0-53.37-90C301.2,61.65,249.05,32,208,32a16,16,0,0,0-15.48,20c13.87,53-14.88,97.07-45.31,143.72C122,234.36,96,274.27,96,320c0,88.22,71.78,160,160,160s160-71.78,160-160C416,276.7,408.68,235.51,394.23,197.56ZM288.33,418.69C278,429.69,265.05,432,256,432s-22-2.31-32.33-13.31S208,390.24,208,368c0-25.14,8.82-44.28,17.34-62.78,4.95-10.74,10-21.67,13-33.37a8,8,0,0,1,12.49-4.51A126.48,126.48,0,0,1,275,292c18.17,24,29,52.42,29,76C304,390.24,298.58,407.77,288.33,418.69Z" />
    </Svg>
  ),
  arrowBack: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24} height={24} viewBox="0 0 512 512"
      {...props}
    >
      <Polyline
        points="244 400 100 256 244 112"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 48,
        }}
      />
      <Line
        x1={120} y1={256} x2={412} y2={256}
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 48,
        }}
      />
    </Svg> 
  ),
  barcode: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M384,400.33l35.13-.33A29,29,0,0,0,448,371.13V140.87A29,29,0,0,0,419.13,112l-35.13.33"
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Path
        d="M128,112l-36.8.33c-15.88,0-27.2,13-27.2,28.87V371.47c0,15.87,11.32,28.86,27.2,28.86L128,400"
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Line
        x1={384}
        y1={192}
        x2={384}
        y2={320}
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Line
        x1={320}
        y1={160}
        x2={320}
        y2={352}
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Line
        x1={256}
        y1={176}
        x2={256}
        y2={336}
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Line
        x1={192}
        y1={160}
        x2={192}
        y2={352}
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Line
        x1={128}
        y1={192}
        x2={128}
        y2={320}
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
    </Svg>
  ),
  percent: ({ color = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...props}
    >
      <Path
        d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M15.5 16C15.7761 16 16 15.7761 16 15.5C16 15.2239 15.7761 15 15.5 15C15.2239 15 15 15.2239 15 15.5C15 15.7761 15.2239 16 15.5 16Z"
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 9C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8C8.22386 8 8 8.22386 8 8.5C8 8.77614 8.22386 9 8.5 9Z"
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 8L8 16"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  priorityUpSolid: ({ color = '#000', ...props }) => (
      <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      strokeWidth={1.5}
      {...props}
    >
      <G clipPath="url(#clip0_3839_8163)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9546 0.893452C12.4274 0.366244 11.5726 0.366246 11.0454 0.893453L0.893941 11.0449C0.366732 11.5721 0.366734 12.4269 0.893941 12.9541L11.0454 23.1056C11.5726 23.6328 12.4274 23.6328 12.9546 23.1056L23.1061 12.9541C23.6333 12.4269 23.6333 11.5721 23.1061 11.0449L12.9546 0.893452ZM12.5303 6.46967C12.3878 6.32714 12.1939 6.24798 11.9923 6.25004C11.7908 6.2521 11.5986 6.33519 11.459 6.4806L7.45896 10.6473C7.1721 10.9461 7.18179 11.4209 7.4806 11.7077C7.77941 11.9946 8.25419 11.9849 8.54104 11.6861L11.25 8.86423V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V8.81066L15.4697 11.5303C15.7626 11.8232 16.2374 11.8232 16.5303 11.5303C16.8232 11.2374 16.8232 10.7626 16.5303 10.4697L12.5303 6.46967Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3839_8163">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  heart: ({ strokeColor = '#000', fillColor = 'transparent', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        fill={fillColor}
      />
    </Svg>
  ),
  heartSolid: ({ color = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      strokeWidth={2.5}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z"
        fill={color}
      />
    </Svg>
  ),
  badgeEmpty: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-rosette"
      {...props}
    >
      <Path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
    </Svg>
  ),
  badgeCheck: ({ color = '#000', ...props }) => (
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
        d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M9 12L11 14L15 10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  share: ({ color = '#000', ...props }) => (
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
        d="M20 13V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V13"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15V3M12 3L8.5 6.5M12 3L15.5 6.5"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  chevronRight: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <Path
        d="M9 6L15 12L9 18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  chevronRightSolid: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.71299 18.6929C8.43273 18.5768 8.25 18.3033 8.25 18V5.99998C8.25 5.69663 8.43273 5.42315 8.71299 5.30707C8.99324 5.19098 9.31583 5.25515 9.53033 5.46965L15.5303 11.4696C15.8232 11.7625 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.31583 18.7448 8.99324 18.809 8.71299 18.6929Z"
        fill={fillColor}
      />
    </Svg>
  ),
  chevronDown: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </Svg>
  ),
  qrCode: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <Path
        d="M15 12L15 15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 3V6"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 12L18 15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18L21 18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 21H21"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 12H9"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6.01111L6.01 6"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12.0111L12.01 12"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 12.0111L3.01 12"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 9.01111L12.01 9"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15.0111L12.01 15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 21.0111L15.01 21"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 21.0111L12.01 21"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12.0111L21.01 12"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 15.0111L21.01 15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 6.01111L18.01 6"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 3.6V8.4C9 8.73137 8.73137 9 8.4 9H3.6C3.26863 9 3 8.73137 3 8.4V3.6C3 3.26863 3.26863 3 3.6 3H8.4C8.73137 3 9 3.26863 9 3.6Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 3.6V8.4C21 8.73137 20.7314 9 20.4 9H15.6C15.2686 9 15 8.73137 15 8.4V3.6C15 3.26863 15.2686 3 15.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
        />
      <Path
        d="M6 18.0111L6.01 18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 15.6V20.4C9 20.7314 8.73137 21 8.4 21H3.6C3.26863 21 3 20.7314 3 20.4V15.6C3 15.2686 3.26863 15 3.6 15H8.4C8.73137 15 9 15.2686 9 15.6Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>  
  ),
  scanQrCode: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      color={strokeColor}
      {...props}
    >
      <Path
        d="M9 6.6V8.4C9 8.73137 8.73137 9 8.4 9H6.6C6.26863 9 6 8.73137 6 8.4V6.6C6 6.26863 6.26863 6 6.6 6H8.4C8.73137 6 9 6.26863 9 6.6Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 12H9"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 12V15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18H15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12.0111L12.01 12"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 12.0111L18.01 12"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15.0111L12.01 15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 15.0111L18.01 15"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 18.0111L18.01 18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 9.01111L12.01 9"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 6.01111L12.01 6"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 15.6V17.4C9 17.7314 8.73137 18 8.4 18H6.6C6.26863 18 6 17.7314 6 17.4V15.6C6 15.2686 6.26863 15 6.6 15H8.4C8.73137 15 9 15.2686 9 15.6Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 6.6V8.4C18 8.73137 17.7314 9 17.4 9H15.6C15.2686 9 15 8.73137 15 8.4V6.6C15 6.26863 15.2686 6 15.6 6H17.4C17.7314 6 18 6.26863 18 6.6Z"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 3H21V6"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 21H21V18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 3H3V6"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 21H3V18"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  headset: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
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
      className="lucide lucide-headset-icon lucide-headset"
      {...props}
    >
      <Path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <Path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </Svg>
  ),
  cart: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </Svg>
  ),
  simpleCart: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <Path
        d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5"
        stroke={strokeColor}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  truck: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={color}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </Svg>
  ),
  userFollow: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <Path d="M16 19h6" />
      <Path d="M19 16v6" />
      <Path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
    </Svg>
  ),
  instagram: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
      <Path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <Path d="M16.5 7.5v.01" />
    </Svg>
  ),
  arrowUpRight: ({ color = '#000', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M17 7l-10 10" />
      <Path d="M8 7l9 0l0 9" />
    </Svg>
  ),
  xMark: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <Path
        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  xMarkCircle: ({ color = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...props}
    >
      <Path
        d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  xMarkCircleSolid: ({ color = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      strokeWidth={1.5}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z"
        fill={color}
      />
    </Svg>  
  ),
  photo: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </Svg>
  ),
  ticket: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
      />
    </Svg>
  ),
  check: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </Svg>
  ),
  plus: ({ color = '#000', ...props }) => (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2.0}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...props}
    >
      <Path
        d="M6 12H12M18 12H12M12 12V6M12 12V18"
        stroke={color}
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  star: ({ strokeColor = 'none', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </Svg>
  ),
  camera: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
      />
    </Svg>
  ),
  qrCode: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
      />
  </Svg>
  ),
  creditCard: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke={strokeColor}
      className="size-6"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
      />
    </Svg>
  ),
  history: ({ strokeColor = '#000', fillColor = 'none', ...props }) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={2}
      {...props}
    >
      <Path d="M12 8l0 4l2 2" />
      <Path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </Svg>
  ),
}