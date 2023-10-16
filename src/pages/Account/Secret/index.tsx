import {
  showCurrentUserSecretUsingGET,
  updateCurrentUserSecretUsingPUT
} from '@/services/panda-api-backend/userController';
import { PageContainer, ProField } from '@ant-design/pro-components';
import { Button, Card, Input, message, Typography, Modal, Space, Descriptions } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const { Paragraph, Text } = Typography;
const { confirm } = Modal;
/**
 * 主页
 * @constructor
 */
const Secret: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState<API.UserSecretVO>();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await showCurrentUserSecretUsingGET();
      setSecret(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);



  const updateUserSecret = () => {
    updateCurrentUserSecretUsingPUT().then(res => {
      if (!res.data) {
        message.error('修改失败，' + res.message);
        return
      }
      message.success("修改个人密钥成功")
      loadData()
    })
  }

  const showConfirm = () => {
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '确认需要更换您的密钥吗?更新后别忘记在项目中修改哦~',
      onOk() {
        updateUserSecret()
      },
      onCancel() {
      },
    });
  }
  return (
    <PageContainer title="个人密钥管理">
      <Card title="密钥" loading={loading}>
        <Card type="inner" title="accessKey">
          <Paragraph copyable code>
            {secret?.accessKey}
          </Paragraph>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={
            <p>
              <span>secretKey</span>
              <br />
              <Space>

                <Text type="danger" code>
                  个人密钥请妥善保管，若泄漏请及时更换！
                </Text>
                <Button onClick={showConfirm} type={"primary"} danger>更换</Button>
              </Space>
            </p>
          }
        >
          <Descriptions.Item label="密码">
            <ProField
              text={secret?.secretKey}
              valueType="password"
              mode={"read"}
            />
          </Descriptions.Item>


        </Card>
      </Card>
    </PageContainer>
  );
};

export default Secret;
