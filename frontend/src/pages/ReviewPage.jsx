import { useQuery } from "@tanstack/react-query";
import { fetchBooksApi } from "../api/bookApi";
import { Box, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookIcon from '@mui/icons-material/MenuBook'; // 追加
import { ReviewListSection } from "../components/ReviewListSection";

export const ReviewPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await fetchBooksApi();
    },
  });

  if (isLoading) return <p>Loading...</p>; //todoかえる
  if (error) return <p>Error...</p>; //todoかえる

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {data?.map((book) => (
        <Accordion
          key={book.id}
          elevation={0}
          disableGutters
          sx={{
            borderTop: '1px solid #e0e0e0', // Subtle top border for each accordion
            mb: 2, // Margin bottom for spacing between accordions
            '&:last-of-type': {
              borderBottom: '1px solid #e0e0e0', // Add bottom border to the last one
            },
            borderRadius: '4px', // Slight rounded corners
            overflow: 'hidden', // Ensures borders/shadows conform to rounded corners
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onMouseDown={(e) => e.preventDefault()} // Prevents focus on click
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0, flexShrink: 1 }}>
              <MenuBookIcon color="action" />
              <Typography sx={{ flexShrink: 1 }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>{book.title}</Box>
                <Box component="span" sx={{ color: 'text.secondary', ml: 1 }}>({book.author})</Box>
              </Typography>
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
