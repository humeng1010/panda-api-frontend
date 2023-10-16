import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;



/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  return (
    <PageContainer title="接口使用说明">
      <Typography>
        <Title>介绍</Title>
        <Paragraph>
          在这里介绍一下如何在项目中调用接口：
          <ul>
            <li>
              <span>使用SDK一行代码调用接口(快速、方便)</span>
            </li>
            <li>
              <span>自己手动编写调用接口的请求(灵活)</span>
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          panda-Api
          接口开放平台目前支持在SpringBoot项目中使用SDK一行代码调用接口，基于SpringBoot的starter开发。
          <Paragraph>
            首先需要再<Text code>pom.xml</Text>中引入依赖
          </Paragraph>
          <Paragraph code>
            {
              `
<dependency>
    <groupId>com.panda</groupId>
    <artifactId>panda-api-sdk-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>
                  `
            }
          </Paragraph>
          <Paragraph>
            在application.yml中配置自己的ak、sk，如下：
            panda:
            client:
            access-key: xxx
            secret-key: xxx
            之后就可以在项目中使用<Text mark>PanApiClient</Text>调用接口
          </Paragraph>


        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default Index;
