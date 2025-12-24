

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        404 - ページが見つかりません
      </Typography>
      <Typography variant="body1">
        お探しのページは存在しません。
      </Typography>
    </Box>
  );
};

export default NotFound;