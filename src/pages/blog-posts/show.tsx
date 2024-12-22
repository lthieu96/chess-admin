import { DateField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Divider, Typography } from "antd";
import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

const { Title } = Typography;

export const BlogPostShow = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow();

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Content (preview)"}</Title>
      <Divider />
      <ReactMarkdown className={styles.reactMarkdown}>{`# ${record?.title}\n` + record?.content}</ReactMarkdown>
      <Divider />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
