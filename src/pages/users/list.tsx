import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { useCustom, useCustomMutation, type BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Input, Button, Popconfirm, notification } from "antd";
import { LockFilled, SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import type { InputRef } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface DataType {
  id: string;
  username: string;
  email: string;
  role: string;
}

type DataIndex = keyof DataType;

export const UserList = () => {
  const { tableProps, tableQueryResult } = useTable({
    syncWithLocation: true,
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const { mutate: block, isLoading: blockLoading } = useCustomMutation({
    mutationOptions: {
      onSettled: (_, error) => {
        if (error) return;
        notification.success({
          message: "User blocked successfully",
        });
        tableQueryResult.refetch();
      },
    },
  });

  const { mutate: unblock, isLoading: unblockLoading } = useCustomMutation({
    mutationOptions: {
      onSettled: (_, error) => {
        if (error) return;
        notification.success({
          message: "User unblocked successfully",
        });
        tableQueryResult.refetch();
      },
    },
  });

  const handleBlock = (id: string) => {
    block({
      url: `users/${id}/block`,
      method: "post",
      values: {},
    });
  };

  const handleUnblock = (id: string) => {
    unblock({
      url: `users/${id}/unblock`,
      method: "post",
      values: {},
    });
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const searchValue = e.target.value;
            setSelectedKeys(searchValue ? [searchValue] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey='id' pagination={false}>
        <Table.Column dataIndex='id' title={"ID"} />
        <Table.Column dataIndex='username' title={"Name"} {...getColumnSearchProps("username")} />
        <Table.Column dataIndex='email' title={"Email"} {...getColumnSearchProps("email")} />
        <Table.Column
          dataIndex='role'
          title={"Role"}
          render={(value: string) => <Tag color={value === "admin" ? "red" : "blue"}>{value.toUpperCase()}</Tag>}
        />
        <Table.Column
          dataIndex='blocked'
          title={"Status"}
          render={(value: boolean) => <Tag color={value ? "red" : "green"}>{value ? "Blocked" : "Active"}</Tag>}
        />

        <Table.Column
          title={"Actions"}
          dataIndex='actions'
          align='right'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.id} />
              <Popconfirm
                title='Are you sure?'
                onConfirm={() => {
                  if (record.blocked) {
                    handleUnblock(record.id as string);
                  } else {
                    handleBlock(record.id as string);
                  }
                }}
              >
                <Button
                  icon={<LockFilled />}
                  size='small'
                  danger={!record.blocked || undefined}
                  loading={blockLoading || unblockLoading}
                >
                  {record.blocked ? "Unblock" : "Block"}
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
