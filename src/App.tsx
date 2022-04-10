import { useState } from "react";
import { useKeyPressEvent } from "react-use";
import "./App.css";
import {
  Box,
  Button,
  Grommet,
  Page,
  PageContent,
  RadioButton,
  Text,
  RangeInput,
} from "grommet";
import { Avatar } from "./Avatar";
import { generateThreeRandomMembers, Member } from "./members";
import { Pick } from "./Pick";
import { Result } from "./Result";
import useCountDown from "react-countdown-hook";

type Position = "top" | "mid" | "bot" | "skip";

const initialTimeLimit = 1000; // initial time in milliseconds, defaults to 60000
const interval = 70;

function App() {
  const [current, setCurrent] = useState<Member | null>(null);
  const [selection, setSelection] = useState<null | Position>(null);
  const [targeted, setTargeted] = useState<Member[]>([]);
  const [expected, setExpected] = useState<Member[]>([]);
  const [timeLimit, setTimeLimit] = useState(initialTimeLimit);
  const [timeLeft, { start }] = useCountDown(timeLimit, interval);

  const timeIsUp = timeLeft === 0;

  const commence = () => {
    const { random, order } = generateThreeRandomMembers();
    setTargeted(random);
    setExpected(order);
    console.log("timeLimit", timeLimit);
    start(timeLimit);
    setSelection(null);
  };
  useKeyPressEvent(" ", commence);

  return (
    <Grommet plain>
      <Page kind="narrow">
        <PageContent>
          <Pick onSelection={setCurrent} current={current} />
          <Box margin={{ top: "medium", bottom: "medium" }}>
            <Text>Difficulty</Text>
            <RangeInput
              value={timeLimit}
              min={1000}
              max={2000}
              onChange={(event) => setTimeLimit(parseInt(event.target.value))}
            />
            <Text>{`${timeLimit / 1000}s`}</Text>
          </Box>
          {current && (
            <Button
              primary
              type="button"
              label={
                timeIsUp
                  ? "Start (click or press spacebar)"
                  : `${timeLeft / 1000}s`
              }
              size="large"
              onClick={commence}
            />
          )}
          {current && (
            <>
              <Box
                direction="row"
                justify="between"
                margin={{ top: "medium", bottom: "medium" }}
              >
                <Box gap="medium">
                  {[
                    { value: "top", label: "top" },
                    { value: "mid", label: "mid" },
                    { value: "bot", label: "bottom" },
                    { value: "skip", label: "skip" },
                  ].map(({ value, label }) => {
                    return (
                      <RadioButton
                        name="radio"
                        disabled={timeIsUp}
                        checked={value === selection}
                        label={label}
                        onChange={() => setSelection(value as Position)}
                      />
                    );
                  })}
                </Box>
                <Box
                  direction="row"
                  gap="medium"
                  margin={{ top: "medium", bottom: "medium" }}
                  justify="center"
                >
                  {targeted.map((t) => (
                    <Avatar avatar={t.avatar} />
                  ))}
                </Box>
              </Box>

              <Box margin={{ top: "medium", bottom: "medium" }}>
                <Result
                  expected={expected}
                  current={current}
                  selection={selection}
                />
              </Box>
            </>
          )}
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
