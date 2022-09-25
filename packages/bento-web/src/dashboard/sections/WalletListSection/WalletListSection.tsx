import styled from 'styled-components';

import { Button } from '@/components/system';
import { useWalletContext } from '@/hooks/useWalletContext';

import { Colors, systemFontStack } from '@/styles';

import { WalletList, walletCountStyle } from './WalletList';

type Props = {
  onClickAddWallet: () => void;
};

export const WalletListSection: React.FC<Props> = ({ onClickAddWallet }) => {
  const { wallets, revalidateWallets } = useWalletContext();

  return (
    <div className="flex-1 flex flex-col relative">
      <SectionTitleContainer>
        <SectionTitle>Wallets</SectionTitle>
      </SectionTitleContainer>

      {wallets.length > 0 ? (
        <>
          <WalletList wallets={wallets} revalidateWallets={revalidateWallets} />
          <ButtonContainer>
            <AddWalletButton onClick={onClickAddWallet}>
              Add Another
            </AddWalletButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <Illust src="/assets/illusts/wallet.png" />
          <EmptyContainer>
            <div>
              <span>
                Wallets Connected&nbsp;&nbsp;
                <span className="total">{wallets.length}</span>
              </span>
            </div>
          </EmptyContainer>

          <ButtonContainer>
            <AddWalletButton onClick={onClickAddWallet}>
              Connect Wallet
            </AddWalletButton>
          </ButtonContainer>
        </>
      )}
    </div>
  );
};

const SectionTitleContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  background-image: linear-gradient(
    to bottom,
    ${Colors.black} 40%,
    transparent
  );
`;
const SectionTitle = styled.h3`
  /* FIXME: !important */
  &,
  & > span.title {
    font-family: 'Raleway', ${systemFontStack} !important;
  }

  margin-bottom: 16px;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: -0.5px;
  color: ${Colors.gray400};
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

// FIXME: Design component
const AddWalletButton = styled(Button)`
  && {
    height: unset;
    padding: 12px 18px;

    /* FIXME: !important */
    font-family: 'Raleway', ${systemFontStack} !important;
    font-weight: 800;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    color: ${Colors.white};
  }
`;

const Illust = styled.img`
  margin: 24px auto;
  width: 128px;
  height: 128px;
`;
const EmptyContainer = styled.div`
  ${walletCountStyle}
`;
