import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';

import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';


const UserLayout = ({ children }) => (
  // @TODO <DocumentTitle title={this.getPageTitle()}>
  <div className={styles.container}>
    <div className={styles.lang}>
      <SelectLang />
    </div>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>Hacotech</span>
          </Link>
        </div>
        <div className={styles.desc}>Hacotech</div>
      </div>
      {children}
    </div>
  </div>
);

export default UserLayout;
