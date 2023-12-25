import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import axios from 'axios';

const schema = {
  title: 'Lưu trữ dữ liệu khối lượng',
  type: 'object',
  required: ['ten', 'khoiLuong'],
  properties: {
    ten: { type: 'string', title: 'Tên Sản Phẩm:' },
    khoiLuong: { type: 'number', title: 'Khối Lượng:ㅤ' },
  },
};

const uiSchema = {
  'ui:title': (
    <div style={{ fontSize: '2em', fontWeight: 'bold', textAlign: 'justify' }}>
      Lưu trữ dữ liệu khối lượng
    </div>
  ),
  ten: {
    'ui:widget': 'text',
    'ui:options': {
      classNames: 'custom-input',
      style: { fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' },
    },
  },
  khoiLuong: {
    'ui:widget': 'text',
    'ui:options': {
      classNames: 'custom-input',
      style: { fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' },
    },
  },
};

const setpointSchema = {
  title: 'Cập nhật giá trị Setpoint',
  type: 'object',
  required: ['setpoint'],
  properties: {
    setpoint: { type: 'number', title: 'Setpoint:ㅤㅤㅤ' },
  },
};

const setpointUiSchema = {
  'ui:title': (
    <div style={{ fontSize: '2em', fontWeight: 'bold', textAlign: 'center' }}>
      Cập nhật giá trị Setpoint
    </div>
  ),
  setpoint: {
    'ui:options': {
      classNames: 'custom-input',
      style: { fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' },
    },
  },
};

const MyComponent = () => {
  const [formData, setFormData] = useState({});
  const [setpointFormData, setSetpointFormData] = useState({});

  const handleDataSubmit = async ({ formData }) => {
    try {
      console.log('Dữ liệu gửi đi:', formData);
      const response = await axios.post(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-fmace/endpoint/post_1',
        formData
      );

      console.log('Kết quả từ server:', response.data);
      setFormData({});
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  const handleSetpointSubmit = async ({ formData }) => {
    try {
      console.log('Dữ liệu setpoint gửi đi:', formData);
      await axios.post(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-fmace/endpoint/post_setpoint',
        formData
      );

      setSetpointFormData({});
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu setpoint:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <Form
        schema={setpointSchema}
        validator={validator}
        formData={setpointFormData}
        onChange={({ formData }) => setSetpointFormData(formData)}
        onSubmit={handleSetpointSubmit}
        uiSchema={setpointUiSchema}
      />
      <div style={{ margin: '20px' }}></div>
      <Form
        schema={schema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleDataSubmit}
        uiSchema={uiSchema}
      />
    </div>
  );
};

export default MyComponent;
