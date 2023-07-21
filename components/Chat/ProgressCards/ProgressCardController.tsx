import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import LLMProgressCard from "./LLMProgressCard";
import ToolProgressCard from "./ToolProgressCard";
import ToolRecommendationCard from "./ToolRecommendationCard";
import {ReactElement, useState} from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import {BaseUsage, LLMUsage, ToolUsage, ToolRecommendation} from "@/types/chat";

const generate_random_id = () => {
  return Math.random().toString(36).substr(2, 9);
}
const processObjs = (progressJson: any):BaseUsage[]  => {
  // check if progressJson is a list, and if its empty
  if (!Array.isArray(progressJson) || !progressJson.length) {
    return [];
  }
  var id_order: string[] = [];
  var obj_dict:  any = {};
  var tool_count = 0;
  var llm_count = 0;
  // create a dictionary of objects, with the block_id as the key

  progressJson.forEach((progress) => {
    if (!progress) return [];
    // if (progress.block_id === "start") {
    //   id_order.push("start");
    //   obj_dict["start"] = (
    //     <Typography variant="h6" key={generate_random_id()}>Starting request chain...</Typography>
    //   )
    // } else if (progress.block_id === "end") {
    //   id_order.push("end");
    //   obj_dict["end"] = (
    //     <Typography
    //       variant="h6"
    //       key={generate_random_id()}
    //       sx={{
    //         textAlign: "left"
    //       }}
    //     >
    //       {progress.output}
    //     </Typography>
    //   )
    // }

    var block_id = progress.block_id;
    if (!id_order.includes(block_id)) {
      id_order.push(block_id);
      // check if block_id contains llm
      if (block_id.includes("llm")) {
        llm_count++;
        obj_dict[block_id] = {
          occurence: llm_count,
          block_id: block_id
        }
      } else if (block_id.includes("tool")) {
        tool_count++;
        obj_dict[block_id] = {
          occurence: tool_count,
          block_id: block_id
        }
      } else if (block_id.includes("recommendation")) {
        obj_dict[block_id] = {
          occurence: 1,
          block_id: block_id
        }
      }
    }
    if (block_id.includes("llm")) {
      switch (progress.method_name) {
        case "on_chain_start": {
          obj_dict[block_id].agent_scratchpad = progress.agent_scratchpad;
          obj_dict[block_id].input = progress.input;
          break
        }
        case "on_llm_start": {
          obj_dict[block_id].prompt = progress.prompt;
          break
        }
        case "on_llm_end": {
          obj_dict[block_id].response = progress.response;
          break
        }
        case "on_chain_end": {
          obj_dict[block_id].response = progress.output;
          break
        }
        default: {
          break
        }
      }
    } else if (block_id.includes("tool")) {
      switch (progress.method_name) {
        case "on_agent_action": {
          obj_dict[block_id].thought = progress.thought;
          break
        }
        case "on_tool_start": {
          obj_dict[block_id].tool_name = progress.tool_name;
          obj_dict[block_id].tool_input = progress.tool_input;
          obj_dict[block_id].tool_description = progress.tool_description;
          break
        }
        case "on_tool_end": {
          obj_dict[block_id].output = progress.output;
          break
        }
        default:  {
          break
        }
      }
    } else if (block_id.includes("recommendation")) {
      obj_dict[block_id].recommendation = progress.recommendation;
    }
  });
  var ret:BaseUsage[]= [];
  // for each object, add it to the return list
  for (var i = 0; i < id_order.length; i++) {
    var block_id = id_order[i];
    ret.push(obj_dict[block_id]);

    // if (block_id.includes("llm")) {
    //   ret.push(obj_dict[block_id])
    // } else if (block_id.includes("tool")) {
    //   ret.push(
    //     <ToolProgressCard
    //       key={block_id}
    //       data={obj_dict[block_id]}
    //     />
    //   )
    // } else {
    //   ret.push(obj_dict[id_order[i]]);
    // }

  }
  ret = ret.filter((x) => x !== undefined);
  console.log(ret)
  return ret;
}

const generateCards = (progressJson: any) => {
  var progressObjs: BaseUsage[] = processObjs(progressJson);
  console.log(progressObjs);
  var components : ReactElement[] = [];
  const tools  =
    {
      type: "recommendation",
      occurence: 1,
      block_id: "recommendation-1",
      recommendations:[
        { tool_name: 'Tool 1', tool_desc: 'Description 1' },
        { tool_name: 'Tool 2', tool_desc: 'Description 2' },
        { tool_name: 'Tool 3', tool_desc: 'Description 3' },
        { tool_name: 'Tool 4', tool_desc: 'Description 4' },
        { tool_name: 'Tool 5', tool_desc: 'Description 5' },
        { tool_name: 'Tool 6', tool_desc: 'Description 6' },
        { tool_name: 'Tool 7', tool_desc: 'Description 7' },
        { tool_name: 'Tool 8', tool_desc: 'Description 8' },
        { tool_name: 'Tool 9', tool_desc: 'Description 9' },
        { tool_name: 'Tool 10', tool_desc: 'Description 10' },
        { tool_name: 'Tool 11', tool_desc: 'Description 11' },
        { tool_name: 'Tool 12', tool_desc: 'Description 12' },
      ]
    } as ToolRecommendation;
  components.push(
    <ToolRecommendationCard
      key={tools.block_id}
      data={tools}
    />
  )
  for (var i = 0; i < progressObjs.length; i++) {
    // console.log(progressObjs[i])
    if (progressObjs[i].block_id.includes("llm")) {
      var temp = progressObjs[i] as LLMUsage;
      components.push(
        <LLMProgressCard
          key={progressObjs[i].block_id}
          data={temp}
        />
      )
    } else if (progressObjs[i].block_id.includes("tool")) {
      var temp2: ToolUsage = progressObjs[i] as ToolUsage;
      components.push(
        <ToolProgressCard
          key={progressObjs[i].block_id}
          data={temp2}
        />
      )
    } else if (progressObjs[i].block_id.includes("recommendation")) {
      var temp3: ToolRecommendation = progressObjs[i] as ToolRecommendation;
      components.push(
        <ToolRecommendationCard
          key={progressObjs[i].block_id}
          data={temp3}
        />
      )
      
    }
  }
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      {components}
    </Box>
  )
}

interface ProgressCardControllerProps {
  progressJson: LLMUsage[] | ToolUsage[] | undefined;
  className: string;
}
const ProgressCardController = (props: ProgressCardControllerProps) => {
  const [processing, setProcessing] = useState(false);
  const [progressJson, setProgressJson] = useState({});// {progress: 0, result: ""} [0, 1

  return (
    <Box>
      {generateCards(props.progressJson)}
    </Box>
  );
}

export default ProgressCardController;