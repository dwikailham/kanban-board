import React, { useState } from 'react'
import { Button, Modal, Checkbox, Form, Input, Radio } from 'antd';

export default function ModalClick({ isModalOpen, handleOk, handleCancel, title = "Create Task" }) {


  const [form] = Form.useForm();

  return (
    <div>
      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label="Task Name" required >
            <Input placeholder="input task name" />
          </Form.Item>
          <Form.Item
            label="Progress"
            required
          >
            <Input placeholder="0%" style={{ width: "15%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
