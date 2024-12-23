import React from "react";
import { Element, useNode } from "@craftjs/core";
import { Button } from "./user/Button";
import { Card } from "./user/Card";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import Hoverable from "../utils/HoverableElement";

const renderNode = (data, allNodes) => {
  if (!data) return null;

  const { type, props, nodes } = data;
  switch (type.resolvedName) {
    case "Container":
      return (
        <Element is={Container} {...props} id="container">
          {nodes &&
            nodes.map((nodeId) => renderNode(allNodes[nodeId], allNodes))}
        </Element>
      );
    case "Card":
      return (
        <Element is={Card} {...props} id="card">
          {nodes &&
            nodes.map((nodeId) => renderNode(allNodes[nodeId], allNodes))}
        </Element>
      );
    case "Button":
      return <Button {...props} />;
    case "Text":
      return <Text {...props} />;
    default:
      return null;
  }
};

export const ComponentCustom = ({ f }) => {
  const { connectors, id, actions } = useNode((state) => ({
    id: state.id,
  }));
  actions.setCustom((custom) => {
    custom.displayName = f.displayName;
    return custom;
  });

  return (
    <Hoverable displayName={f.displayName}>
      {renderNode(f, f.linkedNodes)}
    </Hoverable>
  );
};
