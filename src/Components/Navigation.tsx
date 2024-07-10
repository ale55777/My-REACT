import React from 'react';
import { Row, Col, Button } from 'antd';
import { HomeOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import './com.css';

const Navigation: React.FC = () => {
  return (
    <Row className="navigation-row" justify="space-between" align="middle">
      <Col className="logo" span={4}>
        <img src="m.png" alt="Logo" style={{ height: '40px', marginLeft: '10px' }} />
      </Col>
      <Col className="icons" span={16}>
        <Button className="icon-button" type="primary" shape="circle" icon={<HomeOutlined />} />
        <Button className="icon-button" type="primary" shape="circle" icon={<UserOutlined />} />
        <Button className="icon-button" type="primary" shape="circle" icon={<BellOutlined />} />
      </Col>
      <Col className="search" span={4}>

</Col>
    </Row>
  );
}

export default Navigation;



