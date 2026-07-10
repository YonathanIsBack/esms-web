import { useState } from "react";
import { Button, Field, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      backgroundColor="var(--color-bg)"
    >
      <Flex
        direction="column"
        backgroundColor="var(--color-primary)"
        padding="40px"
        borderRadius="16px"
        boxShadow="0 8px 32px rgba(0,0,0,0.2)"
        width="420px"
        gap="24px"
      >
        <Text
          color="white"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
        >
          Welcome, Please Login
        </Text>
        <Stack gap="16px">
          <Field.Root>
            <Field.Label color="white" fontWeight="medium">
              Username / Email
            </Field.Label>
            <Input
              type="text"
              placeholder="Enter your username or email"
              backgroundColor="white"
              border="none"
              color="var(--color-text)"
              _placeholder={{ color: "var(--color-text-muted)" }}
              _focus={{ boxShadow: "0 0 0 2px var(--color-accent)" }}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label color="white" fontWeight="medium">
              Password
            </Field.Label>
            <Flex position="relative" align="center" width="100%">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                backgroundColor="white"
                border="none"
                color="var(--color-text)"
                _placeholder={{ color: "var(--color-text-muted)" }}
                _focus={{ boxShadow: "0 0 0 2px var(--color-accent)" }}
                paddingRight="40px"
              />
              <Button
                position="absolute"
                right="4px"
                size="sm"
                variant="ghost"
                backgroundColor="transparent"
                color="var(--color-text-muted)"
                _hover={{ color: "var(--color-accent)" }}
                onClick={() => setShowPassword(!showPassword)}
                zIndex="1"
                padding="0"
                minWidth="36px"
                height="36px"
              >
                {showPassword ? <LuEyeOff size="18" /> : <LuEye size="18" />}
              </Button>
            </Flex>
          </Field.Root>
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
            width="100%"
            size="lg"
            marginTop="8px"
          >
            Login
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LoginPage;