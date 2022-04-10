import { Avatar as Av } from "grommet";

export const Avatar = ({ avatar }: { avatar: string }) => (
  <Av src={avatar} size="large" round="full" overflow={"hidden"} />
);
