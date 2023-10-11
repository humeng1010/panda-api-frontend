import { listTopInvokeInterfaceInfoUsingGET } from '@/services/panda-api-backend/analyseController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInvokeInfo[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    //  从远程获取数据
    try {
      listTopInvokeInterfaceInfoUsingGET().then((res) => {
        if (res.data){
          setData(res.data);
        }
      });
    } catch (e: any) {}
    setLoading(false)
  }, []);
  //映射Data
  const chartData = data.map(item=>{
    return {
      value: item.totalNum,
      name: item.name
    }
  })
  const option = {
    title: {
      text: '调用次数最多的接口',
      subtext: 'TOP5',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer>
      <ReactECharts
        loadingOption={{
          showLoading: loading,
        }}
        option={option}
      />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
