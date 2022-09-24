import React from 'react'
import { Button, Modal, Form, Input } from 'antd';

export default function ModalClick({ updateItem, isModalOpen, handleCancel, titleModal, createItem, setNameItem, setProgressItem, nameItem, progressItem, loadingButton }) {

  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title={titleModal}
        open={isModalOpen}
        onOk={titleModal === "Create Task" ? createItem : updateItem}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            loading={loadingButton}
            onClick={titleModal === "Create Task" ? createItem : updateItem}
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
