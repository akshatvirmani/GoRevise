import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        transition: "background-color 0.25s ease, color 0.25s ease",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        _active: { transform: "scale(0.94)" },
      },
      variants: {
        solid: {
          _hover: { transform: "translateY(-2px)", boxShadow: "lg" },
        },
        outline: {
          _hover: { transform: "translateY(-2px)" },
        },
      },
    },
    IconButton: {
      baseStyle: {
        transition: "transform 0.15s ease",
        _hover: { transform: "scale(1.15)" },
        _active: { transform: "scale(0.9)" },
      },
    },
  },
});

export default theme;
