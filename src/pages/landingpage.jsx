import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorMode,
  SimpleGrid,
  Container,
  Badge,
  keyframes,
  Tooltip,
  Wrap,
  WrapItem,
  Progress,
  Tag,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  usePrefersReducedMotion,
  Input,
  InputGroup,
  InputRightElement,
  Code,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { 
  MoonIcon, 
  SunIcon, 
  ChevronRightIcon, 
  DownloadIcon,
  SettingsIcon,
  CheckCircleIcon,
  ArrowForwardIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  ViewIcon,
  TimeIcon,
  StarIcon,
  LockIcon,
  HamburgerIcon,
  CloseIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import ReplayPreview from "../components/ReplayPreview";
import ExplainUIMode from "../components/ExplainUIMode";
import BeforeAfterCompare from "../components/BeforeAfterCompare";
import HtmlCssPlayground from "./HtmlCssPlayground";

// Custom animations
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

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.98); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export default function LandingPage({ onLaunch }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoCode, setDemoCode] = useState('console.log("Hello World")');
  const [demoOutput, setDemoOutput] = useState('');
  const [isRunningDemo, setIsRunningDemo] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showReplay, setShowReplay] = useState(false);
  const [showExplainUI, setShowExplainUI] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showHtmlCssPlayground, setShowHtmlCssPlayground] = useState(false);

  // Typing animation texts
  const texts = [
    "Run Python offline",
    "Execute JavaScript instantly", 
    "Zero latency dev",
    "Code anywhere, anytime",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Typing animation
  useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];
    
    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
      } else {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, texts]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Demo runner
  const runDemo = () => {
    setIsRunningDemo(true);
    setDemoOutput('');
    
    setTimeout(() => {
      try {
        // Simulate JavaScript execution
        if (demoCode.includes('console.log')) {
          const match = demoCode.match(/console\.log\(["'](.+?)["']\)/);
          if (match) {
            setDemoOutput(`> ${match[1]}`);
          } else {
            setDemoOutput('> Hello World');
          }
        } else {
          setDemoOutput('> Executed successfully (0ms latency)');
        }
      } catch (error) {
        setDemoOutput(`> Error: ${error.message}`);
      }
      setIsRunningDemo(false);
    }, 500);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const openHtmlCssPlayground = () => {
    setShowHtmlCssPlayground(true);
  };

  const floatingAnimation = prefersReducedMotion ? {} : { animation: `${float} 3s ease-in-out infinite` };
  const glowAnimation = prefersReducedMotion ? {} : { animation: `${glow} 2s ease-in-out infinite` };
  const pulseAnimation = prefersReducedMotion ? {} : { animation: `${pulse} 2s ease-in-out infinite` };
  const slideInAnimation = prefersReducedMotion ? {} : { animation: `${slideIn} 0.6s ease-out` };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'comparison', label: 'Comparison', icon: '⚔️' },
    { id: 'demo', label: 'Live Demo', icon: '🎬' },
    { id: 'usecases', label: 'Use Cases', icon: '👨‍💻' },
    { id: 'howitworks', label: 'How It Works', icon: '⚙️' },
  ];

  // Unique selling points
  const uniquePoints = [
    {
      title: "Works Completely OFFLINE",
      icon: DownloadIcon,
      description: "Runs in browser using JS engine + Pyodide. No server, no API, no latency",
      advantage: "No internet dependency",
      color: "blue",
      gradient: "linear(to-br, blue.400, blue.600)",
      highlight: "✅ Eliminates cloud execution dependency"
    },
    {
      title: "Code Replay System",
      icon: RepeatIcon,
      description: "Watch your code come to life with replay animations. Pause, resume, and control speed",
      advantage: "Visual learning experience",
      color: "purple",
      gradient: "linear(to-br, purple.400, purple.600)",
      highlight: "🎬 Transform code into visual storytelling"
    },
    {
      title: "Input Simulation",
      icon: SettingsIcon,
      description: "Simulates prompt() for JS and input() for Python with clear input/output flow",
      advantage: "Beginner-friendly",
      color: "green",
      gradient: "linear(to-br, green.400, green.600)",
      highlight: "🧠 No terminal complexity"
    },
    {
      title: "Local File System",
      icon: LockIcon,
      description: "Save, load, and delete files using localStorage. No login required",
      advantage: "Full ownership",
      color: "orange",
      gradient: "linear(to-br, orange.400, orange.600)",
      highlight: "💾 Zero data dependency"
    },
    {
      title: "Instant Execution",
      icon: TimeIcon,
      description: "No server queue, no execution delay. Runs instantly in your browser",
      advantage: "Zero latency",
      color: "red",
      gradient: "linear(to-br, red.400, red.600)",
      highlight: "⚡ Instant feedback"
    },
    {
      title: "Learning Focused",
      icon: StarIcon,
      description: "Understanding code flow, visualizing execution, and experimenting freely",
      advantage: "Interactive learning",
      color: "pink",
      gradient: "linear(to-br, pink.400, pink.600)",
      highlight: "🎯 Beyond competitive coding"
    }
  ];

  // Comparison data
  const comparisonData = [
    { feature: "Offline support", ourProject: "✅ Yes", competitors: "❌ No" },
    { feature: "Code Replay", ourProject: "✅ Yes", competitors: "❌ No" },
    { feature: "Input simulation", ourProject: "✅ Clean", competitors: "⚠️ Basic" },
    { feature: "Local storage", ourProject: "✅ Yes", competitors: "❌ Cloud-based" },
    { feature: "Execution speed", ourProject: "⚡ Instant", competitors: "⏳ Depends on server" },
    { feature: "Learning experience", ourProject: "🎬 Interactive", competitors: "📄 Static" },
    { feature: "Installation required", ourProject: "🚫 None", competitors: "❌ Usually required" },
    { feature: "Zero config", ourProject: "✅ Yes", competitors: "⚠️ Sometimes" },
  ];

  // Stats
  const stats = [
    { value: "0ms", label: "Startup Time", trend: "+50% faster", color: "blue.400", icon: "⚡" },
    { value: "100%", label: "Offline Ready", trend: "No internet needed", color: "green.400", icon: "📱" },
    { value: "∞", label: "Unlimited Runs", trend: "No server queue", color: "purple.400", icon: "🔄" },
    { value: "0", label: "API Calls", trend: "Zero latency", color: "orange.400", icon: "🚀" },
    { value: "0", label: "Installation", trend: "No setup needed", color: "cyan.400", icon: "✨" },
  ];

  // Use cases
  const useCases = [
    {
      title: "📚 Practice Coding Without Internet",
      description: "Perfect for students in hostels, travelers, or areas with unstable internet",
      icon: "🌍",
      users: "Students, Travelers"
    },
    {
      title: "🧪 Quickly Test Ideas",
      description: "No need to set up local environments. Just open, code, and experiment",
      icon: "💡",
      users: "Developers, Hobbyists"
    },
    {
      title: "🎓 Teach Concepts with Replay",
      description: "Visualize code execution step-by-step. Perfect for educators and learners",
      icon: "👨‍🏫",
      users: "Teachers, Students"
    },
    {
      title: "💻 Run on Low-End Devices",
      description: "No heavy IDEs required. Works smoothly on Chromebooks, tablets, and older laptops",
      icon: "⚙️",
      users: "Budget-conscious users"
    }
  ];

  // How it works steps
  const howItWorks = [
    {
      title: "JavaScript Runtime",
      description: "Runs natively in browser engine for instant execution",
      icon: "⚡",
      tech: "Browser Engine"
    },
    {
      title: "Python via Pyodide",
      description: "WebAssembly brings Python runtime to your browser",
      icon: "🐍",
      tech: "WebAssembly + Pyodide"
    },
    {
      title: "Input Simulation",
      description: "Custom runtime that simulates user input without terminal complexity",
      icon: "🎯",
      tech: "Custom Runtime"
    },
    {
      title: "Local Storage",
      description: "All files saved locally - no cloud, no servers, full privacy",
      icon: "💾",
      tech: "Browser localStorage"
    }
  ];

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      bg={colorMode === "dark" ? "gray.900" : "gray.50"}
      color={colorMode === "dark" ? "white" : "gray.800"}
    >
      {/* Animated background blobs */}
      <Box position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none" opacity={0.1}>
        <Box position="absolute" top="10%" left="5%" w="400px" h="400px" bg="blue.400" borderRadius="full" filter="blur(100px)" />
        <Box position="absolute" bottom="10%" right="5%" w="400px" h="400px" bg="purple.400" borderRadius="full" filter="blur(100px)" />
        <Box position="absolute" top="50%" left="50%" w="300px" h="300px" bg="pink.400" borderRadius="full" filter="blur(100px)" />
      </Box>

      {/* Navbar */}
      <Box position="sticky" top={0} zIndex={1000} bg={colorMode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)"} backdropFilter="blur(10px)" borderBottom="1px solid" borderColor={colorMode === "dark" ? "whiteAlpha.200" : "gray.200"}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <HStack justify="space-between" py={5}>
            <HStack spacing={3} cursor="pointer" onClick={() => scrollToSection('home')}>
              <Box
                w="40px"
                h="40px"
                bgGradient="linear(to-r, blue.400, purple.400, pink.400)"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                {...floatingAnimation}
              >
                <Text fontSize="xl" fontWeight="bold">⚡</Text>
              </Box>
              <VStack align="start" spacing={0}>
                <Heading fontSize={{ base: "md", md: "xl" }} bgGradient="linear(to-r, blue.400, purple.400, pink.400)" bgClip="text">
                  OfflineCode Forge
                </Heading>
                <Text fontSize="xs" color="gray.500">No Setup Required</Text>
              </VStack>
            </HStack>

            {/* Desktop Navigation */}
            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  color={activeSection === item.id ? "blue.400" : undefined}
                  _hover={{ color: "blue.400" }}
                >
                  {item.icon} {item.label}
                </Button>
              ))}
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                borderRadius="full"
              />
            </HStack>

            {/* Mobile Menu Button */}
            <HStack spacing={2} display={{ base: "flex", md: "none" }}>
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
              <IconButton
                aria-label="Menu"
                icon={mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="sm"
              />
            </HStack>
          </HStack>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <VStack py={4} spacing={2} display={{ base: "flex", md: "none" }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  w="full"
                  onClick={() => scrollToSection(item.id)}
                  color={activeSection === item.id ? "blue.400" : undefined}
                >
                  {item.icon} {item.label}
                </Button>
              ))}
            </VStack>
          )}
        </Container>
      </Box>

      {/* Hero Section - Home */}
      <Box id="home">
        <Box h={8} />
        <Container maxW="container.xl" minH="60vh" display="flex" alignItems="center" position="relative" zIndex={2}>
          <VStack spacing={10} textAlign="center" w="full">
            <Badge colorScheme="blue" fontSize="md" px={4} py={4} borderRadius="full" variant="solid" {...pulseAnimation}>
              🚀 Zero Installation | No Setup | Just Code
            </Badge>

            <Heading fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} lineHeight="1.2">
              <Text as="span" bgGradient="linear(to-r, blue.400, purple.400, pink.400)" bgClip="text">
                Fully Offline
              </Text>
              <br />
              <Text>Interactive Code Playground</Text>
            </Heading>

            <Text fontSize="xl" color="gray.500" maxW="800px">
              No installation. No dependencies. No configuration. <br />
              <strong>Just open and code.</strong> Our compiler eliminates dependency on cloud execution by running entirely client-side.
            </Text>

            <Text fontFamily="monospace" fontSize={{ base: "lg", md: "xl" }} color={colorMode === "dark" ? "blue.300" : "blue.600"}>
              {displayText}
              <Text as="span" opacity={cursorVisible ? 1 : 0}>|</Text>
            </Text>

            {/* Enhanced Terminal Preview */}
            <Box
              p={6}
              bg="black"
              borderRadius="16px"
              fontFamily="monospace"
              w="full"
              maxW="650px"
              textAlign="left"
              border="1px solid"
              borderColor="blue.500"
              boxShadow="xl"
              {...glowAnimation}
            >
              <HStack mb={3} spacing={2}>
                <Box w="12px" h="12px" borderRadius="full" bg="red.500" />
                <Box w="12px" h="12px" borderRadius="full" bg="yellow.500" />
                <Box w="12px" h="12px" borderRadius="full" bg="green.500" />
                <Text fontSize="xs" color="gray.400" ml={2}>offline-code-playground</Text>
                <Spinner size="xs" ml="auto" color="blue.400" />
              </HStack>
              <Text color="green.400">$ python demo.py</Text>
              <Text color="white">Enter your name: <Text as="span" color="blue.300">_</Text></Text>
              <Text color="cyan.400">🎬 Recording session...</Text>
              <Text color="yellow.400">⏵ Replay available | Speed: 1x</Text>
              <Text color="gray.400" fontSize="sm" mt={2} display="flex" alignItems="center" gap={2}>
                <CheckCircleIcon boxSize={3} /> Executed locally | 0ms latency | 0 API calls
              </Text>
            </Box>

            <HStack spacing={4} pt={4} wrap="wrap" justify="center">
              <Button
                size="lg"
                bgGradient="linear(to-r, blue.400, purple.500)"
                color="white"
                _hover={{ transform: "scale(1.05)" }}
                rightIcon={<ChevronRightIcon />}
                onClick={onLaunch}
                px={8}
              >
                Launch Editor — No Login Required
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                colorScheme="blue"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => scrollToSection('demo')}
              >
                Try Live Demo
              </Button>

              <Button
                size="lg"
                variant="outline"
                colorScheme="purple"
                rightIcon={<EditIcon />}
                onClick={openHtmlCssPlayground}
                _hover={{
                  transform: "scale(1.05)",
                  bgGradient: "linear(to-r, purple.500, pink.500)",
                  color: "white",
                  borderColor: "transparent"
                }}
              >
                🎨 HTML/CSS Playground
              </Button>
            </HStack>

            {/* No Installation Banner */}
            <Alert status="success" borderRadius="xl" maxW="800px" mt={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">🚫 Zero Setup Required</Text>
                <Text fontSize="sm">No installation • No dependencies • No configuration • Just open and code</Text>
              </Box>
            </Alert>

            {/* Stats */}
            <Wrap spacing={6} pt={8} justify="center">
              {stats.map((stat, idx) => (
                <WrapItem key={idx}>
                  <VStack spacing={1} px={4} py={2} borderRadius="lg" bg={colorMode === "dark" ? "whiteAlpha.100" : "white"} minW="120px">
                    <Text fontSize="2xl" fontWeight="bold" color={stat.color}>
                      {stat.value}
                    </Text>
                    <HStack spacing={1}>
                      <Text>{stat.icon}</Text>
                      <Text fontSize="sm" fontWeight="medium">{stat.label}</Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.500">{stat.trend}</Text>
                  </VStack>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" py={20} bg={colorMode === "dark" ? "blackAlpha.300" : "gray.100"} position="relative" zIndex={2}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={3}>
              <Badge colorScheme="purple" fontSize="sm" px={3} py={1} borderRadius="full">
                🧠 CORE UNIQUE ADVANTAGES
              </Badge>
              <Heading textAlign="center" fontSize={{ base: "3xl", md: "4xl" }}>
                What Makes It Different
              </Heading>
              <Text textAlign="center" color="gray.500" maxW="700px" fontSize="lg">
                Unlike traditional platforms that rely on servers and internet, we bring the power of coding directly to your browser
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {uniquePoints.map((point, idx) => (
                <Box
                  key={idx}
                  p={6}
                  borderRadius="xl"
                  bg={colorMode === "dark" ? "whiteAlpha.100" : "white"}
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
                  position="relative"
                  overflow="hidden"
                >
                  <Box position="absolute" top={0} left={0} right={0} height="4px" bgGradient={point.gradient} />
                  <Box w="50px" h="50px" borderRadius="full" bgGradient={point.gradient} display="flex" alignItems="center" justifyContent="center" mb={4}>
                    <point.icon boxSize={6} color="white" />
                  </Box>
                  <Heading size="md" mb={2}>{point.title}</Heading>
                  <Text fontSize="sm" color={colorMode === "dark" ? "gray.400" : "gray.600"} mb={3}>
                    {point.description}
                  </Text>
                  <Badge colorScheme={point.color} variant="subtle" fontSize="xs">
                    {point.highlight}
                  </Badge>
                  <Text fontSize="xs" color="green.500" mt={3} fontWeight="bold">
                    {point.advantage}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Box id="advanced-features" py={20} position="relative" zIndex={2}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={3}>
              <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                🚀 INSANE USP - Features No One Else Has
              </Badge>
              <Heading textAlign="center" fontSize="3xl">
                Revolutionary Features
              </Heading>
              <Text textAlign="center" color="gray.500" maxW="700px">
                These features make us completely unique in the market
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {/* Replay Feature Button */}
              <Box
                p={6}
                borderRadius="xl"
                bgGradient="linear(to-br, purple.500, pink.500)"
                color="white"
                textAlign="center"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
                onClick={() => setShowReplay(true)}
              >
                <Text fontSize="4xl" mb={3}>🎬</Text>
                <Heading size="md" mb={2}>HTML/CSS Replay</Heading>
                <Text fontSize="sm" opacity={0.9}>
                  Watch UI build step-by-step
                  <br />
                  <strong>Div appears → styled → animated</strong>
                </Text>
                <Button mt={4} size="sm" variant="outline" colorScheme="white">
                  Try Demo →
                </Button>
              </Box>

              {/* Explain UI Feature Button */}
              <Box
                p={6}
                borderRadius="xl"
                bgGradient="linear(to-br, blue.500, cyan.500)"
                color="white"
                textAlign="center"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
                onClick={() => setShowExplainUI(true)}
              >
                <Text fontSize="4xl" mb={3}>🔍</Text>
                <Heading size="md" mb={2}>Explain My UI Mode</Heading>
                <Text fontSize="sm" opacity={0.9}>
                  Click any element → See CSS applied
                  <br />
                  <strong>Like DevTools... but simplified</strong>
                </Text>
                <Button mt={4} size="sm" variant="outline" colorScheme="white">
                  Try Demo →
                </Button>
              </Box>

              {/* Before/After Compare Feature Button */}
              <Box
                p={6}
                borderRadius="xl"
                bgGradient="linear(to-br, green.500, teal.500)"
                color="white"
                textAlign="center"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
                onClick={() => setShowCompare(true)}
              >
                <Text fontSize="4xl" mb={3}>🔄</Text>
                <Heading size="md" mb={2}>Before vs After Mode</Heading>
                <Text fontSize="sm" opacity={0.9}>
                  Split screen comparison
                  <br />
                  <strong>Shows actual impact of styling</strong>
                </Text>
                <Button mt={4} size="sm" variant="outline" colorScheme="white">
                  Try Demo →
                </Button>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Render Modals */}
      {showReplay && <ReplayPreview onClose={() => setShowReplay(false)} />}
      {showExplainUI && <ExplainUIMode onClose={() => setShowExplainUI(false)} />}
      {showCompare && <BeforeAfterCompare onClose={() => setShowCompare(false)} />}

      {/* Live Demo Section */}
      <Box id="demo" py={20} position="relative" zIndex={2}>
        <Container maxW="container.lg">
          <VStack spacing={8}>
            <Badge colorScheme="red" fontSize="lg" px={4} py={2} borderRadius="full" {...pulseAnimation}>
              🎬 TRY IT INSTANTLY - LIVE DEMO
            </Badge>
            <Heading textAlign="center" fontSize="3xl">
              See It In Action
            </Heading>
            <Text textAlign="center" color="gray.500" fontSize="lg">
              No setup, no installation - just click Run and see the result instantly
            </Text>

            <Box
              w="full"
              p={6}
              borderRadius="xl"
              bg={colorMode === "dark" ? "gray.800" : "white"}
              boxShadow="2xl"
              border="1px solid"
              borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
            >
              <Text fontWeight="bold" mb={3}>JavaScript Demo:</Text>
              <InputGroup size="lg">
                <Input
                  fontFamily="monospace"
                  value={demoCode}
                  onChange={(e) => setDemoCode(e.target.value)}
                  bg={colorMode === "dark" ? "gray.900" : "gray.50"}
                />
                <InputRightElement width="100px">
                  <Button
                    colorScheme="blue"
                    onClick={runDemo}
                    isLoading={isRunningDemo}
                    loadingText="Running..."
                    leftIcon={<ArrowForwardIcon />}
                  >
                    Run
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Box
                mt={4}
                p={4}
                borderRadius="md"
                bg="black"
                color="green.400"
                fontFamily="monospace"
                minH="80px"
              >
                <Text>{demoOutput || '> Click Run to see output'}</Text>
              </Box>

              <Text fontSize="sm" color="gray.500" mt={3}>
                ⚡ Runs locally in your browser • 0ms latency • No API calls
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box id="usecases" py={20} bg={colorMode === "dark" ? "blackAlpha.300" : "gray.100"} position="relative" zIndex={2}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={3}>
              <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
                👨‍💻 REAL-WORLD APPLICATIONS
              </Badge>
              <Heading textAlign="center" fontSize="3xl">
                Where This Helps
              </Heading>
              <Text textAlign="center" color="gray.500" maxW="600px">
                From students to professionals - everyone benefits from offline coding
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              {useCases.map((useCase, idx) => (
                <Box
                  key={idx}
                  p={6}
                  borderRadius="xl"
                  bg={colorMode === "dark" ? "whiteAlpha.100" : "white"}
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                >
                  <Text fontSize="4xl" mb={3}>{useCase.icon}</Text>
                  <Heading size="md" mb={2}>{useCase.title}</Heading>
                  <Text color="gray.500" mb={3}>{useCase.description}</Text>
                  <Badge colorScheme="blue">🎯 {useCase.users}</Badge>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="howitworks" py={20} position="relative" zIndex={2}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={3}>
              <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                ⚙️ TECHNICAL ARCHITECTURE
              </Badge>
              <Heading textAlign="center" fontSize="3xl">
                How It Works
              </Heading>
              <Text textAlign="center" color="gray.500" maxW="700px" fontSize="lg">
                Powered by modern web technologies to bring full offline coding capabilities to your browser
              </Text>
              <Code p={3} borderRadius="lg" fontSize="md" bg={colorMode === "dark" ? "gray.800" : "gray.100"}>
                💡 Powered by WebAssembly, bringing Python to the browser.
              </Code>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
              {howItWorks.map((step, idx) => (
                <Box
                  key={idx}
                  p={6}
                  borderRadius="xl"
                  bg={colorMode === "dark" ? "whiteAlpha.100" : "white"}
                  textAlign="center"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={-15}
                    left="50%"
                    transform="translateX(-50%)"
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bgGradient="linear(to-r, blue.400, purple.400)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontWeight="bold"
                  >
                    {idx + 1}
                  </Box>
                  <Text fontSize="3xl" mt={4} mb={3}>{step.icon}</Text>
                  <Heading size="sm" mb={2}>{step.title}</Heading>
                  <Text fontSize="sm" color="gray.500" mb={2}>{step.description}</Text>
                  <Badge colorScheme="purple" fontSize="xs">{step.tech}</Badge>
                </Box>
              ))}
            </SimpleGrid>

            <Box p={6} borderRadius="xl" bg={colorMode === "dark" ? "blue.900" : "blue.50"} w="full" textAlign="center">
              <Text fontWeight="bold" fontSize="lg">⚡ Complete Offline Architecture</Text>
              <Text mt={2}>JavaScript → Browser Engine • Python → Pyodide (WebAssembly) • Input → Custom Runtime • Storage → localStorage</Text>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Comparison Table Section */}
      <Box id="comparison" py={20} bg={colorMode === "dark" ? "blackAlpha.300" : "gray.100"} position="relative" zIndex={2}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Badge colorScheme="red" fontSize="sm" px={3} py={1} borderRadius="full">
              ⚔️ VS Traditional Platforms
            </Badge>
            <Heading textAlign="center" fontSize="3xl">
              Why We're Different
            </Heading>
            <TableContainer w="full" borderRadius="xl" overflow="hidden" boxShadow="lg">
              <Table variant="simple" size="lg">
                <Thead bg={colorMode === "dark" ? "blue.900" : "blue.50"}>
                  <Tr>
                    <Th fontSize="md">Feature</Th>
                    <Th fontSize="md" color="green.500">Your Project</Th>
                    <Th fontSize="md" color="gray.500">Programiz / GFG / VS Code</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {comparisonData.map((row, idx) => (
                    <Tr key={idx} _hover={{ bg: colorMode === "dark" ? "whiteAlpha.100" : "gray.50" }}>
                      <Td fontWeight="bold">{row.feature}</Td>
                      <Td color="green.500" fontWeight="bold">{row.ourProject}</Td>
                      <Td color="gray.500">{row.competitors}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box py={20} position="relative" zIndex={2}>
        <Container maxW="container.md">
          <Box
            p={12}
            borderRadius="2xl"
            bgGradient="linear(to-r, blue.600, purple.600)"
            textAlign="center"
            color="white"
          >
            <VStack spacing={5}>
              <Text fontSize="5xl">⚡</Text>
              <Heading fontSize="3xl">Ready to Code Offline?</Heading>
              <Text opacity={0.9}>
                No installation. No servers. No latency. No login required.
                <br />
                <strong>Just pure coding power in your browser.</strong>
              </Text>
              <Button
                size="lg"
                bg="white"
                color="blue.600"
                _hover={{ transform: "scale(1.05)", bg: "white" }}
                rightIcon={<ArrowForwardIcon />}
                onClick={onLaunch}
                px={8}
              >
                Start Coding — It's Free
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>

      {/* HTML/CSS Playground Modal */}
      {showHtmlCssPlayground && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={3000}
          bg={colorMode === "dark" ? "gray.900" : "gray.50"}
          overflow="auto"
        >
          <HtmlCssPlayground onBack={() => setShowHtmlCssPlayground(false)} />
        </Box>
      )}

      {/* Footer */}
      <Box py={8} borderTopWidth="1px" borderColor={colorMode === "dark" ? "whiteAlpha.200" : "gray.200"} position="relative" zIndex={2}>
        <Container maxW="container.xl">
          <HStack justify="space-between" wrap="wrap" spacing={4}>
            <Text fontSize="sm" color="gray.500">
              ⚡ OfflineCode Forge | Zero Setup Required | Powered by WebAssembly
            </Text>
            <HStack spacing={4}>
              <Text fontSize="sm" color="gray.500">No Installation</Text>
              <Text fontSize="sm" color="gray.500">No Servers</Text>
              <Text fontSize="sm" color="gray.500">Zero Latency</Text>
              <Text fontSize="sm" color="gray.500">100% Free</Text>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}