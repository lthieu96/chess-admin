import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout='vertical' style={{ maxWidth: 200 }}>
        <Form.Item label='Role' name={["role"]} rules={[{ required: true }]}>
          <Select>
            <Select.Option value='admin'>Admin</Select.Option>
            <Select.Option value='user'>User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
