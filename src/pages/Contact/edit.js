import { Input, InputNumber, Form } from 'antd';
import React from 'react';
import request from '@/utils/request';
import { connect } from 'dva';

const EditableContext = React.createContext();


@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
class EditableCell extends React.Component {

  onChange(record , index , e){
    record[index] = e.target.value;
    // request('api/save-contact' , {id:record.key, target:index, value:e.target.value})
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/update',
    //   payload:{id:record.key, target:index, value:e.target.value}
    // });
  }

  getInput = (def, rec , ind) => {
    if (this.props.inputType === 'number') {
      return <InputNumber defaultValue={def} />;
    }
    return <Input defaultValue={def} onChange={(e)=>this.onChange(rec ,ind, e)} />;
  };

  renderCell = () => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {this.getInput(record[dataIndex] , record , dataIndex)}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

export {
  EditableCell,
  EditableContext,
};

