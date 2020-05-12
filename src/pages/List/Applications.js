import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu } from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import { formatWan } from '@/utils/utils';

import styles from './Applications.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  },
})
class FilterCardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      list: { list },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>تعداد کاربر</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>تعداد رای</p>
          <p>{newUser}</p>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
            گزینه اول
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
            گزینه دوم
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
            گزینه سوم
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="دسته بندی" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">اول</TagSelect.Option>
                    <TagSelect.Option value="cat2">دوم</TagSelect.Option>
                    <TagSelect.Option value="cat3">سوم</TagSelect.Option>
                    <TagSelect.Option value="cat4">چهارم</TagSelect.Option>
                    <TagSelect.Option value="cat5">پنجم</TagSelect.Option>
                    <TagSelect.Option value="cat6">ششم</TagSelect.Option>
                    <TagSelect.Option value="cat7">هفتم</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="فیلتر ها" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="فیلتر اول">
                    {getFieldDecorator('author', {})(
                      <Select placeholder="انتخاب کنید" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">گزینه اول</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip title="دانلود">
                    <Icon type="download" />
                  </Tooltip>,
                  <Tooltip title="ویرایش">
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip title="اشتراک گذاری">
                    <Icon type="share-alt" />
                  </Tooltip>,
                  <Dropdown overlay={itemMenu}>
                    <Icon type="ellipsis" />
                  </Dropdown>,
                ]}
              >
                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    activeUser={formatWan(item.activeUser)}
                    newUser={numeral(item.newUser).format('0,0')}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default FilterCardList;
