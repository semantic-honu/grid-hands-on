export const reviewColumnsSchema = [
    {
        field: "reviewer",
        headerName: "レビュアー",
        flex: 1,
        editable: true,
    },
    { field: "rating", headerName: "評価", flex: 1, editable: true },
    {
        field: "comment",
        headerName: "コメント",
        flex: 2,
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