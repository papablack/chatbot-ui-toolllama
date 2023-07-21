import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BuildIcon from '@mui/icons-material/Build';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from "@mui/material/Button";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TransitionProps } from '@mui/material/transitions';
import {LLMUsage, ToolUsage, ToolRecommendation} from "@/types/chat";
import ToolRecommenderInterface from "@/components/Chat/ToolRecommender/ToolRecommenderInterface";
import ToolRecommenderDialog from "@/components/Chat/ToolRecommender/ToolRecommenderDialog";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ToolProgressCardProps {
  data: ToolRecommendation
}

const summarizeToolUsage = (toolUsage: ToolRecommendation) => {
  var recommendations = toolUsage.recommendations;
  var summary = "Using tools: ";
  if (recommendations.length == 0) {
    return "";
  }
  for (var i = 0; i < recommendations.length; i++) {
    var tool_name = recommendations[i].tool_name;
    if (i == recommendations.length - 1) {
      summary += tool_name;
    } else {
      summary += tool_name + ", ";
    }
  }
  return summary;
}

const ToolProgressCard = (props: ToolProgressCardProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [scratchpadDialogOpen, setScratchpadDialogOpen] = React.useState(false);
  var data = props.data;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDescriptionOpen = () => {
    setScratchpadDialogOpen(true);
  }

  const handleDescriptionClose = () => {
    setScratchpadDialogOpen(false);
  }

  const toolSummary = summarizeToolUsage(data);

  return (
    <Box sx={{
      // set margin left
      m: 0.5,
      ml: 1
    }}>
      <Card sx={{
        // set background color
        bgcolor: '#',
        //set min width
        minWidth: '600px',
        // set max width
        maxWidth: '600px',
      }}>
        <CardHeader
          avatar={
            <BuildIcon/>
          }
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon/>
            </ExpandMore>
          }
          title={<Typography paragraph sx={{
            fontWeight: 'bold',
            m: 0,
          }}>
            {"Using Tools - " + data.occurence}
          </Typography>}
          subheader={
            <Typography paragraph sx={{
              // remove margin
              m: 0,
              //Italicize text
              fontStyle: 'italic',
            }}>
              {toolSummary ?
                (toolSummary.length > 50 ? toolSummary.substring(0, 50) + "..." : toolSummary)
                : "Not available"}
            </Typography>}
          sx={{
            // left align title
            textAlign: 'left',
          }}
          disableTypography
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit sx={{
          // left align text
          textAlign: 'left',
        }}>
          <CardContent sx={{
            // remove top padding
            pt: 0,
          }}>
            <ToolRecommenderInterface tools={data.recommendations} onClose={handleExpandClick}/>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default ToolProgressCard;