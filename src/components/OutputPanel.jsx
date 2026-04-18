import React, { useState } from 'react';

export default function OutputPanel({
  code,
  feedback,
  isCompiling,
  isDeploying,
  onCompile,
  onDeploy,
  autoReviewEnabled,
  onToggleAutoReview,
}) {

  return (
    <div className="flex flex-col w-[320px] shrink-0 bg-[#16161f] border-l border-[#2e2e3e] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#2e2e3e] shrink-0">
        <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-widest">&lt;&gt;</span>
        <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">Output</span>
      </div>

      {/* Code output area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
        {code ? (
          <pre className="text-xs font-mono text-[#e2e8f0] leading-relaxed whitespace-pre-wrap break-words">
            {code}
          </pre>
        ) : (
          <p className="text-xs font-mono text-[#64748b] italic leading-relaxed">
            Drag blocks to the workspace to see output…
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 px-4 py-3 border-t border-[#2e2e3e] shrink-0">
        <button
          id="compile-btn"
          onClick={onCompile}
          disabled={isCompiling}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 cursor-pointer border-none outline-none"
          style={{
            background: isCompiling
              ? 'linear-gradient(135deg, #4a4ab0, #5a5ac0)'
              : 'linear-gradient(135deg, #6366f1, #818cf8)',
            opacity: isCompiling ? 0.7 : 1,
          }}
        >
          {isCompiling ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Compiling…
            </>
          ) : (
            <>
              Compile
            </>
          )}
        </button>

        <button
          id="deploy-btn"
          onClick={onDeploy}
          disabled={isDeploying}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 cursor-pointer border-none outline-none"
          style={{
            background: isDeploying
              ? 'linear-gradient(135deg, #1c5c3a, #226b46)'
              : 'linear-gradient(135deg, #059669, #10b981)',
            opacity: isDeploying ? 0.7 : 1,
          }}
        >
          {isDeploying ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Deploying…
            </>
          ) : (
            <>
              Deploy
            </>
          )}
        </button>
      </div>

      {/* AI Review section */}
      <div className="border-t border-[#2e2e3e] shrink-0">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">AI Review</span>
          </div>
          <button
            id="auto-review-toggle"
            onClick={onToggleAutoReview}
            className="relative w-8 h-4 rounded-full transition-colors duration-200 border-none outline-none cursor-pointer"
            style={{
              background: autoReviewEnabled ? '#6366f1' : '#2e2e3e',
            }}
          >
            <span
              className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200"
              style={{ left: autoReviewEnabled ? '17px' : '2px' }}
            />
          </button>
        </div>

        {feedback && (
          <div className="px-4 pb-3">
            <p className="text-xs font-mono text-[#94a3b8] leading-relaxed whitespace-pre-wrap">
              {feedback}
            </p>
          </div>
        )}

        {!feedback && (
          <div className="px-4 pb-3">
            <p className="text-xs font-mono text-[#64748b] italic">
              Review feedback will appear here…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
