import { getLoginUserUsingGET } from '@/services/panda-api-backend/userController';
import {
  AntDesignOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { GridContent } from '@ant-design/pro-layout';
import { Avatar, Card, Col, message, Row } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const AccountCenter: React.FC = () => {
  const [userInfo, setUserInfo] = useState<API.LoginUserVO>();
  const [loading, setLoading] = useState(false);
  const [loadingCharts, setloadingCharts] = useState(false);

  const getUserInfoData = async () => {
    setLoading(true);
    try {
      const res = await getLoginUserUsingGET();
      setUserInfo(res.data);
      setLoading(false);
    } catch (e) {
      message.error('网络错误');
    }
  };
  useEffect(() => {
    getUserInfoData();
  }, []);

  const option = {
    dataset: [
      {
        dimensions: ['name', 'totalNum'],
        source: [
          ['接口1', 41],
          ['接口2', 20],
          ['接口3', 52],
          ['接口4', 37],
          ['接口5', 25],
          ['接口6', 19],
          ['接口7', 71],
          ['接口8', 36],
          ['接口9', 67],
        ],
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'totalNum', order: 'desc' },
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'totalNum' },
      datasetIndex: 1,
    },
  };

  return (
    <PageContainer title="个人中心">
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24} sm={24} xs={24}>
            <Card
              title={'个人信息'}
              bordered={false}
              style={{ marginBottom: 24 }}
              loading={loading}
            >
              <div>
                <p>
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                    src={userInfo?.userAvatar}
                  />
                </p>
                <p>
                  <ContactsOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  昵称：{userInfo?.userName}
                </p>
                <p>
                  <ContactsOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  账户：{userInfo?.userAccount}
                </p>
                <p>
                  <UserOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  简介：{userInfo?.userProfile}
                </p>

                <p>
                  <TeamOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  用户角色：
                  {userInfo?.userRole === 'user'
                    ? '普通用户'
                    : userInfo?.userRole === 'admin'
                    ? '管理员'
                    : userInfo?.userRole === 'vip'
                    ? '会员用户'
                    : '未知'}
                </p>
                <p>
                  <ClockCircleOutlined
                    style={{
                      marginRight: 8,
                    }}
                  />
                  注册时间：{userInfo?.createTime}
                </p>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24} sm={24} xs={24}>
            <Card title={'接口调用统计'}>
              <ReactECharts
                loadingOption={{
                  showLoading: loadingCharts,
                }}
                option={option}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};
export default AccountCenter;
