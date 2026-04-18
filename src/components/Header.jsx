import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';

export default function Header({ onNew, onOpen, onSave }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#1a1a28] border-b border-[#2e2e3e] shrink-0 select-none">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#6366f1]/15 border border-[#6366f1]/30 flex items-center justify-center">
          <HexagonOutlinedIcon sx={{ fontSize: 16, color: '#6366f1' }} />
        </div>
        <h1 className="text-base font-semibold text-[#e2e8f0] tracking-tight leading-none">
          Block Editor
        </h1>
        <span className="text-[10px] font-mono text-[#64748b] bg-[#22222f] px-1.5 py-0.5 rounded-md border border-[#2e2e3e]">
          beta
        </span>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-1">
        <Tooltip title="New Project" arrow placement="bottom">
          <IconButton onClick={onNew} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#e2e8f0', bgcolor: '#22222f' } }}>
            <NoteAddOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Open Project" arrow placement="bottom">
          <IconButton onClick={onOpen} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#e2e8f0', bgcolor: '#22222f' } }}>
            <FolderOpenOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save Project" arrow placement="bottom">
          <IconButton onClick={onSave} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#e2e8f0', bgcolor: '#22222f' } }}>
            <SaveOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
}
