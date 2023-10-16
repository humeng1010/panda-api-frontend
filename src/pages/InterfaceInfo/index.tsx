import {
  getInterfaceInfoVOByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/panda-api-backend/interfaceInfoController';
import { useParams } from '@@/exports';

import { PageContainer, ProField } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Form, Input, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { getCurrentUserInterfaceInfoLeftCountUsingGET } from '@/services/panda-api-backend/userInterfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Paragraph } = Typography;
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const [leftData, setLeftData] = useState<API.UserInterfaceInfoLeftCountVO>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const params = useParams();

  const loadLeftData = async () => {
    const res2 = await getCurrentUserInterfaceInfoLeftCountUsingGET({ id: Number(params.id) });
    if (res2.code === 0) {
      setLeftData(res2.data);
    }
  };
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoVOByIdUsingGET({ id: Number(params.id) });
      if (res.code === 0) {
        setData(res.data);
      }
      loadLeftData();
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const [image, setImage] = useState("");
  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });

      setInvokeRes(res.data);
      // 处理随机图片显示
      if (data?.responseHeader === 'image') {
        setImage(JSON.parse(res?.data as any).data)
      }
      message.success('请求成功');
      // 重新加载剩余次数
      loadLeftData();
    } catch (error: any) {
      message.error('操作失败，' + error.message);
      setInvokeRes('');
    }
    setInvokeLoading(false);
  };


  const buyLeftNum = () => {
    message.warning('开发中');
  };
  const openVIP = () => {
    message.warning('开发中');
  };
  return (
    <PageContainer title="查看接口文档">
      <Card loading={loading}>
        <Card>
          {data ? (
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">
                {data.status ? (
                  <span style={{ color: 'green', fontWeight: 800 }}>开启</span>
                ) : (
                  <span style={{ color: 'red', fontWeight: 800 }}>关闭</span>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求地址">
                <Paragraph code copyable>
                  {data.url}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="请求方法">
                <Paragraph code copyable>
                  {data.method}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="请求头">
                <Paragraph code copyable>
                  {data.requestHeader}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="请求参数">
                <Paragraph code copyable>
                  {data.requestParams}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="响应头">
                <Paragraph code copyable>
                  {data.responseHeader}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>接口不存在</>
          )}
        </Card>
        <Divider />
        <Card title="额度信息">
          <Descriptions>
            <Descriptions.Item label="您已调用该接口的次数">{leftData?.totalNum}</Descriptions.Item>
            <Descriptions.Item label="剩余调用次数">
              <Space>
                {leftData?.leftNum}
                <Button
                  type={'primary'}
                  size={'small'}
                  icon={<PlusOutlined />}
                  onClick={buyLeftNum}
                />
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Divider />
        <Card title="在线测试">
          <Form name="invoke" layout="vertical" onFinish={onFinish}>
            {data?.requestParams === 'null' ? (
              ''
            ) : (
              <Form.Item label="请求参数" name="userRequestParams">
                <Input.TextArea autoSize defaultValue={data?.requestParams} />
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ span: 16 }}>
              {leftData?.leftNum === 0 ? (
                <Space>
                  <Button type="primary" danger onClick={buyLeftNum}>
                    购买调用次数
                  </Button>
                  or
                  <Button type="primary" onClick={openVIP}>
                    开通VIP
                  </Button>
                </Space>
              ) : (
                <Button type="primary" htmlType="submit">
                  调用
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>
        <Divider />
        <Card title="返回结果" loading={invokeLoading}>
          {data?.responseHeader === 'json' ? (
            <ProField text={invokeRes} valueType={'jsonCode'} mode={'read'} />
          ) : data?.responseHeader === 'image' ? (
            <Descriptions column={1}>
              <Descriptions.Item label="结果">
                <ProField text={invokeRes} valueType={'jsonCode'} mode={'read'} />
              </Descriptions.Item>
              <Descriptions.Item label="图片">
                <ProField text={image} mode={'read'} valueType={'image'}></ProField>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <ProField text={invokeRes} mode={'read'} valueType={'text'}></ProField>
          )}
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Index;
