import { GiRobotHelmet } from "react-icons/gi";

type HeaderProps = {
  title: string;
};

const Header = ({title}: HeaderProps) => {
  return <h1>{`${title}\t`}<GiRobotHelmet/> </h1>
}

export default Header;