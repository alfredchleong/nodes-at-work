import * as Blockly from 'blockly';

// Dark theme matching the app's color palette
const blocklyDarkTheme = Blockly.Theme.defineTheme('dotblocks-dark', {
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: '#1e1e2e',
    toolboxBackgroundColour: '#16161f',
    toolboxForegroundColour: '#e2e8f0',
    flyoutBackgroundColour: '#16161f',
    flyoutForegroundColour: '#e2e8f0',
    flyoutOpacity: 0.97,
    scrollbarColour: '#3a3a50',
    insertionMarkerColour: '#6366f1',
    insertionMarkerOpacity: 0.5,
    scrollbarOpacity: 0.5,
    cursorColour: '#6366f1',
  },
  fontStyle: {
    family: "'Inter', system-ui, sans-serif",
    weight: '400',
    size: 12,
  },
  blockStyles: {
    logic_blocks:    { colourPrimary: '#6D3AEE', colourSecondary: '#5a2fd6', colourTertiary: '#4a26b5' },
    loop_blocks:     { colourPrimary: '#6D3AEE', colourSecondary: '#5a2fd6', colourTertiary: '#4a26b5' },
    math_blocks:     { colourPrimary: '#08C168', colourSecondary: '#06a356', colourTertiary: '#048745' },
    text_blocks:     { colourPrimary: '#00B2FF', colourSecondary: '#009de0', colourTertiary: '#0087c2' },
    list_blocks:     { colourPrimary: '#FF8C00', colourSecondary: '#e07b00', colourTertiary: '#c26b00' },
    variable_blocks: { colourPrimary: '#00B2FF', colourSecondary: '#009de0', colourTertiary: '#0087c2' },
    procedure_blocks:{ colourPrimary: '#9966FF', colourSecondary: '#8056e0', colourTertiary: '#6947c2' },
  },
  categoryStyles: {
    logic_category:    { colour: '#6D3AEE' },
    loop_category:     { colour: '#6D3AEE' },
    math_category:     { colour: '#08C168' },
    text_category:     { colour: '#00B2FF' },
    list_category:     { colour: '#FF8C00' },
    variable_category: { colour: '#00B2FF' },
    procedure_category:{ colour: '#9966FF' },
  },
});

export default blocklyDarkTheme;
