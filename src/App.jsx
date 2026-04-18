import React, { useState, useRef, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BlocklyEditor from './components/BlocklyEditor';
import OutputPanel from './components/OutputPanel';

const BACKEND_URL = 'http://127.0.0.1:5000';

export default function App() {
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [activeCategory, setActiveCategory] = useState(-1);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Auto-review state
  const [autoReviewEnabled, setAutoReviewEnabled] = useState(false);
  const reviewTimerRef = useRef(null);

  // Called every time workspace changes
  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);

    // Debounced auto-review
    if (!autoReviewEnabled) return;
    clearTimeout(reviewTimerRef.current);
    reviewTimerRef.current = setTimeout(() => {
      fetch(`${BACKEND_URL}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newCode }),
      })
        .then(res => res.ok ? res.json() : Promise.reject(`Status ${res.status}`))
        .then(data => setFeedback(data.message))
        .catch(err => setFeedback('❌ Review error: ' + err));
    }, 500);
  }, [autoReviewEnabled]);

  // Category selection — toggles: click same to close
  const handleCategoryClick = useCallback((index) => {
    if (activeCategory === index) {
      setActiveCategory(-1);
      editorRef.current?.clearCategory();
    } else {
      setActiveCategory(index);
      editorRef.current?.selectCategory(index);
    }
  }, [activeCategory]);

  // Compile handler with loading state
  const handleCompile = useCallback(() => {
    setIsCompiling(true);
    const msg = code.trim();
    fetch(`${BACKEND_URL}/compile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Status ${res.status}`))
      .then(data => setCode(data.message))
      .catch(err => setCode(prev => prev + '\n\nError: ' + err))
      .finally(() => setIsCompiling(false));
  }, [code]);

  // Deploy handler with loading state
  const handleDeploy = useCallback(() => {
    setIsDeploying(true);
    fetch(`${BACKEND_URL}/deploy`, { method: 'POST' })
      .then(res => res.ok ? res.json() : Promise.reject(`Status ${res.status}`))
      .then(data => setCode(prev => prev + '\n\n' + data.message))
      .catch(err => setCode(prev => prev + '\n\nDeploy error: ' + err))
      .finally(() => setIsDeploying(false));
  }, []);

  // Header actions
  const handleNew = useCallback(() => {
    if (window.confirm('Create new project? Unsaved changes will be lost.')) {
      editorRef.current?.clearWorkspace();
    }
  }, []);
  const handleOpen = useCallback(() => alert('Open not implemented'), []);
  const handleSave = useCallback(() => alert('Save not implemented'), []);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="flex flex-col h-screen bg-[#13131f] overflow-hidden">
        <Header onNew={handleNew} onOpen={handleOpen} onSave={handleSave} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            activeIndex={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
          <BlocklyEditor
            ref={editorRef}
            onCodeChange={handleCodeChange}
            flyoutOpen={activeCategory !== -1}
          />
          <OutputPanel
            code={code}
            feedback={feedback}
            isCompiling={isCompiling}
            isDeploying={isDeploying}
            onCompile={handleCompile}
            onDeploy={handleDeploy}
            autoReviewEnabled={autoReviewEnabled}
            onToggleAutoReview={() => setAutoReviewEnabled(prev => !prev)}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
