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
import {LLMUsage, ToolUsage} from "@/types/chat";

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
  data: ToolUsage
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
              {data.tool_name ?
                (data.tool_name.length > 50 ? data.tool_name.substring(0, 50) + "..." : data.tool_name)
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
          // slightly lighter text opacity
          opacity: 0.6,
        }}>
          <CardContent sx={{
            // remove top padding
            pt: 0,
          }}>
            {data.thought ? (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>Agent Goal: </Typography>
                <Typography paragraph sx={{
                  // remove margin
                  m: 0,

                }}>
                  {data.thought}
                </Typography>
              </>
            ) : (
              <></>
            )}

            {data.tool_name? (
              // put these in the same line
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>Tool Name: </Typography>
                <Typography paragraph sx={{
                  // remove margin
                  m: 0,
                  ml: 0.5,
                }}>
                  {data.tool_name}
                </Typography>
                {/*Mini information icon button*/}
                <IconButton aria-label="info" size="small" onClick={handleDescriptionOpen}>
                  <InfoOutlinedIcon/>
                </IconButton>
              </Box>
            ):(
              <>
                {/*<Typography paragraph sx={{*/}
                {/*    // bold text*/}
                {/*    fontWeight: 'bold',*/}
                {/*    // remove margin*/}
                {/*    m: 0,*/}
                {/*}}>Tool Name: </Typography>*/}
                {/*<Typography paragraph sx={{*/}
                {/*    // remove margin*/}
                {/*    m: 0,*/}
                {/*    ml: 0.5,*/}
                {/*}}>*/}
                {/*    {data.tool_name}*/}
                {/*</Typography>*/}
              </>
            )}

            {data.tool_input ? (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>Tool Input: </Typography>
                <Typography paragraph sx={{
                  m:0
                }}>
                  {data.tool_input}
                </Typography>
              </>
            ):(
              <></>
            )}

            {data.output ? (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>Tool Output: </Typography>
                <Typography paragraph sx={{
                  m:0
                }}>
                  {data.output}
                </Typography>
              </>
            ) : (
              <>
                <Typography paragraph sx={{
                  // bold text
                  fontWeight: 'bold',
                  // remove margin
                  m: 0,
                }}>Tool Output: </Typography>
                <Typography paragraph sx={{
                  m:0
                }}>
                  Waiting for output...
                </Typography>
              </>
            )}
            {data.tool_description? (
              // make a button that says "Show Scratchpad", and when clicked, opens a dialog box with the scratchpad
              <>
                <Dialog
                  open={scratchpadDialogOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleDescriptionClose}
                >
                  <DialogTitle>{data.tool_name}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {data.tool_description}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDescriptionClose}>Close</Button>
                  </DialogActions>
                </Dialog>

              </>
            ): (
              <></>
            )}


          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default ToolProgressCard;