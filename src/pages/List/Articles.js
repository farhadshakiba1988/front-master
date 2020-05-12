import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Icon, Row, Col, Button } from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

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
        count: 5,
      },
    });
  },
})
class SearchList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  render() {
    const {
      form,
      list: { list },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;

    const owners = [
      {
        id: 'wzj',
        name: 'شخص اول',
      },
      {
        id: 'wjh',
        name: 'شخص دوم',
      },
      {
        id: 'zxx',
        name: 'شخص سوم',
      },
      {
        id: 'zly',
        name: 'شخص چهارم',
      },
      {
        id: 'ym',
        name: 'شخص پنجم',
      },
    ];

    const IconText = ({ type, text }) => (
      <span>
        {text}
        <Icon type={type} style={{ marginRight: 8 }} />
      </span>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> ...
              </span>
            ) : (
              'موارد بیشتر'
            )}
          </Button>
        </div>
      ) : null;

    return (
      <Fragment>
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
            <StandardFormRow title="ایجاد کننده" grid>
              <Row>
                <Col lg={16} md={24} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('ایجاد کننده', {
                      initialValue: ['گزینه اول', 'گزینه دوم'],
                    })(
                      <Select
                        mode="multiple"
                        style={{ maxWidth: 286, width: '100%' }}
                        placeholder="لطفا انتخاب کنید"
                      >
                        {owners.map(owner => (
                          <Option key={owner.id} value={owner.id}>
                            {owner.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="گزینه های دیگر" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="گزینه اول">
                    {getFieldDecorator('user', {})(
                      <Select placeholder="انتخاب کنید" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">گزینه اول</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="گزینه دوم">
                    {getFieldDecorator('rate', {})(
                      <Select placeholder="انتخاب کنید" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="good">گزینه اول</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}

                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.like} />,
                  <IconText type="message" text={item.message} />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>برچسب اول</Tag>
                      <Tag>برچسب دوم</Tag>
                    </span>
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default SearchList;
