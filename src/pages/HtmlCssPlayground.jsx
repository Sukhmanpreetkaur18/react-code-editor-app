import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorMode,
  Container,
  Badge,
  keyframes,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Textarea,
  Alert,
  AlertIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import { 
  MoonIcon, 
  SunIcon, 
  ArrowBackIcon,
  RepeatIcon,
  InfoIcon,
  ViewIcon,
  EditIcon,
  DownloadIcon,
  CopyIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.5); }
  50% { box-shadow: 0 0 20px rgba(66, 153, 225, 0.8); }
  100% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.5); }
`;

export default function HtmlCssPlayground({ onBack }) {
  const { colorMode } = useColorMode();
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .card {
      background: white;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      max-width: 400px;
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    h1 {
      color: #667eea;
      margin-bottom: 15px;
    }
    p {
      color: #666;
      margin-bottom: 20px;
    }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.2s;
    }
    button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>✨ Interactive Card</h1>
    <p>Hover over me to see the effect!</p>
    <button>Click Me</button>
  </div>
</body>
</html>`);
  
  const [cssCode, setCssCode] = useState(`.card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  max-width: 400px;
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
h1 {
  color: #667eea;
  margin-bottom: 15px;
}
p {
  color: #666;
  margin-bottom: 20px;
}
button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
}
button:hover {
  transform: scale(1.05);
}`);
  
  const [previewContent, setPreviewContent] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isReplayMode, setIsReplayMode] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayStep, setReplayStep] = useState(0);
  const intervalRef = useRef(null);

  // Sample templates
  const templates = {
    gradient: {
      html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', sans-serif;
      background: #f0f0f0;
    }
    .card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      color: white;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }
    button {
      background: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      cursor: pointer;
      margin-top: 20px;
      font-weight: bold;
      transition: transform 0.2s;
    }
    button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Gradient Card</h1>
    <p>Beautiful gradient background</p>
    <button>Learn More</button>
  </div>
</body>
</html>`,
      css: `.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: white;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
