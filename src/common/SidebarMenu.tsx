import { Button, CloseButton, Drawer, Portal, Stack } from "@chakra-ui/react";

const SidebarMenu = () => {
  return (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Menu
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Electronic Service Management System</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack>
                <a href="/">
                  <Button variant="outline" w="100%">
                    Customer
                  </Button>
                </a>
                <a href="/service-transaction">
                  <Button variant="outline" w="100%">
                    Service Transaction
                  </Button>
                </a>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default SidebarMenu;
