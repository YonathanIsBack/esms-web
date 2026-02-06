import { Button } from "@chakra-ui/react";

const ButtonLink: React.FC<ButtonLinkPropType> = ({ url, label }) => {
  return (
    <>
      <a href={url}>
        <Button color="blue">{label}</Button>
      </a>
    </>
  );
};

interface ButtonLinkPropType {
  url: string;
  label: string;
}

export default ButtonLink;
