import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: 'تاریخ',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'میزان',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="موفق" />
      ) : (
        <Badge status="processing" text="در انتظار تایید" />
      ),
  },
  {
    title: 'فروشنده',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'بازه زمانی فعالیت',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    return (
      <PageHeaderWrapper title="وضعیت فعالیت های کاربر">
        <Card bordered={false}>
          <DescriptionList size="large" title="مجموع کارکرد" style={{ marginBottom: 32 }}>
            <Description term="سود">1000000000</Description>
            <Description term="نسبت">زیان</Description>
            <Description term="جمع فروش">1234123421</Description>
            <Description term="اختلاف فروش">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="اطلاعات کاربر" style={{ marginBottom: 32 }}>
            <Description term="نام">حسین مظفری</Description>
            <Description term="نام کاربری">@abc.com</Description>
            <Description term="نوع کاربری">بازاریاب</Description>
            <Description term="میزان فعالیت ">از سال 1362</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>وضعیت فروش</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
