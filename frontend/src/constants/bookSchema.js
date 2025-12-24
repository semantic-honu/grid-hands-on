export const bookColumnsSchema = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "title",
        headerName: "タイトル",
        width: 250,
        editable: true,
    },
    { field: "author", headerName: "著者", width: 200, editable: true },
    { field: "isbn", headerName: "ISBN", width: 200, editable: true },
    {
        field: "publicationDate",
        headerName: "出版日",
        type: 'date',
        // valueGetter: (value) => value ? new Date(value) : null,
        valueFormatter: (value) => {
            if (!value) return '';
            return new Date(value).toLocaleDateString('ja-JP');
        },
        width: 200,
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