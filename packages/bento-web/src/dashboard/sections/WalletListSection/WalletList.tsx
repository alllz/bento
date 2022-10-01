import { Wallet, shortenAddress } from '@bento/common';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import { Colors } from '@/styles';
import { Analytics, copyToClipboard, toast } from '@/utils';

import { WalletListItem } from './WalletListItem';

type Props = {
  wallets: Wallet[];
  revalidateWallets: () => Promise<Wallet[] | undefined>;
};

export const WalletList: React.FC<Props> = ({ wallets, revalidateWallets }) => {
  const onClickCopy = useCallback(
    (walletAddress: string, walletType: 'evm' | 'cosmos-sdk' | 'solana') => {
      Analytics.logEvent('click_copy_wallet_address', {
        type: walletType,
        address: walletAddress,
      });
      copyToClipboard(walletAddress);
      toast({
        title: 'Copied to clipboard!',
        description: walletAddress,
      });
    },
    [],
  );

  const onClickDelete = useCallback(
    async (walletAddress: string) => {
      try {
        await axios.post(`/api/profile/delete-wallet`, {
          walletAddress,
        });
        toast({
          type: 'success',
          title: 'Deleted Wallet',
          description: `Removed wallet ${shortenAddress(walletAddress)}`,
        });
      } catch (error: any) {
        toast({
          type: 'error',
          title: 'Server Error',
          description: error.message || 'Something went wrong',
        });
      } finally {
        await revalidateWallets();
      }
    },
    [revalidateWallets],
  );

  return (
    <Container>
      <WalletItemList>
        {wallets.map((wallet) => (
          <WalletListItem
            key={wallet.address}
            wallet={wallet}
            onClickDelete={onClickDelete}
            onClickCopy={onClickCopy}
          />
        ))}
      </WalletItemList>

      <Footer>
        <div />
        <div>
          <span>
            Wallets Connected&nbsp;&nbsp;
            <span className="total">{wallets.length}</span>
          </span>
        </div>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  margin-top: -40px;
`;
export const WalletItemList = styled(motion.ul)`
  padding-top: 40px;
  padding-bottom: ${(88 * 2) / 3}px;
  width: 100%;
  max-height: 322px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  & > div:first-of-type {
    width: 100%;
    height: 64px;

    background: linear-gradient(
      to bottom,
      transparent 22%,
      ${Colors.black} 97%
    );
  }
`;

export const walletCountStyle = css`
  & > div:last-of-type {
    background-color: ${Colors.black};
    flex: 1;

    display: flex;
    justify-content: center;

    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      text-align: center;
      letter-spacing: -0.05em;
      color: #ffffff;

      &.total {
        color: ${Colors.brand400};
      }
    }
  }
`;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 86px;

  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    width: 100%;
    height: 64px;

    background: linear-gradient(
      to bottom,
      transparent 22%,
      ${Colors.black} 97%
    );
  }

  ${walletCountStyle}
`;
