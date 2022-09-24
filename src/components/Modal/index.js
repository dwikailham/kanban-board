import React from 'react'
import { Button, Modal, Form, Input } from 'antd';

export default function ModalClick({ isModalOpen, handleCancel, title = "Create Task", createItem, setNameItem, setProgressItem, nameItem, progressItem, loadingButton }) {

  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={createItem}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            loading={loadingButton}
            onClick={createItem}
            disabled={!nameItem || !progressItem}
          >
            Save Task
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label="Task Name" required >
            <Input placeholder="input task name" value={nameItem} onChange={(e) => setNameItem(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Progress"
            required
          >
            <Input placeholder="0%" style={{ width: "15%" }} value={progressItem} onChange={(e) => setProgressItem(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
