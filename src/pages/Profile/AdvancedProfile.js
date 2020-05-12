import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>تراکنش های من</Button>
      <Button>روال های کاری</Button>
    </ButtonGroup>
    <Button type="primary">ویرایش پروفایل</Button>
  </Fragment>
);


const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="نام">یوریک</Description>
    <Description term="نام خانوادگی">هاکوپیان</Description>
    <Description term="کد ملی">1234567890</Description>
    <Description term="تلفن همراه">09128081234</Description>
    <Description term="تاریخ ثبت نام">1398-10-25 10:25</Description>
    <Description term="ایمیل">
      <a href="">a@gmail.com</a>
    </Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'detail',
    tab: 'اطلاعات کاربری',
  },
  {
    key: 'rule',
    tab: 'اطلاعات شخصی',
  },
];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      تاریخ به روزرسانی
    </Fragment>
    <div>1398-10-25 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      تاریخ به روزرسانی
    </Fragment>
    <div>1398-10-25 12:32</div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>توسط شخص دیگری انجام شده</span>} />
    </span>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

const operationTabList = [
  {
    key: 'tab2',
    tab: 'خروج از سیستم',
  },
  {
    key: 'tab1',
    tab: 'ورود به سیستم',
  },

];

const columns = [
  {
    title: 'نوع',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="موفق" />
      ) : (
        <Badge status="error" text="نا موفق" />
      ),
  },
  {
    title: 'تاریخ',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'تایید',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection, operationkey } = this.state;
    const { profile, loading } = this.props;
    const { advancedOperation1, advancedOperation2 } = profile;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      )
    };

    return (
      <PageHeaderWrapper
        title="هاکوپیان"
        logo={
          <img alt="" src="/icons/01.png" />
        }
        action={action}
        content={description}
        tabList={tabList}
      >
        <Card title="تکمیل پروفایل" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="اطلاعات اولیه" description={desc1} />
            <Step title="اطلاعات شخصی " description={desc2} />
            <Step title="حساب بانکی" />
            <Step title="علایق" />
          </Steps>
        </Card>
        <Card title="اطلاعات کاربر" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="فیلد اول">حقیقی</Description>
            <Description term="فیلد دوم">32943898021309809423</Description>
            <Description term="فیلد سوم">3321944288191034921</Description>
            <Description term="فیلد چهارم">18112345678</Description>
          </DescriptionList>
          <Card type="inner" title="اطلاعات کارت بانکی">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="بانک ملی">
              <Description term="شماره حساب">123456789</Description>
              <Description term="شعبه">شهرک غرب</Description>
              <Description term="شماره کارت">6037-4585-5698-7895</Description>
              <Description term="نوع حساب">جاری</Description>
              <Description term="شبا">
                102523522125452125452
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />  <DescriptionList size="small" style={{ marginBottom: 16 }} title="بانک ملت">
              <Description term="شماره حساب">123456789</Description>
              <Description term="شعبه">شهرک غرب</Description>
              <Description term="شماره کارت">6037-4585-5698-7895</Description>
              <Description term="نوع حساب">جاری</Description>
              <Description term="شبا">
                102523522125452125452
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />  <DescriptionList size="small" style={{ marginBottom: 16 }} title="بانک صادرات">
              <Description term="شماره حساب">123456789</Description>
              <Description term="شعبه">شهرک غرب</Description>
              <Description term="شماره کارت">6037-4585-5698-7895</Description>
              <Description term="نوع حساب">جاری</Description>
              <Description term="شبا">
                102523522125452125452
              </Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          defaultActiveTabKey="tab1"
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
