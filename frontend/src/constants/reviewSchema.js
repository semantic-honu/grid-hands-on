export const reviewColumnsSchema = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "reviewer",
        headerName: "レビュアー",
        width: 250,
        editable: true,
    },
    { field: "rating", headerName: "評価", width: 250, editable: true },
    {
        field: "comment",
        headerName: "コメント",
        flex: 1,
        minWidth: 200,
        editable: true,
    },
];

export const reviewNewRowSchema = {
    id: null,
    reviewer: "",
    rating: "5",
    comment: null,
    isNew: true, // 新規フラグ（保存時に判定用）
};