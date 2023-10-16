import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type Props = {
  columns: ProColumns<API.InterfaceInfoVO>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoVO) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit } = props
  return (
    <Modal open={visible} onCancel={() => onCancel?.()} footer={null}>
      {/*// @ts-ignore*/}
      <ProTable type={"form"} columns={columns} onSubmit={async (value) => {
        onSubmit?.(value);
      }} />
    </Modal>

  );
};
export default CreateModal;
