import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useColorMode,
  Badge,
  Container,
  Heading,
  SimpleGrid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function BeforeAfterCompare({ onClose }) {
  const { colorMode } = useColorMode();

  // Before (without CSS)
  const beforeHtml = `
    <html>
      <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
        <div style="padding: 20px;">
          <h1>Hello World</h1>
          <p>This is how it looks without CSS</p>
          <button>Click Me</button>
          <div style="margin-top: 20px;">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </div>
        </div>
      </body>
    </html>
  `;

  // After (with full CSS)
  const afterHtml = `
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            margin: 0;
          }
          .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 400px;
            animation: slideIn 0.5s;
          }
          h1 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 28px;
          }
          p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
          }
          button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: transform 0.2s, box-shadow 0.2s;
            width: 100%;
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102,126,234,0.4);
          }
          .items {
            margin-top: 25px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .item {
            background: #f5f5f5;
            padding: 12px;
            border-radius: 8px;
            transition: all 0.3s;
            cursor: pointer;
            text-align: center;
          }
          .item:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: translateX(10px);
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>✨ Hello World</h1>
          <p>This is how it looks WITH CSS - complete with animations, gradients, and modern design!</p>
          <button>✨ Interactive Button</button>
          <div class="items">
            <div class="item">🎨 Styled Item 1</div>
            <div class="item">🎯 Styled Item 2</div>
            <div class="item">⚡ Styled Item 3</div>
          </div>
        </div>
      </body>
    </html>
  `;

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
              🔄 Before vs After - See the Impact of CSS
            </Heading>
            <Button onClick={onClose} colorScheme="red" variant="solid">
              Close
            </Button>
          </HStack>

          <Badge colorScheme="purple" fontSize="md" p={2} alignSelf="center">
            Split Screen: Left → Without CSS | Right → With CSS
          </Badge>

          {/* Split Screen View */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {/* Before Side */}
            <Box
              p={4}
              bg={colorMode === "dark" ? "gray.800" : "gray.100"}
              borderRadius="lg"
            >
              <Text fontWeight="bold" mb={3} color="red.400" fontSize="lg">
                ❌ BEFORE (Without CSS)
              </Text>
              <Box
                border="2px solid"
                borderColor="red.300"
                borderRadius="md"
                overflow="hidden"
                bg="white"
                minH="450px"
              >
                <iframe
                  srcDoc={beforeHtml}
                  title="before-preview"
                  style={{
                    width: "100%",
                    height: "450px",
                    border: "none",
                  }}
                />
              </Box>
              <VStack align="start" spacing={1} mt={3}>
                <Text fontSize="sm" color="gray.600">
                  ❌ No styling applied
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ❌ Default browser styles only
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ❌ No spacing or visual hierarchy
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ❌ Plain and unappealing
                </Text>
              </VStack>
            </Box>

            {/* After Side */}
            <Box
              p={4}
              bg={colorMode === "dark" ? "gray.800" : "gray.100"}
              borderRadius="lg"
            >
              <Text fontWeight="bold" mb={3} color="green.400" fontSize="lg">
                ✅ AFTER (With CSS)
              </Text>
              <Box
                border="2px solid"
                borderColor="green.300"
                borderRadius="md"
                overflow="hidden"
                bg="white"
                minH="450px"
              >
                <iframe
                  srcDoc={afterHtml}
                  title="after-preview"
                  style={{
                    width: "100%",
                    height: "450px",
                    border: "none",
                  }}
                />
              </Box>
              <VStack align="start" spacing={1} mt={3}>
                <Text fontSize="sm" color="gray.600">
                  ✅ Modern gradient background
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ✅ Smooth animations and hover effects
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ✅ Professional spacing and design
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ✅ Interactive and engaging
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Comparison Details */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Box p={4} bg="blue.50" borderRadius="lg">
              <Text fontWeight="bold" mb={2} fontSize="md">
                🎨 Visual Impact
              </Text>
              <Text fontSize="sm">
                CSS transforms plain HTML into a modern, engaging interface with colors,
                gradients, and professional spacing.
              </Text>
            </Box>
            <Box p={4} bg="green.50" borderRadius="lg">
              <Text fontWeight="bold" mb={2} fontSize="md">
                ⚡ Interactive Effects
              </Text>
              <Text fontSize="sm">
                Hover effects, transitions, and animations make the interface feel
                responsive and polished.
              </Text>
            </Box>
            <Box p={4} bg="purple.50" borderRadius="lg">
              <Text fontWeight="bold" mb={2} fontSize="md">
                📐 Layout & Structure
              </Text>
              <Text fontSize="sm">
                Flexbox, centering, and proper spacing create visual hierarchy and
                improve readability.
              </Text>
            </Box>
          </SimpleGrid>

          <Alert status="success" borderRadius="lg">
            <AlertIcon />
            <Text color="black">📊 Shows the actual impact of styling! Perfect for understanding why CSS matters.</Text>
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
}