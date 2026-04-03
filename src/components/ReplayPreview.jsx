import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  useColorMode,
  Badge,
  Container,
  Heading,
  Alert,
  AlertIcon,
  SimpleGrid,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";

export default function ReplayPreview({ onClose }) {
  const { colorMode } = useColorMode();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewContent, setPreviewContent] = useState("");
  const intervalRef = useRef(null);

  // Define build steps for visual progression
  const buildSteps = [
    { 
      step: 0, 
      name: "Empty Container", 
      html: "<div class='container'></div>", 
      css: "" 
    },
    { 
      step: 1, 
      name: "Add Text Content", 
      html: `<div class='container'><h1>Hello World</h1><p>This is a demo</p></div>`,
      css: ""
    },
    { 
      step: 2, 
      name: "Basic Styling", 
      html: `<div class='container'><h1>Hello World</h1><p>This is a demo</p></div>`,
      css: `.container { padding: 20px; background: #f0f0f0; border-radius: 10px; } h1 { color: #333; } p { color: #666; }`
    },
    { 
      step: 3, 
      name: "Add Colors", 
      html: `<div class='container'><h1>Hello World</h1><p>This is a demo</p></div>`,
      css: `.container { padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; } h1 { color: white; } p { color: #e0e0e0; }`
    },
    { 
      step: 4, 
      name: "Add Animations", 
      html: `<div class='container'><h1>Hello World</h1><p>This is a demo</p><button class='demo-btn'>Click Me</button></div>`,
      css: `.container { padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; animation: fadeIn 0.5s; } h1 { color: white; animation: slideIn 0.3s; } p { color: #e0e0e0; } .demo-btn { background: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; transition: transform 0.2s; margin-top: 10px; } .demo-btn:hover { transform: scale(1.05); } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < buildSteps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2000 / speed);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, buildSteps.length]);

  useEffect(() => {
    const step = buildSteps[currentStep];
    const combinedCode = `
      <html>
        <head>
          <style>${step.css}</style>
        </head>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
          ${step.html}
        </body>
      </html>
    `;
    setPreviewContent(combinedCode);
  }, [currentStep, buildSteps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,0.95)"
      zIndex={2000}
      overflow="auto"
      p={8}
    >
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg" color="white">
              🎬 HTML/CSS Replay - Watch UI Build Step by Step
            </Heading>
            <Button onClick={onClose} colorScheme="red" variant="solid">
              Close
            </Button>
          </HStack>

          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Text color="black">
              As code replays → UI builds gradually. Div appears → then styled → then animated!
            </Text>
          </Alert>

          {/* Controls */}
          <Box p={4} bg={colorMode === "dark" ? "gray.800" : "gray.100"} borderRadius="lg">
            <HStack spacing={4} wrap="wrap">
              <Button
                leftIcon={isPlaying ? <Text>⏸</Text> : <Text>▶</Text>}
                onClick={handlePlayPause}
                colorScheme="blue"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                leftIcon={<RepeatIcon />}
                onClick={handleReset}
                colorScheme="green"
              >
                Reset
              </Button>
              <Box flex={1} minW="200px">
                <Text fontSize="sm" mb={2}>
                  Speed: {speed}x
                </Text>
                <Slider
                  value={speed}
                  min={0.5}
                  max={3}
                  step={0.5}
                  onChange={handleSpeedChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Badge fontSize="md" p={2} colorScheme="purple">
                Step {currentStep + 1}/{buildSteps.length}: {buildSteps[currentStep].name}
              </Badge>
            </HStack>
          </Box>

          {/* Split View */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Code View */}
            <Box p={4} bg={colorMode === "dark" ? "gray.800" : "gray.100"} borderRadius="lg">
              <Text fontWeight="bold" mb={2}>
                📝 Current Code
              </Text>
              <Box
                as="pre"
                p={3}
                bg="black"
                color="green.400"
                borderRadius="md"
                fontSize="sm"
                overflow="auto"
                maxH="400px"
              >
                <code style={{ whiteSpace: "pre-wrap" }}>
                  {buildSteps[currentStep].css || "/* No CSS yet - just HTML structure */"}
                </code>
              </Box>
              <Text fontSize="xs" color="gray.500" mt={2}>
                As replay progresses, CSS gets added gradually
              </Text>
            </Box>

            {/* Preview View */}
            <Box p={4} bg={colorMode === "dark" ? "gray.800" : "gray.100"} borderRadius="lg">
              <Text fontWeight="bold" mb={2}>
                🖥️ Live Preview - UI Building Gradually
              </Text>
              <Box
                border="2px solid"
                borderColor="blue.500"
                borderRadius="md"
                overflow="hidden"
                bg="white"
              >
                <iframe
                  srcDoc={previewContent}
                  title="replay-preview"
                  style={{
                    width: "100%",
                    height: "400px",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </SimpleGrid>

          <Box p={4} bg="purple.50" borderRadius="lg">
            <Text fontWeight="bold" mb={2}>
              💡 What's happening:
            </Text>
            <Text fontSize="sm">
              {currentStep === 0 && "📦 Step 1: Starting with an empty container - just the HTML structure"}
              {currentStep === 1 && "📝 Step 2: Adding text content - the structure and content appear"}
              {currentStep === 2 && "🎨 Step 3: Basic styling - spacing, backgrounds, and borders are applied"}
              {currentStep === 3 && "🌈 Step 4: Adding colors - gradients and color schemes transform the look"}
              {currentStep === 4 && "✨ Step 5: Animations and interactions - hover effects and transitions bring it to life"}
            </Text>
          </Box>

          <Alert status="success" borderRadius="lg">
            <AlertIcon />
            <Text color="black">⭐ RARE FEATURE: Almost NO other platform has HTML/CSS replay with step-by-step UI building!</Text>
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
}