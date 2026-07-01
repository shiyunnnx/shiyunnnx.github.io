import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)

// Aliases map onto the canonical names registered above.
const LANGUAGE_ALIASES: Record<string, string> = { ts: 'typescript', js: 'javascript', sh: 'bash' }

export const SUPPORTED_LANGUAGES = new Set(['tsx', 'typescript', 'ts', 'jsx', 'javascript', 'js', 'json', 'bash', 'sh'])

interface CodeBlockProps {
  language: string
  children: string
}

function CodeBlock({ language, children }: CodeBlockProps) {
  const resolvedLanguage = LANGUAGE_ALIASES[language] ?? language

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-800">
      <div className="px-4 py-1.5 text-xs font-mono text-gray-400 bg-gray-800/60 border-b border-gray-800">
        {language}
      </div>
      <SyntaxHighlighter
        language={resolvedLanguage}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem 1.25rem',
          background: '#1e1e1e',
          fontSize: '0.875rem',
        }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
