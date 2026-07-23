import { Button } from "@chakra-ui/react";
import { Link } from "react-router";

const ButtonLink: React.FC<ButtonLinkPropType> = ({ url, label }) => {
  return (
    <Link to={url}>
      <Button
        backgroundColor="var(--color-accent)"
        color="white"
        _hover={{ backgroundColor: "var(--color-accent-hover)" }}
        size="sm"
        border="none"
      >
        {label}
      </Button>
    </Link>
  );
};

interface ButtonLinkPropType {
  url: string;
  label: string;
}

export default ButtonLink;
