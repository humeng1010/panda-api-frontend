import { userLogoutUsingPOST } from '@/services/panda-api-backend/userController';
import {
  ExclamationCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  PayCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Modal, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import {flushSync} from "react-dom";

const { confirm } = Modal;
export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  return <span className="anticon">{loginUser?.userName}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPOST();
    if (window.location.pathname !== '/user/login') {
      history.replace({
        pathname: '/user/login',
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        confirm({
          title: '提示',
          icon: <ExclamationCircleOutlined />,
          content: '确定要退出吗？',
          onOk() {
            flushSync(() => {
              setInitialState((s: any) => ({ ...s, loginUser: undefined }));
            });
            loginOut();
            history.push(`/account/${key}`);
            return;
          },
          onCancel() {
          },
        });
      }
      if (key === 'aksk') {
        history.push('/account/secret');
      }
      if (key === 'me') {
        history.push('/account/accountcenter');
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { loginUser } = initialState;

  if (!loginUser || !loginUser.userName) {
    return loading;
  }

  const menuItems = [
    {
      key: 'me',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'vip',
      icon: <PayCircleOutlined />,
      label: '开通会员',
    },
    {
      key: 'aksk',
      icon: <LockOutlined />,
      label: '个人密钥',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
