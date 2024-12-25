import { useState } from "react";
import { Button, Image, message, Upload } from "antd";
import { CopyOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { supabase } from "../lib/supabase";

interface ImageUploaderProps {
  multiple?: boolean;
}

const ImageUploader = ({ multiple = true }: ImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);

      // Create unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage.from("blog-thumbnails").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-thumbnails").getPublicUrl(filePath);

      // Update state
      setImageUrls((prev) => (multiple ? [...prev, publicUrl] : [publicUrl]));

      message.success("Upload success!");
    } catch (error) {
      message.error("Upload failed! Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (url: string) => {
    setImageUrls((prev) => prev.filter((item) => item !== url));
  };

  const handleCopy = (url: string) => {
    copy(url);
    message.success("Copied to clipboard!");
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        accept='image/*'
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        multiple
      >
        <Button icon={<PlusOutlined />}>Upload Image</Button>
      </Upload>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {imageUrls.map((url) => (
          <div key={url} style={{ position: "relative" }}>
            <Image width={100} src={url} />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                gap: 4,
                background: "rgba(255, 255, 255, 0.8)",
                padding: 4,
              }}
            >
              <Button size='small' icon={<CopyOutlined />} onClick={() => handleCopy(url)} />
              <Button size='small' danger onClick={() => handleRemove(url)}>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUploader;
