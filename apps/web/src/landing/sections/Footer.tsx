import styled from '@emotion/styled';

import { Analytics } from '@/utils';

export const Footer: React.FC = () => {
  return (
    <Container className="sys">
      <a
        title="INEVITABLE"
        href="https://inevitable.team"
        target="_blank"
        onClick={() =>
          Analytics.logEvent('click_team_link', {
            medium: 'dashboard_landing',
          })
        }
      >
        2022 INEVITABLE
      </a>
    </Container>
  );
};

const Container = styled.footer`
  margin-bottom: 100px;

  font-weight: 900;
  font-size: 24px;
  line-height: 120%;
  text-align: center;
  color: rgba(221, 204, 211, 0.88);

  & > a {
    color: unset;
  }
`;
