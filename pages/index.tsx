import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { BlogCard } from '@components/BlogCard';
import { box } from '@styles/box';
import { text } from '@styles/text';
import { container } from '@styles/container';
import { link } from '@styles/link';

import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { formatEther } from '@ethersproject/units';

import type { Post } from '.contentlayer/types';
import { allPosts } from '.contentlayer/data';
import { button } from '@styles/button';
import { metaverse } from 'stitches.config';

const injected = new InjectedConnector({ supportedChainIds: [1, 5] });

function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = React.useState();
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      {balance === null
        ? 'Error'
        : balance
        ? `Ξ${Math.round((formatEther(balance) as any) * 1e4) / 1e4}`
        : ''}
    </>
  );
}

function EnsName() {
  const { account, library, chainId } = useWeb3React();
  const [ensName, setEnsName] = React.useState();
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .lookupAddress(account)
        .then((account: any) => {
          if (!stale) {
            setEnsName(account);
          }
        })
        .catch(() => {
          if (!stale) {
            setEnsName(null);
          }
        });

      return () => {
        stale = true;
        setEnsName(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <span className={box({ fontFamily: '$web3' })}>
      {ensName === null
        ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
        : ensName}
    </span>
  );
}

export default function Home({ posts }: { posts: Post[] }) {
  const { activate, deactivate, active, library, account } = useWeb3React();

  const onConnect = async () => {
    await activate(injected);
  };

  const onDisconnect = () => {
    deactivate();
  };

  React.useEffect(() => {
    // getLove(account)
    if (account) {
      document.body.classList.add(metaverse);
    } else {
      document.body.className = '';
    }
  }, [account]);

  return (
    <>
      <TitleAndMetaTags />

      <div className={box({ position: 'absolute', top: '$3', right: '$3' })}>
        {!active ? null : (
          <button className={button()} onClick={onDisconnect}>
            Disconnect Wallet
          </button>
        )}
      </div>

      <div
        className={box({
          bc: '$white',
          color: '$black',
          '.metaverse &': {
            bc: 'transparent',
          },
        })}
      >
        <div
          className={container({
            css: {
              mx: '$4',
              py: '$4',
              '@bp1': {
                mx: '$5',
                py: '$5',
              },
              '@bp2': {
                mx: '$6',
              },
            },
          })}
        >
          <h1
            className={text({
              size: '2',
              css: {
                mb: '$5',
                textTransform: 'uppercase',
                '@bp1': {
                  mb: '$6',
                },
              },
            })}
          >
            Pedro <span className={text({ css: { color: '$gray' } })}>Duarte</span>{' '}
          </h1>

          <div
            className={box({
              position: 'absolute',
              left: '50%',
              top: '50%',
              fontSize: '200px',
              mixBlendMode: 'overlay',
              transform: 'translate(-50%, -50%) rotate(-20deg)',
            })}
          >
            {account && <EnsName />}
          </div>

          <h2
            className={text({
              size: {
                '@initial': '4',
                '@bp1': '5',
              },
            })}
          >
            I'm a UI developer interested in design systems,{' '}
            <button
              className={box({
                all: 'unset',
                fontFamily: '$web3',
                fontSize: '1.2em',
                backgroundSize: '200%',
                backgroundClip: 'text',
                transition: 'all 1600ms',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundPosition: 'top right',
                },
              })}
              onClick={onConnect}
            >
              web3
            </button>
            , user/dev experience and under engineering.
          </h2>

          <p
            className={text({
              size: {
                '@initial': '4',
                '@bp1': '5',
              },
              css: { mt: '$5' },
            })}
          >
            I work at{' '}
            <a className={link()} href="https://modulz.app" target="_blank" rel="noopener">
              Modulz
            </a>{' '}
            as a DX Engineer. Helping close the gap between design—dev and focusing on{' '}
            <a className={link()} href="https://radix-ui.com" target="_blank" rel="noopener">
              Radix
            </a>{' '}
            and{' '}
            <a className={link()} href="https://stitches.dev" target="_blank" rel="noopener">
              Stitches
            </a>
            .
          </p>

          <p
            className={text({
              size: {
                '@initial': '4',
                '@bp1': '5',
              },
              css: { mt: '$5' },
            })}
          >
            I was born in Brazil, raised in the UK and now living in Barcelona with my little
            family.
          </p>

          <p
            className={text({
              size: {
                '@initial': '4',
                '@bp1': '5',
              },
              css: { mt: '$5', mb: '$6' },
            })}
          >
            You can find me on{' '}
            <a
              className={link({ variant: 'ghost' })}
              href="https://twitter.com/peduarte"
              target="_blank"
              rel="noopener"
            >
              <VisuallyHidden>GitHub</VisuallyHidden>
              <TwitterIcon aria-hidden />
            </a>{' '}
            or{' '}
            <a
              className={link({ variant: 'ghost' })}
              href="https://github.com/peduarte"
              target="_blank"
              rel="noopener"
            >
              <VisuallyHidden>Twitter</VisuallyHidden>
              <GithubIcon aria-hidden />
            </a>
          </p>
        </div>
      </div>

      <div
        className={box({
          padding: '$3',
          bc: '$yellow',
          position: 'relative',
          '.metaverse &': {
            bc: 'transparent',
          },
          '@bp1': {
            padding: '$4',
          },
          '@bp2': {
            padding: '$5',
          },
        })}
      >
        <div
          className={box({
            mt: '-$5',
            p: '$4',
            bc: '$black',
            color: '$white',
            '@bp1': {
              mt: '-$6',
              p: '$5',
            },
          })}
        >
          <h3 className={text({ size: '3', css: { mb: '$5', mx: 'auto' } })}>Writing</h3>

          <ul className={box({ listStyle: 'none', pl: 0 })}>
            {posts.map((post) => (
              <li key={post.title}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const TwitterIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" width={24} fill="currentColor" {...props}>
      <path d="M8.66 20c6.793 0 10.508-6.156 10.508-11.495 0-.175 0-.349-.01-.522A7.943 7.943 0 0021 5.892a6.883 6.883 0 01-2.121.635c.77-.504 1.348-1.298 1.624-2.234a7.03 7.03 0 01-2.346.98c-1.144-1.331-2.963-1.657-4.437-.794-1.473.862-2.234 2.699-1.856 4.48-2.97-.164-5.736-1.698-7.611-4.222-.98 1.846-.48 4.208 1.143 5.393a3.428 3.428 0 01-1.676-.506v.052c0 1.923 1.24 3.58 2.963 3.96a3.38 3.38 0 01-1.668.07c.484 1.645 1.87 2.772 3.45 2.805-1.307 1.124-2.923 1.734-4.586 1.733-.294-.001-.587-.02-.879-.059C4.689 19.371 6.654 20 8.66 19.997" />
    </svg>
  );
};
const GithubIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" width={24} fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3c-4.973 0-9 4.13-9 9.228 0 4.083 2.576 7.532 6.154 8.754.45.081.618-.196.618-.438 0-.22-.01-.946-.01-1.719-2.262.427-2.847-.565-3.027-1.084-.101-.265-.54-1.084-.923-1.303-.315-.173-.764-.6-.01-.612.708-.011 1.214.67 1.383.946.81 1.396 2.104 1.004 2.621.762.079-.6.315-1.004.574-1.235-2.003-.23-4.095-1.026-4.095-4.556 0-1.003.349-1.834.922-2.48-.09-.23-.404-1.176.09-2.445 0 0 .754-.242 2.475.946a8.159 8.159 0 012.25-.312c.765 0 1.53.104 2.25.312 1.722-1.2 2.475-.946 2.475-.946.495 1.269.18 2.215.09 2.445.574.646.923 1.465.923 2.48 0 3.541-2.104 4.326-4.106 4.556.326.289.607.842.607 1.707 0 1.235-.011 2.227-.011 2.538 0 .242.169.53.619.438a9.036 9.036 0 004.439-3.366A9.402 9.402 0 0021 12.228C21 7.129 16.973 3 12 3z"
      />
    </svg>
  );
};

export function getStaticProps() {
  const sortedPosts = allPosts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );
  return { props: { posts: sortedPosts } };
}
