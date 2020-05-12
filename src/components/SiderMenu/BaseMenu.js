import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import { formatMessage } from 'umi/locale';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '@/utils/utils';
import styles from './index.less';

const { SubMenu } = Menu;

const getIcon = icon => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt="icon" className={styles.icon}/>;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon}/>;
  }
  return icon;
};

export default class BaseMenu extends PureComponent {
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item, parent))
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };

  getSubMenuOrItem = item => {
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          inlineIndent={0}
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };


  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };


  loopMenu(child) {
    const chi = child || this.props.menuData;
    const icon = !child ? 'down' : 'left';
    const iconClass = !child ? 'arrow-down-menu-icon' : 'arrow-left-menu-icon';
    return chi.map((item, index) =>
      <li key={index} className="ara-nav-menu-item" onMouseEnter={this.someHandler}>
        <Link to={item.path}>
          <span>{formatMessage({ id: item.locale })}</span>
          {(item.children) ? <Icon type={icon} className={iconClass}/> : null}
        </Link>
        {(item.children) ?
          <div>
            <ul className="nav-menu-wrapper inner">{this.loopMenu(item.children)}</ul>
          </div>
          : null}
      </li>,
    );
  }


  loopMobileMenu(child) {
    const chi = child || this.props.menuData;
    return chi.map((item, index) =>
      (item.children) ?
        <SubMenu key={item.locale}
                 title={<Link to={item.path}><span>{formatMessage({ id: item.locale })}</span></Link>}>
          {this.loopMobileMenu(item.children)}
        </SubMenu> : <Menu.Item key={item.locale}><Link to={item.path}><span>{formatMessage({ id: item.locale })}</span></Link></Menu.Item>,
    );
  }

  render() {
    const {
      openKeys,
      theme,
      mode,
      location: { pathname },
      className,
      collapsed,
    } = this.props;
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    const { isMobile, handleOpenChange, style, menuData } = this.props;
    const cls = classNames(className, {
      'top-nav-menu': mode === 'horizontal',
    });

    return (
      <nav id='head-nav-bar'>
        {isMobile ?
          <Menu
            mode="inline"
            theme='dark'
            onClick={this.clickMenu.bind(this)}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
          >
            {this.loopMobileMenu()}
          </Menu> :
          <ul className="nav-menu-wrapper">
            {this.loopMenu()}
          </ul>
        }
      </nav>
    );
  }

  clickMenu() {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    console.log('this.props' , this.props);
  }
}
