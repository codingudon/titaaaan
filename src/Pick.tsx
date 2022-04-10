import { Box, Button, Heading, Stack } from "grommet";
import { Avatar } from "./Avatar";
import { members } from "./members";

export const Pick = ({ onSelection, current }) => {
  if (current) {
    return (
      <>
        <Box direction="row" gap="medium" align="center">
          <Heading>Current</Heading>
          <Avatar avatar={current.avatar} />
        </Box>

        <Box margin={{ top: "medium", bottom: "medium" }}>
          <Button
            secondary
            size="large"
            onClick={() => onSelection(null)}
            label="Reselect character"
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Heading>Pick your character</Heading>
      <Box direction="row" gap="medium">
        {members.map((member, index) => (
          <Box onClick={() => onSelection(member)} key={index}>
            <Avatar avatar={member.avatar} />
          </Box>
        ))}
      </Box>
    </>
  );
};
