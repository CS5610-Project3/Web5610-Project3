import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Pagination, Stack, SvgIcon} from "@mui/material";
import Button from "@mui/material/Button";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Grid from "@mui/material/Grid";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import Post from "../Component/Post";

const posts = ["SignUp", "SignIn"];

export default function AllPosts() {

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Username
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <ClockIcon/>
                </SvgIcon>
                <Typography
                  color="text.secondary"
                  display="inline"
                  variant="body2"
                >
                  Joined August 2021
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/*<SearchBar />*/}
          <Grid
            container
            spacing={3}
          >
            {posts.map((post) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={post.id}
              >
                <Post post={post}/>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}