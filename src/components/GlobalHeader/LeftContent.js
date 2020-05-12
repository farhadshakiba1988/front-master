import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, Divider, Popover, Button, Col, Row, Progress } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import avatar from '../../assets/100.png';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  fetchMoreNotices = tabProps => {
    const { list, name } = tabProps;
    const { dispatch, notices = [] } = this.props;
    const lastItemId = notices[notices.length - 1].id;
    dispatch({
      type: 'global/fetchMoreNotices',
      payload: {
        lastItemId,
        type: name,
        offset: list.length,
      },
    });
  };

  render() {
    const {
      currentUser,
      fetchingMoreNotices,
      fetchingNotices,
      loadedAllNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      skeletonCount,
      theme,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user"/>
          <FormattedMessage id="menu.account.center" defaultMessage="account center"/>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting"/>
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings"/>
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle"/>
          <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error"/>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <FormattedMessage id="menu.account.logout" defaultMessage="logout"/>
        </Menu.Item>
      </Menu>
    );
    const loadMoreProps = {
      skeletonCount,
      loadedAll: loadedAllNotices,
      loading: fetchingMoreNotices,
    };
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }


    const avatarContent =
      <div className={styles['account-popover']}>
        <div className={`${styles.action} ${styles.account} p-l`}>
          <Row type="flex" align="middle">
            <Col span={6}>
              <Avatar
                size={32}
                icon="user"
                className={styles.avatar}
                alt="avatar"
              />
            </Col>
            <Col span={18}>
              <div>
                <div className={styles.name}>هاکوپیان</div>
                <div>
                  <a href="" className="lnk">تنظیمات کاربری</a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Divider className={styles['account-popover-divider']}/>
        <a href="" className={'link'}>
          <Row type="flex" justify="center" align="middle">
            <Col span={20}>
              <div>
                <b>هاکوپیان</b>
              </div>
              <div>
                <i>hacoupoian@gmail.com</i>
              </div>
            </Col>
            <Col span={4}>
              <Icon type="left"/>
            </Col>
          </Row>

        </a>
        <Divider className={styles['account-popover-divider']}/>
        <div className="p-l">
          <a href="" className="mb-l db">
            <b>شروع کنید با هاب اسپات کار کنید</b>
          </a>
          <div>
            <span>میزان تکمیل پروفایل</span>
            <Progress strokeWidth={15} type='line' strokeColor={'#00bda5'} percent={30} strokeLinecap={'square'}/>
          </div>
        </div>
        <Divider className={styles['account-popover-divider']}/>
        <div className="p-l">
          <a href="" className="lnk">خروج از محیط کاربری</a>
        </div>
      </div>;
    return (
      <div className={className}>
        {/*<HeaderSearch*/}
          {/*className={`${styles.action} ${styles.search}`}*/}
          {/*placeholder={formatMessage({ id: 'component.globalHeader.search' })}*/}
          {/*dataSource={[*/}
            {/*formatMessage({ id: 'component.globalHeader.search.example1' }),*/}
            {/*formatMessage({ id: 'component.globalHeader.search.example2' }),*/}
            {/*formatMessage({ id: 'component.globalHeader.search.example3' }),*/}
          {/*]}*/}
          {/*onSearch={value => {*/}
            {/*console.log('input', value); // eslint-disable-line*/}
          {/*}}*/}
          {/*onPressEnter={value => {*/}
            {/*console.log('enter', value); // eslint-disable-line*/}
          {/*}}*/}
        {/*/>*/}
        <NoticeIcon
          className={styles.action}
          count={currentUser.unreadCount}
          onItemClick={(item, tabProps) => {// eslint-disable-line
            this.changeReadState(item, tabProps);
          }}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' }),
            loadedAll: formatMessage({ id: 'component.noticeIcon.loaded' }),
            loadMore: formatMessage({ id: 'component.noticeIcon.loading-more' }),
          }}
          onClear={onNoticeClear}
          onLoadMore={this.fetchMoreNotices}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          clearClose
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            list={noticeData.notification}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            name="notification"
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            emptyImage="images/wAhyIChODzsoKIOBHcBk.svg"
            {...loadMoreProps}
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            list={noticeData.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            name="message"
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            emptyImage="images/wAhyIChODzsoKIOBHcBk.svg"
            {...loadMoreProps}
          />
          <NoticeIcon.Tab
            count={unreadMsg.event}
            list={noticeData.event}
            title={formatMessage({ id: 'component.globalHeader.event' })}
            name="event"
            emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
            emptyImage="images/wAhyIChODzsoKIOBHcBk.svg"
            {...loadMoreProps}
          />
        </NoticeIcon>
        <Divider type="vertical" className={styles['account-divider']}/>
        {currentUser.name ? (
          <Popover placement="bottomRight" content={avatarContent} trigger="click" overlayClassName="account-popover"
                   className="account-popover">

                     <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>هاکوپیان</span>
                                 <Icon className="arrow-down-menu-icon" type="down"/>

              <Avatar
                size={32}
                icon="user"
                className={styles.avatar}
                alt="avatar"
              />
            </span>
          </Popover>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}/>
        )}
      </div>
    );
  }
}
