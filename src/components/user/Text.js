import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useNode } from "@craftjs/core";
import Hoverable from "../../utils/HoverableElement";

export const Text = ({ text, fontSize, textAlign }) => {
  const {
    actions: { setProp },
    isActive,
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!isActive) setEditable(false);
  }, [isActive]);

  return (
    <Hoverable>
      <div onClick={() => setEditable(true)}>
        <ContentEditable
          html={text}
          onChange={(e) =>
            setProp(
              (props) =>
                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
            )
          }
          tagName="p"
          style={{
            fontSize: `${fontSize}px`,
            textAlign,
            outline: "none",
          }}
        />
      </div>
    </Hoverable>
  );
};

Text.craft = {
  props: {
    text: "Hello, world!",
    fontSize: 14,
    textAlign: "left",
  },
};
