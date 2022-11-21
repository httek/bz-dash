export const RoleStatusOptions = [
  { value: 1, label: "正常" },
  { value: 0, label: "禁用" },
];

export const COLUMNS = [
  {
    title: "ID",
    fixed: "left",
    width: 100,
    ellipsis: true,
    align: "left",
    colKey: "id",
  },
  {
    title: "名称",
    fixed: "left",
    width: 200,
    ellipsis: true,
    align: "left",
    colKey: "name",
  },
  { title: "状态", colKey: "status", width: 200, cell: { col: "status" } },
  {
    title: "备注",
    ellipsis: true,
    colKey: "remarks",
  },
  {
    title: "创建时间",
    ellipsis: true,
    colKey: "created_at",
  },
  {
    colKey: "op",
    width: 150,
    title: "op-column",
    fixed: "right",
    cell: "op",
  },
];
