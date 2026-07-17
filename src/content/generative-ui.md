Traditionally, chatbots output text to share information and code snippets in markdown format. When I first started developing an **LLM agent** at Sea, I discovered the use of `tool_calls` to signal the frontend to render specific widgets.

For every tool call type, a corresponding **rendering strategy** is used, along with the tool call result specifying what details to display in the widgets or which URL to redirect to. Of course, this requires some **prompt engineering** to trigger those tool calls when intent is detected.

## Discovering Generative UI

Along the way, I learned about a new paradigm for rendering large language model (LLM) responses: **Generative UI**.

> **Generative UI** is where the AI model generates real-time user interfaces, rather than having them hardcoded by developers.

There are **three categories** of Generative UI.

| Category | How it works | Pros & Cons |
| -------- | -------- | -------- |
| **Static** | LLM decides which pre-built widget to return to the client | Guaranteed consistency, but restricted to the exact widgets/components that developers define |
| **Declarative** | LLM picks from a predefined set of components and passes the selection to the client to render | More controlled than open-ended, yet more expressive than static. Usually requires a library to handle registering and translating the output schema into actual rendered content |
| **Open-ended** | The model outputs HTML code directly | As the LLM grows more powerful, it can be more creative in the UIs it generates. However, this increases the risk of rendering failures, invalid HTML, or inconsistent themes across rendered content if not clearly defined in the prompt |

The original way that I was developing widgets based on tool calls clearly falls into the **static** category, which works well for simple use cases and where security is important. But if we want to give the LLM more autonomy and control over what to render, we can explore the other two Generative UI methods.

## Declarative Generative UI

I picked **[Open UI SDK](https://github.com/thesysdev/openui)** to implement this, as it provides built-in demos on how to integrate with other popular React component libraries like **Shadcn** and **Material UI**.

It's relatively simple to implement, with two main steps:

**Step 1:** Register each custom component needed (buttons, tables, accordions, dropdown selects, etc.), including its required props and a short code snippet showing how to render it.

```tsx
import {
  defineComponent,
  useTriggerAction,
} from "@openuidev/react-lang";
import { z } from "zod";

import { actionSchema } from "../action";
import MyButton from "../MyButton";

export const Button = defineComponent({
  name: "Button",
  props: z.object({
    label: z.string(),
    action: actionSchema,
    variant: z.enum(["contained", "outlined", "text"]).optional(),
    size: z.enum(["medium", "small"]).optional(),
  }),
  description:
    'Clickable button. variant: "contained" (default, filled primary) | "outlined" (bordered). size: "medium" | "small". action: { type: "continue_conversation" | "open_url", url? }.',
  component: ({ props }) => {
    const triggerAction = useTriggerAction();
    const variant = props.variant ?? "contained";
    const size = props.size ?? "medium";
    const label = props.label;

    return (
      <MyButton
        variant={variant}
        size={size}
        onClick={() => {
          triggerAction(label, { action: props.action });
        }}
      >
        {label}
      </MyButton>
    );
  },
});
```

**Step 2:** Provide examples of how these components should be composed and used in the prompt.

```
Example 2 — Form with validation:
root = Card([title, form])
title = TextContent("Contact Us", "large-heavy")
form = Form("contact", btns, [nameField, emailField, msgField])
nameField = FormControl("Name", Input("name", "Your name", "text", { required: true, minLength: 2 }))
emailField = FormControl("Email", Input("email", "you@example.com", "email", { required: true, email: true }))
msgField = FormControl("Message", TextArea("message", "Tell us more...", 4, { required: true, minLength: 10 }))
btns = Buttons([Button("Submit", { type: "continue_conversation" }, "contained")])
```

![Open UI Demo screenshot](image-1.jpeg "Generated trip planner")

The results are great: my components are generated correctly and can even render complex dashboards and forms. The best part is that I can use my own **custom React component library**, seamlessly.

It will take some effort to register each component, given that we have about **40 relevant components** to onboard. The library has kindly provided a script to generate the required prompt too.

## Open-ended Generative UI

Thanks to [this insightful blog post](https://michaellivs.com/blog/reverse-engineering-claude-generative-ui/), I understood the details behind how **Claude** handles open-ended generative UI, including the exact prompts that are used.

![Generative UI workflow](image-3.png "Generative UI workflow")

I built my own agent backend using **[pi](https://github.com/earendil-works/pi)** connected to an AI model and created a client that receives **partial HTML** and renders with **`morphdom`** into an iframe.

![Demo screenshot](image-2.png "Generated E-commerce dashboard")

**Using custom components**

The challenge came in when I wanted to use my own React component library. One way I found was to build my component library into a single **`UMD` file**, imported into every iframe alongside `React`, `ReactDOM`, and `styled-components`. This creates more **overhead per iframe** from loading the additional scripts, and also requires extra prompting that details how each component should be used (props, etc.) — which gives me flashbacks to declarative Generative UI, which does a better, more reliable job.

Another way is for the LLM to **generate React code**, pass it to another server that builds it, and output an HTML script to stream to the client. Theoretically, this sounds doable in my head, although I do question whether this is overkill for each generated iframe. This additional step in the middle adds to the response time as well, so it's not the best option to go with either.

Finally I decided to extract relevant **theme tokens** into **css-variables** to make the component look and feel like our own. This will do for now until there is a better way to go about handling this.

## Conclusion

At the end of the day, which strategy to pick really depends on balancing how much **autonomy** you want the LLM to have against how much **control** you want over the generated HTML.
