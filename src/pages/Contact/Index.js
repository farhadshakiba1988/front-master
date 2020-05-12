import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import { EditableCell, EditableContext } from './edit';
import {
  Tag,
  Collapse,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Dropdown,
  Icon,
  Input,
  Menu,
  Row,
  Tooltip,
  Typography,
  Popover, Popconfirm, Table,
} from 'antd';
import { connect } from 'dva';
import moment from 'jalali-moment';
import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';

const { Paragraph } = Typography;

const Panel = Collapse.Panel;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const status = ['اول', 'دوم', 'سوم', 'چهارم'];
const statusMap = ['default', 'processing', 'success', 'error'];

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
class Index extends PureComponent {


  constructor(props) {
    super(props);
    this.tbl = React.createRef();
  }

  state = {
    selectedRows: [],
    visiblePreviewDrawer: false,
    globalTextSearch: undefined,
    formValues: {},
    activeDrawer: {},
    editingKey: undefined,
    searchText: '',
  };


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`جستجو `}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginLeft: 8 }}
        >
          جستجو
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          ریست
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}/>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleGlobalSearch = (value) => {
    this.setState({
      globalTextSearch: (value != '') ? value : undefined,
    }, () => {
      const cs = this.tbl.current.tbl.current.state;
      const sort = {};
      if (cs.sortColumn) {
        sort.columnKey = cs.sortColumn.dataIndex;
        sort.field = cs.sortColumn.dataIndex;
        sort.order = cs.sortOrder;
      }
      this.handleStandardTableChange(cs.pagination, cs.filters, sort);
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  save = (form, key) => {
    this.setState({ editingKey: undefined });
    const { dispatch } = this.props;
    const payload = _.find(this.props.rule.data.list, function(o) { return o.key == key; });
    dispatch({
      type: 'rule/add',
      payload,
      callback(){
        dispatch({
          type: 'rule/fetch',
        });
      }
    });

  };


  cancel = () => {
    this.setState({ editingKey: undefined });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  isEditing = record => record.key === this.state.editingKey;


  columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      width: '300px',
      editable: true,
      ...this.getColumnSearchProps('name'),
      render: this.renderName.bind(this),
    },
    {
      title: 'شماره',
      editable: true,
      dataIndex: 'callNo',
      sorter: true,
      render: val => `${val}`,
      needTotal: true,
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]}/>;
      },
    },
    {
      title: 'بروزرسانی',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'تگ ها',
      dataIndex: 'tags',
      sorter: true,
      render: val => (
        <span>
          <Tag color="cyan">اول</Tag>
          <Tag color="blue">دوم</Tag>
          <Tag color="geekblue">سوم</Tag>
          <Tag color="purple">چهارم</Tag>
        </span>
      ),
    },
    {
      title: 'عملیات',
      dataIndex: 'operation',
      width:'200px',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        // const editable = true;
        return editable ? (
          <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.key)}
                    style={{ marginLeft: 8 }}
                  >
                    ذخیره
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="آیا مطمئنید ؟" onConfirm={() => this.cancel(record.key)}>
                <a>بی خیال</a>
              </Popconfirm>
            </span>
        ) : (
          <a disabled={editingKey !== undefined} onClick={() => this.edit(record.key)}>
            ویرایش
          </a>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleMenuClick() {
  }

  handlePreviewClick(rec) {
    let drawer = Object.assign({}, this.state.activeDrawer);
    drawer.title = rec.href;
    this.setState(prev => ({
      activeDrawer: { ...prev.activeDrawer, title: rec.name },
      visiblePreviewDrawer: true,
    }));
  }

  handleClosePreviewDrawer() {
    this.setState({
      visiblePreviewDrawer: false,
    });
  }

  renderName(val, rec) {
    return (
      <div className={styles.hoverView}>
        <Tooltip placement="top" title={rec.href}>
          <Avatar size="small" icon="user"/>
        </Tooltip>
        <Tooltip placement="top" title={rec.href}>
          <a href="">{val}</a>
        </Tooltip>
        <Button size="small" onClick={() => this.handlePreviewClick(rec)}>
          نمایش
        </Button>
      </div>
    );
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    if (this.state.globalTextSearch && this.state.globalTextSearch != '') {
      Object.assign(filtersArg, { global: [this.state.globalTextSearch] });
    } else {
      delete filtersArg.global;
    }
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});


    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  renderDrawer() {
    const head = (
      <Row type="flex" style={{ height: '32px' }} align="middle">
        <Col span={20}>
          <span className="b"> {this.state.activeDrawer.title}</span>
        </Col>
        <Col style={{ textAlign: 'left' }} span={4}>
          <Button
            type="link"
            shape="circle"
            style={{ color: 'white' }}
            icon="close"
            size="small"
            onClick={this.handleClosePreviewDrawer.bind(this)}
          />
        </Col>
      </Row>
    );

    const text = (
      <div>
        <p style={{ paddingLeft: 24 }}>
          چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
          تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </p>
        <div style={{ textAlign: 'center' }}>
          <Button>افزودن</Button>
        </div>
      </div>
    );

    const edit = <div>قسمت ویرایش</div>;
    return (
      <Drawer
        title={head}
        placement="right"
        className="custom-drawer fix-head"
        closable={false}
        width="400px"
        onClose={this.handleClosePreviewDrawer.bind(this)}
        visible={this.state.visiblePreviewDrawer}
      >
        <div style={{ textAlign: 'center' }}>
          <Avatar size={80} icon="user"/>
          <div>
            <span  style={{ fontSize: '20px' }}>
              {this.state.activeDrawer.title}
            </span>
            <Popover placement="bottomLeft" title="ویرایش پروفایل" content={edit} trigger="click">
              <Button type="link" size="large" icon="edit"/>
            </Popover>
          </div>
        </div>
        <Divider style={{ marginBottom: 0 }}/>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="درباره کاننکت" key="1">
            {text}
          </Panel>
          <Panel header="شرکت ها" key="2">
            {text}
          </Panel>
          <Panel header="معاملات" key="3">
            {text}
          </Panel>

          <Panel header="تیکت ها" key="4">
            {text}
          </Panel>
        </Collapse>
        <footer className="ant-drawer-footer">
          <Button type="primary" size="large" onClick={this.handleClosePreviewDrawer.bind(this)}>
            نمایش رکورد
          </Button>
        </footer>
      </Drawer>
    );
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">ویرایش ستون ها</Menu.Item>
        <Menu.Item key="2">ویرایش خصیصه ها</Menu.Item>
      </Menu>
    );
    const { selectedRows } = this.state;
    const extraContent = (
      <Row>
        <Col lg={12}>
          <div>کانتکت</div>
        </Col>
        <Col lg={12} className={styles.leftScreen}>
          <Input.Search
            placeholder="در جدول جستجو کنید."
            size="large"
            onSearch={this.handleGlobalSearch}
            style={{ width: 200 }}
          />
          <Button type="primary" size="large" className={styles.buttonGap}>
            ایجاد کانتکت
          </Button>
          <Button type="default" size="large" className={styles.buttonGap}>
            وارد کردن دسته جمعی
          </Button>
          <Dropdown overlay={menu} size="large">
            <Button size="large" className={styles.buttonGap}>
              عملیات <Icon type="down"/>
            </Button>
          </Dropdown>
        </Col>
      </Row>
    );
    return (
      <PageHeaderWrapper title={extraContent}>
        {this.renderDrawer()}
        <Card bordered={false}>
          <Row gutter={4}>
            <Col lg={4}>
              <Button type="link" className="tar" size="large" block>
                تمامی کانتکت ها
              </Button>
              <Button type="link" size="large" className="tar" block>
                دوستان
              </Button>
            </Col>
            <Col lg={20}>
              <Form>
                <div className={[styles.nohover, styles.bordered].join(' ')}>
                  <EditableContext.Provider value={this.props.form}>
                    <StandardTable
                      ref={this.tbl}
                      components={components}
                      selectedRows={selectedRows}
                      hideDefaultSelections={false}
                      loading={loading}
                      data={data}
                      columns={columns}
                      onSelectRow={this.handleSelectRows}
                      onChange={this.handleStandardTableChange.bind(this)}
                    />
                  </EditableContext.Provider>
                </div>
              </Form>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Index;
