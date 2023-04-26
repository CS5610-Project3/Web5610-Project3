import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Pagination, Stack, SvgIcon} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Post from "./Post";
import Grid from "@mui/material/Grid";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";



const posts = ["SignUp", "SignIn"];


export default function UserInformation() {
    const [content, setContent] = useState("Content");

    function editContent() {
        setContent("Test Edit");
        // call api to change whole post(including timestamp)
    }

    function deleteContent() {
        setContent("Test Delete");
        // call api to delete whole post
    }

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
                                    <ClockIcon />
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
                        <div>
                            <Button
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                        <PlusIcon />
                                    </SvgIcon>
                                )}
                                variant="contained"
                            >
                                Add
                            </Button>
                        </div>
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
                                <Post post={post} />
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