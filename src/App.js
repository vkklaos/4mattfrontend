import { MantineProvider, createTheme } from '@mantine/core';
import { Shell } from './Views/Shell/Shell';
import { Storage } from './Context';

const theme = createTheme({
  white: "#F5F2FA",
  black: "#020005",
  colors: {
    main: [
        "#F2E6F0",
        "#EACCF0",
        "#D3A4EB",
        "#9E56D1",
        "#8F56D1",
        "#7743BF",
        "#6032A6",
        "#3D1B87",
        "#240F66",
        "#0F0747",
        "#030226",
        "#01051A",
    ],
    gray: [
        "#E8E9EB",
        "#DEE0E3",
        "#C8C9CC",
        "#BABABF",
        "#ABADB2",
        "#949599",
        "#797A80",
        "#5D5D66",
        "#3E3D47",
        "#43414D",
        "#1F1D26",
        "#040208",
      ],
  },
  primaryColor: 'main',
  fontFamily: "Asap, sans-serif",
});

const App = () => {
  return (
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
    >
      <Storage>
        <Shell />
      </Storage>
    </MantineProvider>
  );
}

export default App