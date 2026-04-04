import { useRef, useState, useEffect } from "react";
import { Box, HStack, Button, Input, VStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const outputRef = useRef();
  const intervalRef = useRef(null);

  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [savedFiles, setSavedFiles] = useState([]);
  const [speed, setSpeed] = useState(1);
<<<<<<< Updated upstream
=======
  const [activeLine, setActiveLine] = useState(null);
  const [iframeCode, setIframeCode] = useState("");
>>>>>>> Stashed changes

  // 🔥 Load saved files
  useEffect(() => {
    const files = JSON.parse(localStorage.getItem("saved-files")) || [];
    setSavedFiles(files);
  }, []);

  // 🔥 Load code on language change
  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${language}`);
    setValue(savedCode || CODE_SNIPPETS[language]);
  }, [language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => setLanguage(lang);

  const handleChange = (val) => {
    setValue(val);
    localStorage.setItem(`code-${language}`, val);
  };

  // 💾 SAVE FILE
  const saveFile = () => {
    if (!fileName.trim()) return;

    const newFile = { name: fileName, language, code: value };
    const updated = [...savedFiles, newFile];

    localStorage.setItem("saved-files", JSON.stringify(updated));
    setSavedFiles(updated);
    setFileName("");
  };

  // 📂 LOAD FILE
  const loadFile = (file) => {
    setLanguage(file.language);
    setValue(file.code);
  };

  // ❌ DELETE FILE
  const deleteFile = (index) => {
    const updated = savedFiles.filter((_, i) => i !== index);
    localStorage.setItem("saved-files", JSON.stringify(updated));
    setSavedFiles(updated);
  };

  // 🔁 REPLAY (FIXED)
  const replayCode = () => {
    const code = editorRef.current.getValue();
    let i = 0;

    clearInterval(intervalRef.current);
    setValue("");

    intervalRef.current = setInterval(() => {
      setValue((prev) => prev + (code[i] || ""));
      i++;

      if (i >= code.length) {
        clearInterval(intervalRef.current);
      }
    }, 50 / speed);
  };

  // 📂 UPLOAD FILE
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const name = file.name.toLowerCase();

      if (name.endsWith(".py")) setLanguage("python");
      else if (name.endsWith(".js")) setLanguage("javascript");

      setValue(content);
      setFileName(file.name);
      e.target.value = null;
    };

    reader.readAsText(file);
  };

  // 🔥 EXPORT (clean)
  const exportFile = () => {
    const code = editorRef.current.getValue();

    const data = {
      language,
      code,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "code-export.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <HStack spacing={4} h="100%" align="stretch">

      {/* LEFT */}
      <Box
        flex="2"
        display="flex"
        flexDirection="column"
        border="1px solid #00ffcc"
        borderRadius="6px"
        boxShadow="0 0 10px #00ffcc"
        p={2}
      >
        <LanguageSelector language={language} onSelect={onSelect} />

        {/* 🔥 TOOLBAR */}
        <HStack
          mb={3}
          spacing={3}
          p={2}
          border="1px solid #00ffcc"
          borderRadius="8px"
          boxShadow="0 0 15px #00ffcc"
          bg="rgba(0,0,0,0.3)"
        >
          <Button size="sm" colorScheme="teal" onClick={exportFile}>
            ⬇ Export
          </Button>

          <Button size="sm" colorScheme="yellow" onClick={replayCode}>
            🔁 Replay
          </Button>

          <Button
            size="sm"
            colorScheme="orange"
            onClick={() => clearInterval(intervalRef.current)}
          >
            ⏸ Pause
          </Button>

          <Button size="sm" colorScheme="green" onClick={replayCode}>
            ▶ Resume
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setSpeed((prev) => (prev === 1 ? 2 : 1))}
          >
            ⚡ {speed}x
          </Button>

          <Button
            size="sm"
            bg="#00ffcc"
            color="black"
<<<<<<< Updated upstream
            onClick={() => outputRef.current.runCode()}
=======
            onClick={() => {
              const code = editorRef.current.getValue();

              // 🔥 SIMPLE & STRONG CONDITION
              if (language === "html") {
                setIframeCode(code);
                return;
              }

              if (code.includes("<html") || code.includes("<!DOCTYPE")) {
                setIframeCode(code);
                return;
              }

              setIframeCode(""); // clear preview
              outputRef.current?.runCode();
            }}
>>>>>>> Stashed changes
          >
            ▶ Run
          </Button>
        </HStack>

        {/* SAVE + UPLOAD */}
        <HStack mb={2}>
          <Input
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            size="sm"
          />

          <Button size="sm" colorScheme="green" onClick={saveFile}>
            Save
          </Button>

          <Button
            size="sm"
            bg="#00ffcc"
            color="black"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {fileName ? `🔄 ${fileName}` : "📂 Upload"}
          </Button>

          <input
            id="fileInput"
            type="file"
            accept=".js,.py,.txt"
            style={{ display: "none" }}
            onChange={uploadFile}
          />
        </HStack>

        {/* EDITOR */}
        <Box flex="1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={handleChange}
            options={{ minimap: { enabled: false } }}
          />
        </Box>
      </Box>

      {/* RIGHT */}
      <Box flex="1" display="flex" flexDirection="column" gap={4}>

        {/* SAVED FILES */}
        <Box
          p={3}
          border="1px solid #00ffcc"
          borderRadius="6px"
          boxShadow="0 0 10px #00ffcc"
          maxH="250px"
          overflowY="auto"
        >
          <Text mb={2} fontWeight="bold" color="#00ffcc">
            📂 Saved Files
          </Text>

          <VStack align="stretch" spacing={1}>
            {savedFiles.length === 0 && <Text>No files saved</Text>}

            {savedFiles.map((file, index) => (
              <HStack key={index} justify="space-between">
                <Text cursor="pointer" onClick={() => loadFile(file)}>
                  {file.name} ({file.language})
                </Text>

                <Button size="xs" colorScheme="red" onClick={() => deleteFile(index)}>
                  X
                </Button>
              </HStack>
            ))}
          </VStack>
        </Box>

        
        {iframeCode && (
          <>
            <Text color="yellow">PREVIEW LOADED</Text>

            <Box border="2px solid #00ffcc" borderRadius="6px" overflow="hidden">
              <iframe
                srcDoc={iframeCode}
                title="preview"
                style={{
                  width: "100%",
                  height: "300px",
                  border: "none",
                }}
              />
            </Box>
          </>
        )}

    {/* TERMINAL */}
        <Output ref={outputRef} editorRef={editorRef} language={language} />
      </Box>

    </HStack>
  );
};

export default CodeEditor;