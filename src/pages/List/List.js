import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class SearchList extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const tabList = [
      {
        key: 'articles',
        tab: 'محتوا ها',
      },
      {
        key: 'projects',
        tab: 'پروژه ها',
      },
      {
        key: 'applications',
        tab: 'کارها',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="عبارت جستجو را وارد کنید"
          enterButton="جستجو"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="لیست "
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
        {/* <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch> */}
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
