import { Box, Button, Heading, Text } from "grommet";
import { Avatar } from "./Avatar";
import { members } from "./members";

export const Pick = ({ onSelection, current }) => {
  const priority = members.map((m) => m.name).join(" > ");

  if (current) {
    return (
      <>
        <Box direction="row" gap="medium" align="center">
          <Heading>Current</Heading>
          <Avatar avatar={current.avatar} />
          <Box direction="row">{priority}</Box>
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
