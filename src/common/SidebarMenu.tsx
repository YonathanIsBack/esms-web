import { VStack, Text, Button, Separator } from "@chakra-ui/react";
import { Link, useLocation } from "react-router";

const navItems = [
  { href: "/", label: "Customer" },
  { href: "/service-transaction", label: "Service Transaction" },
];

const SidebarMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Text color="white" fontSize="lg" fontWeight="bold" textAlign="center">
          ESMS
        </Text>
        <Text color="white" fontSize="xs" opacity="0.7" textAlign="center">
          Electronic Service Management
        </Text>
      </div>
      <Separator borderColor="rgba(255,255,255,0.15)" />
      <VStack gap="1" padding="16px" align="stretch">
        {navItems.map((item) => (
          <Link to={item.href} key={item.href}>
            <Button
              w="100%"
              justifyContent="flex-start"
              backgroundColor={isActive(item.href) ? "var(--color-accent)" : "transparent"}
              color="white"
              _hover={{
                backgroundColor: isActive(item.href) ? "var(--color-accent-hover)" : "rgba(255,255,255,0.1)",
              }}
              border="none"
              paddingLeft="16px"
              borderRadius="8px"
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </VStack>
    </div>
  );
};

export default SidebarMenu;
