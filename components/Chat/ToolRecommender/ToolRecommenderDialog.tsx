// components/ToolRecommenderDialog.tsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, IconButton, Grow, styled } from '@mui/material';
import ToolRecommenderInterface from "@/components/Chat/ToolRecommender/ToolRecommenderInterface";
import { Close as CloseIcon } from '@mui/icons-material';

interface Tool {
  tool_name: string;
  tool_desc: string;
}

interface ToolRecommenderDialogProps {
  tools: Tool[];
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }),
  },
}));

const ToolRecommenderDialog: React.FC<ToolRecommenderDialogProps> = ({ tools }) => {
  const [open, setOpen] = useState(false);
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (selectedTools: Tool[]) => {
    setSelectedTools(selectedTools);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Tool Recommender
      </Button>
      <StyledDialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        TransitionComponent={Grow}
        transitionDuration={500}
      >
        <DialogTitle>
          Tool Recommender
          <IconButton
            aria-label="Close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ToolRecommenderInterface tools={tools} onSubmit={handleSubmit} onClose={handleClose} />
        </DialogContent>
      </StyledDialog>
      <div>
        <h3>Selected Tools:</h3>
        <ul>
          {selectedTools.map((tool) => (
            <li key={tool.tool_name}>{tool.tool_name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToolRecommenderDialog;
