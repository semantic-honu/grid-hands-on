import GenericGrid from "../components/GenericGrid";
import { useState } from "react";

const initialAuthors = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Author ${i + 1}`,
  country: `Country ${i + 1}`,
  genre: `Genre ${i + 1}`,
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "著者名", width: 200 },
  { field: "country", headerName: "国籍", width: 150 },
  { field: "genre", headerName: "得意ジャンル", width: 180 },
];

const AuthorsPage = () => {
  const [authors, setAuthors] = useState(initialAuthors);

  return <GenericGrid rows={authors} columns={columns} setRows={setAuthors} />;
};

export default AuthorsPage;
