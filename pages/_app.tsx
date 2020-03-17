import { AppProps } from 'next/app';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import * as Primitives from '@modulz/primitives';
import { prismTheme } from '../prismTheme';
import { theme } from '../data/theme';

// Create global CSS for syntax highlighting
export const GlobalStyles = createGlobalStyle(
  {
    body: {
      backgroundColor: theme.colors.black,
      color: theme.colors.white,
      fontFamily: theme.fonts.normal,
    },

    '&::selection': {
      backgroundColor: theme.colors.yellow,
    },
  },
  prismTheme
);

// const { RadixProvider, Box } = Radix;

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider
        components={{
          // ...Radix,
          // h1: props => <Radix.Heading size={5} mb={6} sx={{ fontWeight: 500 }} {...props} as="h1" />,
          h2: props => (
            <Primitives.Text
              mb={3}
              mx="auto"
              sx={{
                fontFamily: 'normal',
                fontSize: 2,
                fontWeight: 600,
                lineHeight: 2,
              }}
              {...props}
              as="h2"
            />
          ),
          h3: props => (
            <Primitives.Text
              mb={3}
              mx="auto"
              sx={{
                fontFamily: 'normal',
                fontSize: 2,
                fontWeight: 600,
                lineHeight: 2,
              }}
              {...props}
              as="h3"
            />
          ),
          h4: props => (
            <Primitives.Text
              mb={2}
              mx="auto"
              sx={{
                fontFamily: 'normal',
                fontSize: 1,
                fontWeight: 600,
                lineHeight: 1,
              }}
              {...props}
              as="h4"
            />
          ),
          p: props => <Primitives.Text mb={3} {...props} sx={{ fontSize: 1, lineHeight: 2, ...props.sx }} as="p" />,
          a: props => (
            <Primitives.Link
              sx={{
                textDecoration: 'underline',
                ':hover': { color: 'red' },
              }}
              {...props}
            />
          ),
          hr: props => <Primitives.Divider my={4} mx="auto" sx={{ width: 3, bg: 'gray' }} {...props} />,
          inlineCode: props => (
            <Primitives.Code
              sx={{
                bg: 'gray',
                fontSize: 0,
                padding: '2px 5px',
                borderRadius: 1,
                fontFamily: 'mono',
                verticalAlign: 'middle',
              }}
              {...props}
            />
          ),
          ul: props => <Primitives.Box mb={3} {...props} as="ul" />,
          ol: props => <Primitives.Box mb={3} {...props} as="ol" />,
          li: props => (
            <li>
              <Primitives.Text {...props} sx={{ fontSize: 1, lineHeight: 2, ...props.sx }} />
            </li>
          ),
          // strong: props => <Radix.Text {...props} sx={{ ...props.sx, fontWeight: 500 }} />,
          // img: ({ ...props }) => (
          //   <Box display="inline-block" mx={-7} my={3}>
          //     <img style={{ maxWidth: '100%', verticalAlign: 'middle' }} {...props} />
          //   </Box>
          // ),
          // blockquote: props => (
          //   <Box my={5} pl={6} sx={{ borderLeft: theme => `2px solid ${theme.colors.gray300}`, color: 'gray300' }} {...props} />
          // ),
        }}
      >
        <Head>
          <title>Modulz</title>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700,800,900&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <GlobalStyles />

        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

export default App;