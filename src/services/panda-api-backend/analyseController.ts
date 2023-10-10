// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInvokeInterfaceInfo GET /api/analyse/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInvokeInfo>('/api/analyse/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}
