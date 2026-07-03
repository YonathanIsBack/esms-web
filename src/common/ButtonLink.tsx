import { Button } from "@chakra-ui/react";

const ButtonLink: React.FC<ButtonLinkPropType> = ({ url, label }) => {
  return (
    <a href={url}>
      <Button
        backgroundColor="var(--color-accent)"
        color="white"
        _hover={{ backgroundColor: "var(--color-accent-hover)" }}
        size="sm"
        border="none"
      >
        {label}
      </Button>
    </a>
  );
};

interface ButtonLinkPropType {
  url: string;
  label: string;
}

export default ButtonLink;
