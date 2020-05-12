import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: 'نام',
  url: 'آدرس',
  owner: 'مالک',
  approver: 'کومبو',
  dateRange: 'تاریخ',
  type: 'نوع',
  name2: 'نام',
  url2: 'آدرس',
  owner2: 'مالک',
  approver2: 'کومبو',
  dateRange2: 'زمان',
  type2: 'نوع',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'شخص اول',
    department: 'تهران، خیابان فرشته',
  },
  {
    key: '2',
    workId: '00002',
    name: 'شخص دوم',
    department: 'تهران، خیابان فرشته',
  },
  {
    key: '3',
    workId: '00003',
    name: 'شخص سوم',
    department: 'تهران، خیابان فرشته',
  },
];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="لیست خطاها"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper
        title="فرم پیشرفته"
        content="در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        wrapperClassName={styles.advancedForm}
      >
        <Card title="انبار" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'وارد کردن نام الزامی است' }],
                  })(<Input placeholder="نام" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'وارد کردن آدرس الزامی است' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="url"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: 'لطفا این مقدار را وارد کنید.' }],
                  })(
                    <Select placeholder="مالک">
                      <Option value="xiao">گزینه اول</Option>
                      <Option value="mao">گزینه دوم</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator('approver', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(
                    <Select placeholder="انتخال کنید">
                      <Option value="xiao">گزینه اول</Option>
                      <Option value="mao">گزینه دوم</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator('dateRange', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(
                    <RangePicker placeholder={['شروع', 'پایان']} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(
                    <Select placeholder="انتخاب کنید">
                      <Option value="private">گزینه اول</Option>
                      <Option value="public">گزینه دوم</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="کارد دوم" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator('name2', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(<Input placeholder="نام" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(<Input placeholder="آدرس" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(
                    <Select placeholder="انتخاب کنید">
                      <Option value="xiao">گزینه اول</Option>
                      <Option value="mao">گزینه دوم</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
         <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator('dateRange2', {
                    rules: [{ required: true, message: 'وارد کردن مقدار الزامی است' }],
                  })(
                    <TimePicker
                      placeholder="لطفا زمان را وارد کنید."
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="اعضاء" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
        <FooterToolbar style={{ width }}>

          <Button type="primary" onClick={this.validate} loading={submitting}>
            ثبت
          </Button>
          {this.getErrorInfo()}
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedForm;
