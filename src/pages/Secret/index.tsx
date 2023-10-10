import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {Button, Card, message, Typography} from 'antd';
import { listInterfaceInfoVOByPageUsingPOST } from '@/services/panda-api-backend/interfaceInfoController';

const { Paragraph,Text } = Typography;
/**
 * 主页
 * @constructor
 */
const Secret: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfoVO[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoVOByPageUsingPOST({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="个人密钥管理">
      <Card title="密钥">
        <Card type="inner" title="accessKey">
          <Paragraph copyable code>
            panda
          </Paragraph>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={<p>
            <span>secretKey</span>
            <br/>
            <Text type="danger" code>
              个人密钥请妥善保管，若泄漏请及时更换！
            </Text>
        </p>}
          extra={<Button danger>更换</Button>}
        >
          <Paragraph copyable code>
            12345678
          </Paragraph>
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Secret;
