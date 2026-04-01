import {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { Box, Text } from "@chakra-ui/react";
import { runJavaScript, runPython } from "../api";

const Output = forwardRef(({ editorRef, language }, ref) => {
  const [terminal, setTerminal] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const terminalRef = useRef(null);

  // ✅ Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [terminal]);

  useEffect(() => {
    if (waitingForInput) {
      setTimeout(() => {
        const input = document.querySelector("input");
        input?.focus();
      }, 100);
    }
  }, [waitingForInput]);

  // ✅ Add line
  const appendLine = (line) => {
    setTerminal((prev) => [...prev, line]);
  };

  // ⚡ Streaming output (typing effect)
  const streamOutput = async (text) => {
    let buffer = "";
    appendLine(""); // placeholder

    for (let char of text) {
      buffer += char;
      setTerminal((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = buffer;
        return updated;
      });
      await new Promise((r) => setTimeout(r, 5));
    }
  };

  // 🧠 Extract prompt messages
  const extractPrompts = (code) => {
    const regex =
      language === "javascript"
        ? /prompt\(["'`](.*?)["'`]\)/g
        : /input\(["'`](.*?)["'`]\)/g;

    const matches = [];
    let match;

    while ((match = regex.exec(code)) !== null) {
      matches.push(match[1] || "Input:");
    }

    return matches;
  };

  // 🚀 RUN CODE
  useImperativeHandle(ref, () => ({
    runCode: async () => {
      if (isRunning) return;

      setTerminal([]);
      setInputs([]);
      setCurrentInput("");

      const code = editorRef.current.getValue();

      const prompts = extractPrompts(code);

      // ✅ If input needed
      if (prompts.length > 0) {
        setWaitingForInput(true);

        prompts.forEach((p) => appendLine("> " + p));

        return;
      }

      // ✅ No input → run directly
      setIsRunning(true);
      await executeCode([]);
    },

  // ▶ Execute
  const executeCode = async (userInputs) => {
    const code = editorRef.current.getValue();
    let result = "";

    try {
      if (language === "javascript") {
        result = runJavaScript(code, userInputs);
      } else {
        result = await runPython(code, userInputs);
      }

      appendLine("");
      await streamOutput(result || "> (no output)");

    } catch (err) {
      appendLine("❌ Error: " + err.message);
    }

    setIsRunning(true);
  };

  // ⌨ Handle Input
  const handleInputSubmit = async () => {
    if (!waitingForInput || isRunning) return;

    // 💻 Commands
    if (currentInput.startsWith("/")) {
      if (currentInput === "/clear") {
        setTerminal([]);
        setCurrentInput("");
        return;
      }

      if (currentInput === "/run") {
        setWaitingForInput(false);
        setIsRunning(false);
        await executeCode(inputs);
        return;
      }
    }

    appendLine("> " + currentInput);

    setInputs((prev) => [...prev, currentInput]);
    setCurrentInput("");

    
  };

  // 🧹 Clear terminal
  const clearTerminal = () => {
    if (isRunning) return;
    setTerminal([]);
  };

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      border="1px solid #00ffcc"
      borderRadius="6px"
      boxShadow="0 0 10px #00ffcc"
      p={3}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Text fontWeight="bold" color="#00ffcc">
          🖥 Terminal
        </Text>
        <Text
          fontSize="sm"
          cursor="pointer"
          color="#ff4d4f"
          onClick={clearTerminal}
        >
          Clear
        </Text>
      </Box>

      {/* TERMINAL */}
      <Box
        ref={terminalRef}
        flex="1"
        bg="black"
        color="#00ffcc"
        p={2}
        fontFamily="monospace"
        overflowY="auto"
      >
        {terminal.length === 0 && (
          <Text opacity={0.5}>{"> Ready to execute code..."}</Text>
        )}

        {terminal.map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}

        {waitingForInput && (
          <Box display="flex">
            <Text>{"> "}</Text>
            <input
              style={{
                background: "black",
                color: "#00ffcc",
                border: "none",
                outline: "none",
                flex: 1,
                fontFamily: "monospace",
              }}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInputSubmit();
                }
              }}
              autoFocus
            />
            {/* 🔥 Blinking cursor */}
            <span
              style={{
                width: "8px",
                background: "#00ffcc",
                marginLeft: "2px",
                animation: "blink 1s infinite",
              }}
            />
          </Box>
        )}
      </Box>

      {/* Cursor animation */}
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
});

export default Output;