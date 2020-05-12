import React, { Fragment } from 'react';
import { Layout, Icon } from 'ui';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'one',
          title: 'Pro Ui',
          href: 'https://www.hacoupian.net/',
          blankTarget: true,
        },
        {
          key: 'two',
          title: 'Pro Ui Two',
          href: 'https://www.hacoupian.net/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> Rooyesh
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
