export const bookColumnsSchema = [
  {
    field: "title",
    headerName: "タイトル",
    flex: 2,
    editable: true,
  },
  { field: "author", headerName: "著者", flex: 1, editable: true },
  { field: "isbn", headerName: "ISBN", flex: 1, editable: true },
  {
    field: "publicationDate",
    headerName: "出版日",
    type: 'date',
    // valueGetter: (value) => value ? new Date(value) : null,
    valueFormatter: (value) => {
      if (!value) return '';
      return new Date(value).toLocaleDateString('ja-JP');
    },
    flex: 1,
    editable: true,
  },
];

export const bookNewRowSchema = {
  id: null,
  title: "",
  author: "",
  isbn: null,
  publicationDate: null,
  isNew: true, // 新規フラグ（保存時に判定用）
};