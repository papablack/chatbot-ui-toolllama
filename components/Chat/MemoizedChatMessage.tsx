import { FC, memo } from "react";
import { ChatMessage, Props } from "./ChatMessage";
import {LLMUsage, ToolUsage} from "@/types/chat";

// export interface LLMUsage {
//     type: "llm";
//     block_id: string;
//     occurence : number;
//     agent_scratchpad: string;
//     input: string;
//     prompt: string;
//     response: string;
// }
//
//
// export interface ToolUsage {
//     type: "tool";
//     block_id: string;
//     occurence : number;
//     thought: string;
//     tool_name: string;
//     tool_description: string;
//     tool_input: string;
//     output: string;
// }

const CompareElements = (a: LLMUsage | ToolUsage, b: LLMUsage | ToolUsage) => {
    // check if types are the same
    if (a.type !== b.type) {
        return false;
    }
    if (a.type === "llm") {
        a = a as LLMUsage;
        b = b as LLMUsage;
        if (a.block_id !== b.block_id
          || a.occurence !== b.occurence
          || a.agent_scratchpad !== b.agent_scratchpad
          || a.input !== b.input
          || a.prompt !== b.prompt
          || a.response !== b.response) {
            return false;
        }
    } else if (a.type === "tool") {
        a = a as ToolUsage;
        b = b as ToolUsage;
        if (a.block_id !== b.block_id
          || a.occurence !== b.occurence
          || a.thought !== b.thought
          || a.tool_name !== b.tool_name
          || a.tool_description !== b.tool_description
          || a.tool_input !== b.tool_input
          || a.output !== b.output) {
            return false;
        }
    }
    return true;
}


export const MemoizedChatMessage: FC<Props> = memo(
    ChatMessage,
    (prevProps, nextProps) => {
        if (prevProps.message.content !== nextProps.message.content) {
            return false;
        }
        if (prevProps.message.role === "user") {
            return true;
        }
        var prevundefined = prevProps.message.tools === undefined;
        var nextundefined = nextProps.message.tools === undefined;
        if (prevundefined !== nextundefined) {
            return false;
        }
        if (prevundefined === undefined && nextundefined === undefined) {
            return true;
        }

        // now they should both be defined
        if (prevProps.message.tools.length !== nextProps.message.tools.length) {
            return false;
        }

        // for (var i = 0; i < prevProps.message.tools.length; i++) {
        //     if (!CompareElements(prevProps.message.tools[i], nextProps.message.tools[i])) {
        //         return false;
        //     }
        // }

        return true;
    }
);
