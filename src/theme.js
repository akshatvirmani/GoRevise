import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#FFF1F0", 100: "#FFE1DE", 200: "#FFC2BC", 300: "#FFA399",
    400: "#FF8580", 500: "#FF6B6B", 600: "#E8503F", 700: "#C23E30",
    800: "#9C2F24", 900: "#7A241A",
  },
  sunny: {
    50: "#FFFBEB", 100: "#FFF3C4", 200: "#FFE88A", 300: "#FFDD57",
    400: "#FFD23F", 500: "#F7C331", 600: "#E0AE1E", 700: "#B88912",
    800: "#8F670C", 900: "#664908",
  },
  sky: {
    50: "#E8FBF9", 100: "#C3F4EF", 200: "#8FE8DF", 300: "#63D9CE",
    400: "#4ECDC4", 500: "#34B3AA", 600: "#2BA39A", 700: "#1F7D76",
    800: "#175C57", 900: "#0F3F3B",
  },
  grape: {
    50: "#F3EFFE", 100: "#E2D7FC", 200: "#C7B2F9", 300: "#AE8EF5",
    400: "#9A78F2", 500: "#8566E8", 600: "#6D4CD1", 700: "#5739A8",
    800: "#412A7D", 900: "#2C1C55",
  },
  ink: {
    50: "#F2F1FA", 100: "#DAD7F0", 200: "#B6B0E0", 300: "#8F86C9",
    400: "#6A5FA8", 500: "#4B4186", 600: "#3A3269", 700: "#2B2250",
    800: "#1D1736", 900: "#110D20",
  },
};

const pressable = {
  brand: { bg: colors.brand[400], hoverBg: colors.brand[300], border: colors.brand[700], color: "white" },
  sunny: { bg: colors.sunny[400], hoverBg: colors.sunny[300], border: colors.sunny[700], color: colors.ink[800] },
  sky: { bg: colors.sky[400], hoverBg: colors.sky[300], border: colors.sky[700], color: "white" },
  grape: { bg: colors.grape[400], hoverBg: colors.grape[300], border: colors.grape[700], color: "white" },
  gray: { bg: colors.ink[100], hoverBg: colors.ink[50], border: colors.ink[400], color: colors.ink[800] },
};

const dotBg = (a, b) =>
  `radial-gradient(circle, ${a} 2px, transparent 2.5px), radial-gradient(circle, ${b} 2px, transparent 2.5px)`;

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Baloo 2', cursive",
    body: "'Nunito', sans-serif",
  },
  colors,
  styles: {
    global: (props) => ({
      "html, body": {
        transition: "background-color 0.25s ease, color 0.25s ease",
        backgroundColor: props.colorMode === "dark" ? colors.ink[700] : "#FFF8EC",
        backgroundImage:
          props.colorMode === "dark"
            ? dotBg("rgba(255,210,63,0.08)", "rgba(78,205,196,0.08)")
            : dotBg("rgba(255,107,107,0.12)", "rgba(78,205,196,0.12)"),
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "heading",
        fontWeight: "700",
        letterSpacing: "0.3px",
        borderRadius: "16px",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
      },
      variants: {
        solid: (props) => {
          const c = pressable[props.colorScheme] || pressable.brand;
          return {
            bg: c.bg,
            color: c.color,
            border: "3px solid",
            borderColor: c.border,
            boxShadow: `0 4px 0 0 ${c.border}`,
            _hover: {
              bg: c.hoverBg,
              transform: "translateY(-2px)",
              boxShadow: `0 6px 0 0 ${c.border}`,
              _disabled: { bg: c.bg },
            },
            _active: { transform: "translateY(3px)", boxShadow: `0 1px 0 0 ${c.border}` },
          };
        },
        outline: (props) => {
          const c = pressable[props.colorScheme] || pressable.brand;
          return {
            bg: "transparent",
            color: c.border,
            border: "3px solid",
            borderColor: c.border,
            boxShadow: `0 4px 0 0 ${c.border}`,
            _hover: { bg: `${props.colorScheme || "brand"}.50`, transform: "translateY(-2px)", boxShadow: `0 6px 0 0 ${c.border}` },
            _active: { transform: "translateY(3px)", boxShadow: `0 1px 0 0 ${c.border}` },
          };
        },
        ghost: {
          _hover: { transform: "scale(1.15)" },
          _active: { transform: "scale(0.85)" },
        },
        unstyled: {
          _hover: { transform: "scale(1.15)" },
          _active: { transform: "scale(0.85)" },
        },
      },
      defaultProps: { colorScheme: "brand" },
    },
    IconButton: {
      baseStyle: {
        transition: "transform 0.15s ease",
        _hover: { transform: "scale(1.15) rotate(-6deg)" },
        _active: { transform: "scale(0.9)" },
      },
    },
    Heading: {
      baseStyle: { fontFamily: "heading" },
    },
  },
});

export default theme;
