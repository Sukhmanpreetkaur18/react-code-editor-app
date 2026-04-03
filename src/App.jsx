import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import LandingPage from "./pages/LandingPage.jsx"; 

function App() {
  const [showLanding, setShowLanding] = useState(true); // 👈 new

  // 👇 if landing page active, show it
  if (showLanding) {
    return <LandingPage onLaunch={() => setShowLanding(false)} />;
  }

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      bg="linear-gradient(135deg, #0f0a19, #1a0f2e, #000000)"
      px={6}
      py={4}
      overflow="hidden"
    >
      {/* 🔥 HEADER */}
      <Text
        fontSize="3xl"
        mb={3}
        color="#00ffcc"
        fontWeight="bold"
        textShadow="0 0 12px #00ffcc"
        letterSpacing="1px"
      >
        ⚡ Code Playground (Offline)
      </Text>

      {/* 🔥 MAIN CONTAINER */}
      <Box
        flex="1"
        minH={0}
        border="1px solid rgba(0,255,204,0.2)"
        borderRadius="10px"
        p={2}
        boxShadow="0 0 20px rgba(0,255,204,0.1)"
        bg="rgba(0,0,0,0.3)"
        backdropFilter="blur(10px)"
      >
        <CodeEditor />
      </Box>
    </Box>
  );
}

export default App;