import { Element } from "@craftjs/core";
import { Button } from "./user/Button";
import { Card } from "./user/Card";
import { Container } from "./user/Container";
import { Text } from "./user/Text";

const renderNode = (nodeData) => {
  if (!nodeData) return null;

  const { type, props, nodes } = nodeData;

  switch (type.resolvedName) {
    case "Container":
      return (
        <Element is={Container} id="container">
          <Container {...props}>
            {nodes && nodes.map((nodeId) => renderNode(data[nodeId]))}
          </Container>
        </Element>
      );
    case "Card":
      return (
        <Element is={Card} id="card">
          <Card {...props}>
            {nodes && nodes.map((nodeId) => renderNode(data[nodeId]))}
          </Card>
        </Element>
      );
    case "Button":
      return (
        <Element is={Button} id="button">
          <Button {...props} />
        </Element>
      );
    case "Text":
      return (
        <Element is={Text} id="text">
          <Text {...props} />
        </Element>
      );
    default:
      return null;
  }
};

const data = {
  ROOT: {
    type: { resolvedName: "Container" },
    isCanvas: true,
    props: { background: "#eee", padding: 5 },
    displayName: "Container",
    custom: {},
    hidden: false,
    nodes: ["C5PW2l1hSf", "nG-YarXVuu"],
    linkedNodes: {},
  },
  DtBoFN1JNh: {
    type: { resolvedName: "Card" },
    isCanvas: false,
    props: { background: "#ffffff", padding: 3 },
    displayName: "Card",
    custom: {},
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  gTVnmdu7g8: {
    type: { resolvedName: "Button" },
    isCanvas: false,
    props: {
      size: "small",
      variant: "outlined",
      color: "primary",
      text: "Click",
    },
    displayName: "Button",
    custom: {},
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  tC9kj5BEV7: {
    type: { resolvedName: "Text" },
    isCanvas: false,
    props: { text: "Hi world!", fontSize: 12, size: "small" },
    displayName: "Text",
    custom: {},
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "9HuRUkLY2P": {
    type: { resolvedName: "Container" },
    isCanvas: true,
    props: { background: "#999", padding: 2 },
    displayName: "Container",
    custom: {},
    parent: "ROOT",
    hidden: false,
    nodes: ["YXsfylC-3s"],
    linkedNodes: {},
  },
  "YXsfylC-3s": {
    type: { resolvedName: "Text" },
    isCanvas: false,
    props: { text: "It's me again!", fontSize: 12, size: "small" },
    displayName: "Text",
    custom: {},
    parent: "9HuRUkLY2P",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  C5PW2l1hSf: {
    type: { resolvedName: "Button" },
    isCanvas: false,
    props: {
      size: "small",
      variant: "outlined",
      color: "primary",
      text: "Click",
    },
    displayName: "Button",
    custom: {},
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "nG-YarXVuu": {
    type: { resolvedName: "Text" },
    isCanvas: false,
    props: { text: "Hi world!", fontSize: 12, size: "small" },
    displayName: "Text",
    custom: {},
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
};
export const JsonToComponentExample = () => {
  return renderNode(data["ROOT"]);
};
