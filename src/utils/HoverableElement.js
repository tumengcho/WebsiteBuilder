import React from "react";
import { useEditor, useNode } from "@craftjs/core";
import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { SaveComponent } from "./SaveComponent";

const Hoverable = ({ children, displayName }) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isActive,
    nodeName,
  } = useNode((node) => ({
    isHovered: node.events.hovered,
    isActive: node.events.selected,
    nodeName: node.data.custom?.displayName || node.data.type.name,
  }));

  const { actions, selected, query } = useEditor((state, query) => {
    const [currentNodeId] = state.events.hovered;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  const handleDelete = () => {
    actions.delete(selected.id);
  };

  const handleRename = () => {
    console.log("Rename action triggered!");
  };

  const handleSave = () => {
    const nodeTree = query.node(selected.id).toSerializedNode();
    return nodeTree;
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        position: "relative",
        border:
          isHovered || isActive ? "2px dashed blue" : "2px solid transparent",
        cursor: isHovered || isActive ? "pointer" : "default",
      }}
    >
      {(isHovered || isActive) && (
        <span
          style={{
            position: "absolute",
            top: "-30px",
            left: "0",
            width: "fit-content",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "blue",
            padding: "14px 5px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            zIndex: 10,
            color: "white",
          }}
        >
          <span>{nodeName}</span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={handleDelete}
              disabled={!selected.isDeletable}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "16px",
              }}
            >
              <FaTrashAlt />
            </button>
            <button
              onClick={handleRename}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "16px",
              }}
            >
              <FaEdit />
            </button>
            <SaveComponent componentJSON={handleSave()} />;
          </div>
        </span>
      )}
      {children}
    </div>
  );
};

export default Hoverable;
