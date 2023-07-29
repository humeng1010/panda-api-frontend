import {
  ProColumns, ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type Props = {
  values: API.RuleListItem | undefined;
  columns: ProColumns<API.InterfaceInfoVO>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoVO) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const {values,columns,visible,onCancel,onSubmit} = props

  const formRef = useRef<ProFormInstance>();

  useEffect(()=>{
    formRef.current?.setFieldsValue(values)
  },[values])

  return (
    <Modal open={visible} onCancel={()=>onCancel?.()} footer={null}>
      {/*// @ts-ignore*/}
      <ProTable type={"form"} columns={columns}
                formRef={formRef}
                onSubmit={async (value)=>{
        onSubmit?.(value);
      }}/>
    </Modal>

  );
};
export default UpdateModal;
