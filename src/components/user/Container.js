import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Paper, Slider } from "@mui/material";
import ColorPicker from "material-ui-color-picker";
import React, { useEffect, useState } from "react";
import Hoverable from "../../utils/HoverableElement";

export const Container = ({ background, padding = 0, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Hoverable>
      <Paper
        ref={(ref) => connect(drag(ref))}
        style={{ backgroundColor: background, padding: `${padding}px` }}
      >
        {children}
      </Paper>
    </Hoverable>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <ColorPicker
          onChange={(color) => {
            setProp((props) => (props.background = color));
          }}
          value={background}
          hintText={background}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider
          defaultValue={padding}
          onChange={(_, value) => setProp((props) => (props.padding = value))}
        />
      </FormControl>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: "#ffffff",
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
