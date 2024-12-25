import { Create, useForm } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select, Upload, message, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadThumbnail, deleteThumbnail } from "../../lib/supabase";
import { useState } from "react";
import ImageUploader from "../../components/images-upload";

export const BlogPostCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const [messageApi, contextHolder] = message.useMessage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
        setPreviewUrl(null);
        formProps.form?.setFieldsValue({ thumbnail: null });
      }
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      {contextHolder}
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Thumbnail"} name={["thumbnail"]}>
          <Input style={{ display: "none" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {previewUrl && (
              <Image src={previewUrl} alt='Thumbnail preview' width={200} style={{ marginBottom: "10px" }} />
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
        <Form.Item
          label={"Content"}
          name='content'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode='light' height={400} />
        </Form.Item>
        <Form.Item label='Images'>
          <ImageUploader />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"draft"}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "rejected", label: "Rejected" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
