import logo from "./logo.svg";
import "./App.css";

import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingsPanel";
import { Topbar } from "./components/Topbar";

import { Container } from "./components/user/Container";
import { Card, CardBottom, CardTop } from "./components/user/Card";
import { Grid, Paper, Typography } from "@mui/material";
import { Editor, Element, Frame } from "@craftjs/core";
import { Button } from "./components/user/Button";
import { Text } from "./components/user/Text";
import { JsonToComponentExample } from "./components/JsonRenderer";

function App() {
  return (
    <div style={{ margin: "0 auto" }}>
      <Typography variant="h5" align="center">
        A super simple page editor
      </Typography>
      <Editor
        resolver={{
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          JsonToComponentExample,
        }}
      >
        <Grid container spacing={3} style={{ paddingTop: "10px" }}>
          <Topbar />
          <Grid item xs className="brr">
            <Frame>
              <Element is={Container} padding={5} background="#eee" canvas>
                <Card />
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  text="Click"
                />

                <Text size="small" text="Hi world!" />
                <Element is={Container} padding={2} background="#999" canvas>
                  <Text size="small" text="It's me again!" />
                </Element>
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}

export default App;
