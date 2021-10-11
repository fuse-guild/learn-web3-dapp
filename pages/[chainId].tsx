import Head from 'next/head';
import dynamic from 'next/dynamic';
import {CHAINS_CONFIG} from 'lib/constants';
import {CHAINS, ChainType, MarkdownForChainIdT} from 'types';
import {ComponentType} from 'react';
import {colors} from 'utils/colors';
import {fetchMarkdownForChainId} from 'utils/markdown';
import {Spinner} from 'components/shared/Layout/Spinner';

type DynChainT = ComponentType<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}>;

export async function getServerSideProps(context: any) {
  return {
    props: {
      chain: CHAINS_CONFIG[context.query.chainId as CHAINS],
      markdown: fetchMarkdownForChainId(context.query.chainId),
    },
  };
}

export default function Chain({
  chain,
  markdown,
}: {
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}) {
  const chainLabel = chain.label;
  const chainId = chain.id;

  const dynOptions = {
    loading: function spinner() {
      return <Spinner color={colors.figmentYellow} />;
    },
    ssr: false,
  };

  const DynChain = (() => {
    if (chainId === CHAINS.AVALANCHE)
      return dynamic(
        () => import('../components/protocols/avalanche'),
        dynOptions,
      );
    if (chainId === CHAINS.CELO)
      return dynamic(() => import('../components/protocols/celo'), dynOptions);
    if (chainId === CHAINS.NEAR)
      return dynamic(() => import('../components/protocols/near'), dynOptions);
    if (chainId === CHAINS.POLKADOT)
      return dynamic(
        () => import('../components/protocols/polkadot'),
        dynOptions,
      );
    if (chainId === CHAINS.POLYGON)
      return dynamic(
        () => import('../components/protocols/polygon'),
        dynOptions,
      );
    if (chainId === CHAINS.SECRET)
      return dynamic(
        () => import('../components/protocols/secret'),
        dynOptions,
      );
    if (chainId === CHAINS.SOLANA)
      return dynamic(
        () => import('../components/protocols/solana'),
        dynOptions,
      );
    if (chainId === CHAINS.TEZOS)
      return dynamic(() => import('../components/protocols/tezos'), dynOptions);
    if (chainId === CHAINS.THE_GRAPH)
      return dynamic(
        () => import('../components/protocols/the_graph'),
        dynOptions,
      );
    if (chainId === CHAINS.CERAMIC)
      return dynamic(() => import('../components/protocols/ceramic'));
  })() as DynChainT;

  return (
    <>
      <Head>
        <title>{`Figment Learn - ${chainLabel} Pathway`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynChain chain={chain} markdown={markdown} />
    </>
  );
}