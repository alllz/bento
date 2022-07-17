import groupBy from 'lodash.groupby';
import { useMemo } from 'react';
import styled from 'styled-components';

import { AssetRatioChart } from '../components/AssetRatioChart';
import { AssetRatioListItem } from '../components/AssetRatioListItem';
import { displayName } from '../constants/platform';
import { WalletBalance } from '../types/balance';

type AssetRatioSectionProps = {
  netWorthInUSD: number;
  tokenBalances: {
    symbol: string;
    name: string;
    logo?: string;
    tokenAddress?: string;
    balances: WalletBalance[];
    netWorth: number;
    amount: number;
    price: number;
    type?: 'nft';
  }[];
};
export const AssetRatioSection: React.FC<AssetRatioSectionProps> = ({
  tokenBalances,
  netWorthInUSD,
}) => {
  const assetRatioByPlatform = useMemo(() => {
    const groups = groupBy(tokenBalances, 'platform');
    return Object.entries(groups).map(([platform, assets]) => {
      const netWorth = assets.reduce((acc, info) => acc + info.netWorth, 0);
      return {
        platform,
        netWorth,
        name: displayName(platform),
        ratio: (netWorth / netWorthInUSD) * 100,
      };
    });
  }, [netWorthInUSD]);

  return (
    <div className="mt-6 w-full flex">
      <div>
        <AssetRatioChart
          tokenBalances={tokenBalances}
          netWorthInUSD={netWorthInUSD}
        />
      </div>
      {assetRatioByPlatform.length && (
        <AssetCardList className="flex-1">
          {assetRatioByPlatform.map((item) => (
            <AssetRatioListItem key={item.platform} {...item} />
          ))}
        </AssetCardList>
      )}
    </div>
  );
};

const AssetCardList = styled.ul`
  margin: 0;
  margin-left: 20px;
  padding: 10px 12px;
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background: #16181a;
  background: linear-gradient(145deg, #141617, #181a1c);
  border: 1px solid #2a2e31;
  box-shadow: inset 5px 5px 16px #0b0c0e, inset -5px -5px 16px #212426;
  border-radius: 8px;
`;
