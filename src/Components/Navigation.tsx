import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined, CloseOutlined, HomeOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
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
        <Input
          className="navigation-input"
          placeholder="Search"
          prefix={<SearchOutlined />}
          suffix={<CloseOutlined />}
        />
      </Col>
    </Row>
  );
}

export default Navigation;



