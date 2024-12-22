import React from "react";
import { useEditor, useNode } from "@craftjs/core";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Hoverable = ({ children }) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isActive,
    nodeName,
  } = useNode((node) => ({
    isHovered: node.events.hovered,
    isActive: node.events.selected,
    nodeName: node.data.displayName || node.data.type.name,
  }));

  const { actions, selected } = useEditor((state, query) => {
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
            padding: "5px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            zIndex: 10,
            color: "white",
          }}
        >
          <span>{nodeName}</span>
          <div>
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
          </div>
        </span>
      )}
      {children}
    </div>
  );
};

export default Hoverable;
