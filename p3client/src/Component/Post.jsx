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

export default function Post() {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="UserName"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={editContent}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteContent}>
          <DeleteIcon />
        </IconButton>
      </CardActions>

    </Card>
  );
}