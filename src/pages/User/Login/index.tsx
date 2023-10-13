import Footer from '@/components/Footer';
import {userLoginUsingPOST, userRegisterUsingPOST} from '@/services/panda-api-backend/userController';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs} from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('login');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });


  const handleSubmit = async (values: API.UserLoginRequest | API.UserRegisterRequest) => {
    if (type==="login"){
      try {
        // 登录
        const res = await userLoginUsingPOST({
          ...values,
        });
        if (res.data) {
          setInitialState({
            loginUser: res.data
          });
          setTimeout(()=>{
            message.success("登录成功")
            history.push('/');
          },100)
          return;
        }
      } catch (error) {
        const defaultLoginFailureMessage = '登录失败，请重试！';
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    }else if (type === "register"){
      // 校验密码
      const {userPassword, checkPassword} = values as API.UserRegisterRequest
      if (userPassword !== checkPassword) {
        message.error("两次输入的密码不一致");
        return
      }
      try {
        // 注册
        const userId = await userRegisterUsingPOST(values);
        if (userId.data) {
          const defaultRegisterSuccessMessage = '注册成功！';
          message.success(defaultRegisterSuccessMessage);
          setTimeout(() => {
            setType("login")
          }, 30)
        }
      } catch (error) {
        const defaultLoginFailureMessage = '注册失败，请重试！';
        message.error(defaultLoginFailureMessage);
      }
    }

  };


  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{searchConfig: {submitText: type==="login"?'登录':'注册'}}}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/favicon.ico" />}
          title="胖达api接口在线平台-登录"
          subTitle={'胖达api接口在线平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}

        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'login',
                label: '登录',
              },
              {
                key: 'register',
                label: '注册',
              },
            ]}
          />

          {type === 'login' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 4,
                    type: "string",
                    message: '用户名长度不能少于4位'
                  },
                  {
                    pattern: new RegExp("^[a-zA-z]\\w{3,15}$"),
                    message: '字母、数字、下划线组成，字母开头，4-16位'
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能少于8位'
                  }
                ]}
              />
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  忘记密码 ?
                </a>
              </div>
            </>
          )}



          {/* 注册*/}
          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入您的用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 4,
                    type: "string",
                    message: '用户名长度不能少于4位'
                  },
                  {
                    pattern: new RegExp("^[a-zA-z]\\w{3,15}$"),
                    message: '字母、数字、下划线组成，字母开头，4-16位'
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能少于8位'
                  }
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能少于8位'
                  }
                ]}
              />
            </>
          )}

        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
