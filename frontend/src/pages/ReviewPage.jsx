import { useQuery } from "@tanstack/react-query";
import { fetchBooksApi } from "../api/bookApi";
import { Box, Stack, Typography, Skeleton, Alert, AlertTitle } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ReviewListSection } from "../components/ReviewListSection";

export const ReviewPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await fetchBooksApi();
    },
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  // スケルトン表示（読み込み中のプレースホルダー）
  if (isLoading) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              p: 2,
              border: '1px solid #f0f0f0',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: '12px', mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="30%" height={16} />
            </Box>
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <AlertTitle>読み込みエラー</AlertTitle>
          本のデータの取得に失敗しました。時間をおいて再度お試しください。
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {data?.map((book) => (
        <Accordion
          key={book.id}
          elevation={0}
          disableGutters
          // 閉じている間はDOMから削除し、通信を発生させない
          slotProps={{ transition: { unmountOnExit: true } }}
          sx={{
            borderTop: '1px solid #e0e0e0',
            mb: 2,
            '&:last-of-type': {
              borderBottom: '1px solid #e0e0e0',
            },
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.2rem', color: 'text.secondary' }} />}
            sx={{
              '&:hover': { backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f8f8f8' : '#333' },
              // クリック時のフォーカス枠を完全に消す
              '&.Mui-focusVisible': { backgroundColor: 'transparent' },
              '& .MuiAccordionSummary-content': { m: 0 },
              borderBottom: (theme) => `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#333'}`,
              outline: 'none',
              px: 2,
              py: 1,
              minHeight: '56px',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', minWidth: 0 }}>
              {/* アイコンを控えめなグレーの円で囲む */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f0f0f0' : '#2d2d2d',
                  color: 'text.secondary',
                  flexShrink: 0,
                }}
              >
                <MenuBookIcon sx={{ fontSize: '1.1rem' }} />
              </Box>

              {/* 文字情報をDataGridのセルのような端正なスタイルに */}
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    // ライトモード時は柔らかいグレー、ダークモード時は明るいグレー
                    color: (theme) => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : '#e0e0e0',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: 'text.secondary',
                    fontWeight: 400,
                    mt: -0.2,
                  }}
                >
                  {book.author}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <ReviewListSection bookId={book.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReviewPage;
