// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserInterfaceInfo POST /api/user_interfaceInfo/add */
export async function addUserInterfaceInfoUsingPOST(
  body: API.UserInterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user_interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserInterfaceInfo POST /api/user_interfaceInfo/delete */
export async function deleteUserInterfaceInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user_interfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** invokeCount PUT /api/user_interfaceInfo/invokeCount */
export async function invokeCountUsingPUT(
  body: API.InvokeCountRequest,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/user_interfaceInfo/invokeCount', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCurrentUserInterfaceInfoLeftCount GET /api/user_interfaceInfo/left/${param0} */
export async function getCurrentUserInterfaceInfoLeftCountUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentUserInterfaceInfoLeftCountUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseUserInterfaceInfoLeftCountVO>(
    `/api/user_interfaceInfo/left/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** updateUserInterfaceInfo POST /api/user_interfaceInfo/update */
export async function updateUserInterfaceInfoUsingPOST(
  body: API.UserInterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user_interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
