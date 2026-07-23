import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <Flex
      minHeight="100vh"
      direction="column"
      align="center"
      justify="center"
      backgroundColor="var(--color-bg)"
      gap="16px"
    >
      <Heading fontSize="8xl" color="var(--color-primary)" fontWeight="bold">
        404
      </Heading>
      <Text fontSize="xl" color="var(--color-text-muted)">
        Page Not Found
      </Text>
      <Link to="/">
        <Button
          backgroundColor="var(--color-accent)"
          color="white"
          _hover={{ backgroundColor: "var(--color-accent-hover)" }}
          border="none"
          marginTop="8px"
        >
          Back to Home
        </Button>
      </Link>
    </Flex>
  );
};

export default NotFoundPage;