import React, { JSXElementConstructor, ReactElement, useState } from "react";
import {
  Checkbox,
  Grid,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Header,
  Image,
} from "semantic-ui-react";

interface Props {
  // children: string | number | boolean | {} | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | ReactPortal | null | undefined;
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined;
}

const SideBar = (props: Props) => {
  const [visible, setVisible] = useState<boolean | undefined>(false);

  return (
    <>
      <Grid columns={1}>
        <Grid.Column>
          <Checkbox
            checked={visible}
            label={{ children: <code>visible</code> }}
            onChange={(e, data) => setVisible(data.checked)}
          />
        </Grid.Column>
      </Grid>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="wide"
        >
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            {props.children}
            <Header as="h3">Application Content</Header>
            <Image src="/images/wireframe/paragraph.png" />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default SideBar;
