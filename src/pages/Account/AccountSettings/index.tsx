import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import { useState } from 'react';

const AccountCenter: React.FC = () => {
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            title={'修改头像'}
            bordered={false}
            style={{ marginBottom: 24 }}
            loading={loadingAvatar}
          ></Card>
        </Col>

        <Col lg={17} md={24}>
          <Card title={'修改个人信息'} loading={loadingUserInfo}>dadasda</Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default AccountCenter;
