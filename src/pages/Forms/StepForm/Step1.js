import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/form/step-form/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="ایمیل">
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: 'ایمیل' }],
            })(
              <Select placeholder="test@example.com">
                <Option value="info@example.com">info@example .com</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="گیرنده">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">گزینه اول</Option>
                <Option value="bank">گزینه دوم</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: 'وارد کردن فیلد الزامی است.' },
                  { type: 'email', message: 'ایمیل وارد شده اشتباه است' },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com"/>)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="نام پرداخت کننده">
            {getFieldDecorator('receiverName', {
              initialValue: data.receiverName,
              rules: [{ required: true, message: 'وارد کردن فیلد الزامی است.' }],
            })(<Input placeholder="پرداخت کننده" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="مبلغ">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: 'وارد کردن فیلد الزامی است.' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'لطفا مبلغ را به عدد وارد کنید',
                },
              ],
            })(<Input prefix="ریال" placeholder="مبلغ" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              مرحله بعدی
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>عنوان </h3>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
            با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه
            و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ
            پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
            شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای
            موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
