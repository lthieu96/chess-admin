import { Edit, useForm } from "@refinedev/antd";
import { Button, Form, Input, message, Select, Upload, Image } from "antd";
import MDEditor from "@uiw/react-md-editor";
import { uploadThumbnail, deleteThumbnail } from "../../lib/supabase";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ImageUploader from "../../components/images-upload";

export const BlogPostEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});
  const [messageApi, contextHolder] = message.useMessage();
  const [previewUrl, setPreviewUrl] = useState(formProps.initialValues?.thumbnail);

  const handleUpload = async (file: File) => {
    try {
      const url = await uploadThumbnail(file, previewUrl || undefined);
      formProps.form?.setFieldsValue({ thumbnail: url });
      setPreviewUrl(url);
      return false;
    } catch (error: any) {
      messageApi.error(error.message);
      return false;
    }
  };

  const handleRemove = async () => {
    try {
      if (previewUrl) {
        await deleteThumbnail(previewUrl);
        setPreviewUrl(formProps.initialValues?.thumbnail);
        formProps.form?.setFieldsValue({ thumbnail: formProps.initialValues?.thumbnail });
      }
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      {contextHolder}
      <Form {...formProps} layout='vertical'>
        <Form.Item label='Title' name={["title"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Thumbnail' name={["thumbnail"]}>
          <Input style={{ display: "none" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {previewUrl && (
              <Image src={previewUrl} alt='Current thumbnail' width={200} style={{ marginBottom: "10px" }} />
            )}
            <Upload
              beforeUpload={handleUpload}
              maxCount={1}
              accept='image/*'
              showUploadList={true}
              onRemove={handleRemove}
            >
              <Button icon={<UploadOutlined />}>{previewUrl ? "Change Thumbnail" : "Upload Thumbnail"}</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item label='Content' name='content' rules={[{ required: true }]}>
          <MDEditor data-color-mode='light' height={400} />
        </Form.Item>
        <Form.Item label='Images'>
          <ImageUploader />
        </Form.Item>
        <Form.Item label='Status' name={["status"]} initialValue='draft' rules={[{ required: true }]}>
          <Select
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
