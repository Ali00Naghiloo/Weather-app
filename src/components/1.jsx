import { useState } from 'react';
import './1.css'
import { StepForwardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function Hello (){
  return (
    <div className='body'>
      <StepForwardOutlined />
      <Button type='primary'>Click</Button>
    </div>
  );
};

export default Hello;