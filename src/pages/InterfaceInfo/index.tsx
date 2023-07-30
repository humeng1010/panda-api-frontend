import {
  getInterfaceInfoVOByIdUsingGET, invokeInterfaceInfoUsingPOST
} from '@/services/panda-api-backend/interfaceInfoController';
import { useParams } from "@@/exports";

import {Button, Card, Descriptions, Divider, Form, Input, message} from 'antd';
import React,{ useEffect,useState } from 'react';
import {PageContainer} from "@ant-design/pro-components";

import { Typography } from 'antd';

const { Paragraph } = Typography;
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const params = useParams()


  const loadData = async () => {
    if(!params.id){
      message.error("参数不存在")
      return
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoVOByIdUsingGET({id:Number(params.id)});
      if (res.code === 0){
        setData(res.data)
      }
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values:any) => {
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
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
      setInvokeRes("")
    }
    setInvokeLoading(false);
  };
  return (
    <PageContainer title="查看接口文档">
      <Card loading={loading}>

        <Card>
          {data ? (
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求地址">
                <Paragraph  code copyable>{data.url}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="请求方法">
                <Paragraph  code copyable>{data.method}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="请求头">
                <Paragraph  code copyable>{data.requestHeader}</Paragraph>
                </Descriptions.Item>
              <Descriptions.Item label="请求参数">
                <Paragraph  code copyable>{data.requestParams}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="响应头">
                <Paragraph  code copyable>{data.responseHeader}</Paragraph>

                </Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>接口不存在</>
          )}
        </Card>
        <Divider />
        <Card title="在线测试">
          <Form name="invoke" layout="vertical" onFinish={onFinish}>
            <Form.Item label="请求参数" name="userRequestParams">
              <Input.TextArea autoSize/>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }}>
              <Button type="primary" htmlType="submit">
                调用
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Divider />
        <Card title="返回结果" loading={invokeLoading}>
          {invokeRes}
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Index;