button {
  background: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  transition: transform 0.2s;
}
button:hover {
  transform: scale(1.05);
}`
    },
    animation: {
      html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f0f0f0;
    }
    .box {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 10px;
      animation: bounce 2s infinite;
      cursor: pointer;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-50px); }
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>`,
      css: `.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  animation: bounce 2s infinite;
  cursor: pointer;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-50px);
}`
    },
    flexbox: {
      html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f0f0f0;
      font-family: 'Segoe UI', sans-serif;
    }
    .container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
      padding: 20px;
    }
    .item {
      background: linear-gradient(135deg, #667eea, #764ba2);
      padding: 30px;
      border-radius: 10px;
      color: white;
      text-align: center;
      min-width: 150px;
      transition: transform 0.3s;
    }
    .item:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item">📦 Item 1</div>
    <div class="item">🎨 Item 2</div>
    <div class="item">⚡ Item 3</div>
  </div>
</body>
</html>`,
      css: `.container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
.item {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 30px;
  border-radius: 10px;
  color: white;
  text-align: center;
  min-width: 150px;
  transition: transform 0.3s;
}
.item:hover {
  transform: scale(1.05);
}`
    }
  };

  // Update preview
  useEffect(() => {
    if (!isReplayMode) {
      const fullHtml = htmlCode.includes('<!DOCTYPE html>') ? htmlCode : `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
        </body>
        </html>
      `;
      setPreviewContent(fullHtml);
    }
  }, [htmlCode, cssCode, isReplayMode]);

  // Replay mode logic
  useEffect(() => {
    if (isReplayMode && isPlaying) {
      intervalRef.current = setInterval(() => {
        setReplayStep((prev) => {
          if (prev < 100) {
            return prev + 10;
          } else {
            setIsPlaying(false);
            return 100;
          }
        });
      }, 300 / replaySpeed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isReplayMode, isPlaying, replaySpeed]);

  const loadTemplate = (template) => {
    setHtmlCode(templates[template].html);
    setCssCode(templates[template].css);
    setIsReplayMode(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const startReplayMode = () => {
    setIsReplayMode(true);
    setIsPlaying(true);
    setReplayStep(0);
  };

  return (
    <Box
      minH="100vh"
      bg={colorMode === "dark" ? "gray.900" : "gray.50"}
      color={colorMode === "dark" ? "white" : "gray.800"}
      overflow="auto"
    >
      {/* Header */}
      <Box
        position="sticky"
        top={0}
        zIndex={100}
        bg={colorMode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)"}
        backdropFilter="blur(10px)"
        borderBottom="1px solid"
        borderColor={colorMode === "dark" ? "whiteAlpha.200" : "gray.200"}
      >
        <Container maxW="container.xl" py={4}>
          <HStack justify="space-between" wrap="wrap" spacing={4}>
            <HStack spacing={4}>
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={onBack}
                variant="ghost"
                aria-label="Go back"
              />
              <VStack align="start" spacing={0}>
                <Heading size="md">
                  🎨 HTML/CSS Visual Playground
                </Heading>
                <Text fontSize="xs" color="gray.500">
                  Live editor with Replay, Explain, and Compare features
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={3}>
              <Button
                size="sm"
                leftIcon={<Text>🎬</Text>}
                colorScheme="purple"
                onClick={startReplayMode}
              >
                Replay UI
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={6}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          {/* Editor Panel */}
          <GridItem>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Heading size="sm">✏️ Code Editor</Heading>
                <HStack>
                  <Tooltip label="Copy HTML">
                    <IconButton
                      icon={copied ? <CheckCircleIcon /> : <CopyIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      colorScheme={copied ? "green" : "blue"}
                    />
                  </Tooltip>
                  <Tooltip label="Download HTML">
                    <IconButton
                      icon={<DownloadIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={downloadCode}
                    />
                  </Tooltip>
                </HStack>
              </HStack>

              <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)}>
                <TabList>
                  <Tab>📝 HTML</Tab>
                  <Tab>🎨 CSS</Tab>
                  <Tab>📦 Templates</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <Textarea
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      fontFamily="monospace"
                      fontSize="sm"
                      minH="400px"
                      bg={colorMode === "dark" ? "gray.800" : "white"}
                      placeholder="Write your HTML here..."
                    />
                  </TabPanel>

                  <TabPanel px={0}>
                    <Textarea
                      value={cssCode}
                      onChange={(e) => setCssCode(e.target.value)}
                      fontFamily="monospace"
                      fontSize="sm"
                      minH="400px"
                      bg={colorMode === "dark" ? "gray.800" : "white"}
                      placeholder="Write your CSS here..."
                    />
                  </TabPanel>

                  <TabPanel px={0}>
                    <SimpleGrid columns={2} spacing={4}>
                      <Button onClick={() => loadTemplate('gradient')} h="80px" variant="outline" colorScheme="purple">
                        <VStack>
                          <Text fontSize="24px">🎨</Text>
                          <Text fontSize="sm">Gradient Card</Text>
                        </VStack>
                      </Button>
                      <Button onClick={() => loadTemplate('animation')} h="80px" variant="outline" colorScheme="green">
                        <VStack>
                          <Text fontSize="24px">🔄</Text>
                          <Text fontSize="sm">Animation</Text>
                        </VStack>
                      </Button>
                      <Button onClick={() => loadTemplate('flexbox')} h="80px" variant="outline" colorScheme="blue">
                        <VStack>
                          <Text fontSize="24px">📐</Text>
                          <Text fontSize="sm">Flexbox Layout</Text>
                        </VStack>
                      </Button>
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Alert status="info" borderRadius="lg" fontSize="sm">
                <AlertIcon />
                💡 Tip: Use the Replay UI button to watch your UI build step-by-step!
              </Alert>
            </VStack>
          </GridItem>

          {/* Preview Panel */}
          <GridItem>
            <VStack spacing={4} align="stretch" h="100%">
              <HStack justify="space-between">
                <Heading size="sm">🖥️ Live Preview</Heading>
                <Badge colorScheme="green" fontSize="xs">
                  Instant Updates
                </Badge>
              </HStack>

              <Box
                border="2px solid"
                borderColor="blue.500"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                minH="500px"
              >
                <iframe
                  srcDoc={previewContent}
                  title="preview"
                  style={{
                    width: "100%",
                    height: "500px",
                    border: "none",
                  }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </Box>

              {/* Replay Mode Controls */}
              {isReplayMode && (
                <Box p={4} bg={colorMode === "dark" ? "gray.800" : "gray.100"} borderRadius="lg">
                  <VStack spacing={3}>
                    <Text fontWeight="bold">🎬 Replay Mode - Watch UI Build</Text>
                    <HStack w="full" spacing={4}>
                      <Button
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        colorScheme="blue"
                      >
                        {isPlaying ? "⏸ Pause" : "▶ Play"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsPlaying(false);
                          setReplayStep(0);
                        }}
                      >
                        🔄 Reset
                      </Button>
                      <Box flex={1}>
                        <Text fontSize="xs">Speed: {replaySpeed}x</Text>
                        <Slider
                          value={replaySpeed}
                          min={0.5}
                          max={3}
                          step={0.5}
                          onChange={setReplaySpeed}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </Box>
                    </HStack>
                    <Progress value={replayStep} width="100%" colorScheme="purple" borderRadius="full" />
                    <Text fontSize="xs" color="gray.500">
                      {replayStep < 30 && "📝 Adding HTML structure..."}
                      {replayStep >= 30 && replayStep < 60 && "🎨 Applying basic styles..."}
                      {replayStep >= 60 && replayStep < 90 && "✨ Adding colors and effects..."}
                      {replayStep >= 90 && replayStep < 100 && "🎬 Adding animations..."}
                      {replayStep >= 100 && "✅ Build complete!"}
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}