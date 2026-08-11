import { TextStyle } from "react-native";

export const Fonts = {
  regular: {
    fontFamily: "SFMonoRegular",
    letterSpacing: -0.5,
  },
  regular11: {
    fontFamily: "SFMonoRegular",
    fontSize: 11,
    letterSpacing: -0.5,
  },
  regular12: {
    fontFamily: "SFMonoRegular",
    fontSize: 12,
    letterSpacing: -0.5,
  },
  regular13: {
    fontFamily: "SFMonoRegular",
    fontSize: 13,
    letterSpacing: -0.5,
  },
  regular14: {
    fontFamily: "SFMonoRegular",
    fontSize: 14,
    letterSpacing: -0.5,
  },
  regular14Line20: {
    fontFamily: "SFMonoRegular",
    fontSize: 14,
    letterSpacing: -0.5,
    lineHeight: 20,
  },
  regular16: {
    fontFamily: "SFMonoRegular",
    fontSize: 16,
    letterSpacing: -0.5,
  },
  light12: {
    fontFamily: "SFMonoLight",
    fontSize: 12,
    letterSpacing: -0.5,
  },
  light13: {
    fontFamily: "SFMonoLight",
    fontSize: 13,
    letterSpacing: -0.5,
  },
  light14: {
    fontFamily: "SFMonoLight",
    fontSize: 14,
    letterSpacing: -0.5,
  },
  bold12: {
    fontFamily: "SFMonoBold",
    fontSize: 12,
    letterSpacing: -0.5,
  },
  bold16: {
    fontFamily: "SFMonoBold",
    fontSize: 16,
    letterSpacing: -0.5,
  },
  bold18: {
    fontFamily: "SFMonoBold",
    fontSize: 18,
    letterSpacing: -0.5,
  },
  bold20: {
    fontFamily: "SFMonoBold",
    fontSize: 20,
    letterSpacing: -0.5,
  },
  bold22Line24: {
    fontFamily: "SFMonoBold",
    fontSize: 22,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  bold24: {
    fontFamily: "SFMonoBold",
    fontSize: 24,
    letterSpacing: -0.5,
  },
  bold24System: {
    fontSize: 24,
    fontWeight: "bold",
  },
  systemBold: {
    fontWeight: "bold",
  },
  size16: {
    fontSize: 16,
  },
} satisfies Record<string, TextStyle>;
