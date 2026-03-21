import { useState } from 'react';
import { marked } from 'marked';
import './App.css';

marked.use({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false,
});

function MarkdownText({ text }) {
  return (
    <div
      id="preview"
      className="markdown-text"
      dangerouslySetInnerHTML={{ __html: marked.parse(text || '') }}
    />
  );
}

const sizeStates = ['minimized', 'normal', 'maximized'];
function getNextSize(current) {
  const idx = sizeStates.indexOf(current);
  return sizeStates[(idx + 1) % sizeStates.length];
}

function App() {
  const defaultMarkdown = '# Welcome to Markdown Previewer!\n## This is a sub-heading\n- This is a list item\n- Another list item\n- Yet another list item\n[This is a link](https://www.freecodecamp.org)\n![This is an image](https://via.placeholder.com/150)\n**This text is bold**\n*This text is italic*\n`code is within`\n```\ncodeblock\n```\n> Blockquote\n\n---\n\n1. First item\n2. Second item\n3. Third item\n\n- [x] Task 1\n- [ ] Task 2\n- [ ] Task 3';

  const [markdownText, setMarkdownText] = useState(defaultMarkdown);
  const [editorSize, setEditorSize] = useState('normal');
  const [previewSize, setPreviewSize] = useState('normal');

  // Only show one window if the other is maximized
  const showEditor = previewSize !== 'maximized';
  const showPreview = editorSize !== 'maximized';

  return (
    <div className="central-container">
      {showEditor && (
        <div className={`window editor-${editorSize}`}>
          <div className="window-header">
            <span style={{ flex: 1, padding: '0.5em' }}>Editor</span>
            <button
              onClick={() => setEditorSize(getNextSize(editorSize))}
              style={{ margin: '0.5em' }}
            >
              {editorSize.charAt(0).toUpperCase() + editorSize.slice(1)}
            </button>
          </div>
          <textarea
            id="editor"
            className="window-content"
            rows={editorSize === 'maximized' ? 20 : editorSize === 'minimized' ? 2 : 6}
            value={markdownText}
            onChange={e => setMarkdownText(e.target.value)}
            disabled={editorSize === 'minimized'}
          />
        </div>
      )}

      {showPreview && (
        <div className={`window preview-${previewSize}`}>
          <div className="window-header">
            <span style={{ flex: 1, padding: '0.5em' }}>Preview</span>
            <button
              onClick={() => setPreviewSize(getNextSize(previewSize))}
              style={{ margin: '0.5em' }}
            >
              {previewSize.charAt(0).toUpperCase() + previewSize.slice(1)}
            </button>
          </div>
          <div className="window-content">
            <MarkdownText text={markdownText} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
