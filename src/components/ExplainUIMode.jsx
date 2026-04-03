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
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function ExplainUIMode({ onClose }) {
  const { colorMode } = useColorMode();
  const [selectedElement, setSelectedElement] = useState(null);
  const [explanation, setExplanation] = useState("");

  // Sample CSS rules for demonstration
  const cssRules = {
    container: {
      selector: ".gradient-card",
      properties: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      },
      explanation: "This card is centered because of display: flex + justify-content: center + align-items: center. The gradient background creates a modern, professional look. Box shadow adds depth and makes it pop off the page."
    },
    heading: {
      selector: "h2",
      properties: {
        color: "white",
        fontSize: "28px",
        textAlign: "center",
        marginBottom: "15px",
        fontWeight: "bold",
      },
      explanation: "White text color ensures maximum readability against the dark gradient background. Large font size and bold weight make it the focal point. Text-align center keeps it balanced in the flex container."
    },
    paragraph: {
      selector: "p",
      properties: {
        color: "#e0e0e0",
        textAlign: "center",
        marginBottom: "20px",
        lineHeight: "1.6",
      },
      explanation: "Light gray text provides good contrast without being harsh on the eyes. Proper line height (1.6) improves readability. Center alignment maintains visual consistency with the heading."
    },
    button: {
      selector: ".demo-button",
      properties: {
        background: "white",
        color: "#667eea",
        border: "none",
        padding: "12px 30px",
        borderRadius: "25px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "transform 0.2s, box-shadow 0.2s",
      },
      explanation: "White button creates strong contrast against the gradient background. Rounded corners (border-radius) make it look modern and friendly. The transition property enables smooth hover effects."
    }
  };

  const explainElement = (elementName) => {
    const rule = cssRules[elementName];
    if (rule) {
      setSelectedElement(elementName);
      setExplanation(`
        🎯 Element: ${rule.selector}
        
        📐 CSS Properties Applied:
        ${Object.entries(rule.properties).map(([key, value]) => `   • ${key}: ${value}`).join('\n')}
        
        💡 Why it looks like that:
        ${rule.explanation}
        
        📦 Box Model Breakdown:
        • Content: The text/children inside the element
        • Padding: Space between content and border (if any)
        • Border: The edge around the element
        • Margin: Space outside the element
      `);
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
              🔍 Explain My UI Mode - Simplified DevTools
            </Heading>
            <Button onClick={onClose} colorScheme="red" variant="solid">
              Close
            </Button>
          </HStack>

          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Text color="black">
              Click any element in the preview to see which CSS is applied and why it looks that way!
            </Text>
          </Alert>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Preview Side */}
            <Box>
              <Text fontWeight="bold" mb={3} color="white">
                🖥️ Interactive Preview (Click any element to explain)
              </Text>
              <Box
                p={6}
                bg="white"
                borderRadius="lg"
                minH="450px"
                position="relative"
              >
                <div
                  className="gradient-card"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "30px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "15px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    minHeight: "350px",
                    flexDirection: "column",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                  onClick={() => explainElement("container")}
                >
                  <Tooltip label="Click to explain this element" hasArrow>
                    <h2
                      style={{
                        color: "white",
                        fontSize: "28px",
                        textAlign: "center",
                        marginBottom: "15px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        explainElement("heading");
                      }}
                    >
                      Click Any Element to Explain
                    </h2>
                  </Tooltip>
                  <Tooltip label="Click to explain this element" hasArrow>
                    <p
                      style={{
                        color: "#e0e0e0",
                        textAlign: "center",
                        marginBottom: "20px",
                        lineHeight: "1.6",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        explainElement("paragraph");
                      }}
                    >
                      This is a demo paragraph. Click on me to see what CSS properties I have!
                    </p>
                  </Tooltip>
                  <Tooltip label="Click to explain this element" hasArrow>
                    <button
                      className="demo-button"
                      style={{
                        background: "white",
                        color: "#667eea",
                        border: "none",
                        padding: "12px 30px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        explainElement("button");
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Interactive Button
                    </button>
                  </Tooltip>
                </div>
              </Box>
              <Text fontSize="xs" color="gray.400" mt={2} textAlign="center">
                💡 Tip: Click on the heading, paragraph, or button to see their CSS explanations!
              </Text>
            </Box>

            {/* Explanation Side */}
            <Box>
              <Text fontWeight="bold" mb={3} color="white">
                💡 CSS Explanation Panel
              </Text>
              <Box
                p={6}
                bg={colorMode === "dark" ? "gray.800" : "gray.100"}
                borderRadius="lg"
                minH="450px"
              >
                {explanation ? (
                  <VStack align="start" spacing={3}>
                    <Badge colorScheme="green" fontSize="md" p={2}>
                      🎨 Element Analysis
                    </Badge>
                    <Text
                      whiteSpace="pre-wrap"
                      fontFamily="monospace"
                      fontSize="sm"
                      bg={colorMode === "dark" ? "gray.900" : "white"}
                      p={3}
                      borderRadius="md"
                      w="full"
                    >
                      {explanation}
                    </Text>
                    <Box
                      p={4}
                      bg={colorMode === "dark" ? "gray.700" : "white"}
                      borderRadius="md"
                      w="full"
                      mt={2}
                    >
                      <Text fontWeight="bold" mb={2} fontSize="sm">
                        📦 Visual Box Model Representation:
                      </Text>
                      <Box
                        border="2px solid #4299e1"
                        p={3}
                        bg="blue.50"
                        textAlign="center"
                        borderRadius="md"
                      >
                        <Text fontSize="xs" color="blue.800">Margin (space outside element)</Text>
                        <Box
                          border="2px solid #48bb78"
                          p={3}
                          bg="green.50"
                          m={2}
                          borderRadius="md"
                        >
                          <Text fontSize="xs" color="green.800">Border</Text>
                          <Box
                            border="2px solid #ed8936"
                            p={3}
                            bg="orange.50"
                            borderRadius="md"
                          >
                            <Text fontSize="xs" color="orange.800">Padding (space inside)</Text>
                            <Box
                              p={3}
                              bg="white"
                              border="1px solid #cbd5e0"
                              borderRadius="md"
                            >
                              <Text fontSize="xs">📄 Content</Text>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </VStack>
                ) : (
                  <VStack spacing={4} textAlign="center" pt={10}>
                    <InfoIcon boxSize={12} color="blue.400" />
                    <Text color="gray.600">
                      Click any element in the preview to see:
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      • Which CSS is applied
                      <br />
                      • Why it looks like that
                      <br />
                      • Box model breakdown
                      <br />
                      • Visual representation
                    </Text>
                  </VStack>
                )}
              </Box>
            </Box>
          </SimpleGrid>

          <Alert status="success" borderRadius="lg">
            <AlertIcon />
            <Text color="black">📚 LEARNING GOLD: Like DevTools... but simplified! Perfect for understanding CSS concepts.</Text>
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
}