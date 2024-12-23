import React from "react";
import { Box, Typography, Grid, Button as MaterialButton } from "@mui/material";
import { Element, useEditor } from "@craftjs/core";
import { Button } from "./user/Button";
import { Text } from "./user/Text";
import { Card } from "./user/Card";
import { Container } from "./user/Container";
import {
  ComponentCustom,
  DynamicComponentCustom,
  withDynamicDisplayName,
} from "./JsonRenderer";

export const Toolbox = () => {
  const { connectors, query, actions } = useEditor();
  const savedComponents =
    JSON.parse(localStorage.getItem("savedComponents")) || [];

  console.log(savedComponents);

  return (
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <Button text="Click me" size="small" variant="outlined" />
              )
            }
            variant="contained"
          >
            Button
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
            variant="contained"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <Element is={Container} padding={20} canvas />
              )
            }
            variant="contained"
          >
            Container
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => connectors.create(ref, <Card />)}
            variant="contained"
          >
            Card
          </MaterialButton>
        </Grid>
        {savedComponents.map((componentJSON, index) => {
          const componentData = componentJSON;

          return (
            <Grid container direction="column" item key={index}>
              <MaterialButton
                ref={(ref) =>
                  connectors.create(ref, <ComponentCustom f={componentData} />)
                }
                variant="contained"
              >
                {componentData.displayName}
              </MaterialButton>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
