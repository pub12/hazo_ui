"use client";

/**
 * RTE Toolbar Component
 *
 * Main toolbar container that orchestrates all formatting controls.
 */

import * as React from "react";
import { type Editor } from "@tiptap/react";
import { cn } from "../../../lib/utils";
import { TooltipProvider } from "../../ui/tooltip";
import { ToolbarButton } from "./toolbar_button";
import {
  LuUndo2,
  LuRedo2,
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuLink,
  LuRemoveFormatting,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuAlignJustify,
  LuIndentIncrease,
  LuIndentDecrease,
  LuPalette,
  LuHighlighter,
  LuPlus,
  LuVariable,
  LuPaperclip,
  LuMinus,
  LuImage,
  LuTable,
  LuList,
  LuListOrdered,
  LuListChecks,
  LuTableRowsSplit,
  LuTableColumnsSplit,
  LuTrash2,
  LuGrid3X3,
} from "react-icons/lu";
import { RxDividerHorizontal } from "react-icons/rx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import Sketch from "@uiw/react-color-sketch";
import {
  FONT_FAMILIES,
  FONT_SIZE_CONFIG,
  BLOCK_TYPES,
  type RteVariable,
  type RteAttachment,
} from "../types";
import { file_to_attachment, file_to_data_url } from "../utils";

interface ToolbarProps {
  editor: Editor | null;
  variables?: RteVariable[];
  attachments: RteAttachment[];
  on_attachments_change: (attachments: RteAttachment[]) => void;
  disabled?: boolean;
}

/**
 * Toolbar separator component
 */
const ToolbarSeparator = () => (
  <div className="cls_rte_toolbar_separator mx-1 h-6 w-px bg-border" />
);

export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  variables = [],
  attachments,
  on_attachments_change,
  disabled = false,
}) => {
  const [link_url, set_link_url] = React.useState("https://");
  const [link_popover_open, set_link_popover_open] = React.useState(false);
  const [text_color_open, set_text_color_open] = React.useState(false);
  const [highlight_color_open, set_highlight_color_open] = React.useState(false);
  const [variables_menu_open, set_variables_menu_open] = React.useState(false);
  const [table_menu_open, set_table_menu_open] = React.useState(false);
  const [text_color, set_text_color] = React.useState("#000000");
  const [highlight_color, set_highlight_color] = React.useState("#ffff00");
  const [table_rows, set_table_rows] = React.useState(3);
  const [table_cols, set_table_cols] = React.useState(3);
  const [hovered_cell, set_hovered_cell] = React.useState<{ row: number; col: number } | null>(null);

  const file_input_ref = React.useRef<HTMLInputElement>(null);
  const image_input_ref = React.useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  // Get current font size
  const get_current_font_size = (): number => {
    const attrs = editor.getAttributes("textStyle");
    return attrs.fontSize || FONT_SIZE_CONFIG.default;
  };

  // Get current font family
  const get_current_font_family = (): string => {
    const attrs = editor.getAttributes("textStyle");
    return attrs.fontFamily || FONT_FAMILIES[0].value;
  };

  // Get current block type
  const get_current_block_type = (): string => {
    if (editor.isActive("heading", { level: 1 })) return "heading-1";
    if (editor.isActive("heading", { level: 2 })) return "heading-2";
    if (editor.isActive("heading", { level: 3 })) return "heading-3";
    if (editor.isActive("bulletList")) return "bullet-list";
    if (editor.isActive("orderedList")) return "ordered-list";
    if (editor.isActive("taskList")) return "task-list";
    if (editor.isActive("codeBlock")) return "code-block";
    if (editor.isActive("blockquote")) return "blockquote";
    return "paragraph";
  };

  // Handle block type change
  const handle_block_type_change = (value: string) => {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
      case "heading-1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "heading-2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "heading-3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "bullet-list":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "ordered-list":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "task-list":
        editor.chain().focus().toggleTaskList().run();
        break;
      case "code-block":
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
    }
  };

  // Handle font family change
  const handle_font_family_change = (value: string) => {
    editor.chain().focus().setFontFamily(value).run();
  };

  // Handle font size change
  const handle_font_size_change = (delta: number) => {
    const current = get_current_font_size();
    const new_size = Math.min(
      FONT_SIZE_CONFIG.max,
      Math.max(FONT_SIZE_CONFIG.min, current + delta)
    );
    editor.chain().focus().setFontSizeNum(new_size).run();
  };

  // Handle link
  const handle_set_link = () => {
    if (link_url && link_url !== "https://") {
      editor.chain().focus().setLink({ href: link_url }).run();
      set_link_url("https://");
      set_link_popover_open(false);
    }
  };

  const handle_remove_link = () => {
    editor.chain().focus().unsetLink().run();
    set_link_popover_open(false);
  };

  // Handle text color
  const handle_text_color_change = (color: { hex: string }) => {
    set_text_color(color.hex);
    editor.chain().focus().setColor(color.hex).run();
  };

  // Handle highlight color
  const handle_highlight_color_change = (color: { hex: string }) => {
    set_highlight_color(color.hex);
    editor.chain().focus().setHighlight({ color: color.hex }).run();
  };

  // Handle image insert
  const handle_image_insert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const data_url = await file_to_data_url(file);
      editor.chain().focus().setImage({ src: data_url }).run();
    }
    if (image_input_ref.current) {
      image_input_ref.current.value = "";
    }
  };

  // Handle file attach
  const handle_file_attach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const attachment = await file_to_attachment(file);
      on_attachments_change([...attachments, attachment]);
    }
    if (file_input_ref.current) {
      file_input_ref.current.value = "";
    }
  };

  // Handle table insert with custom size
  const handle_table_insert = (rows: number, cols: number) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    set_table_menu_open(false);
    set_table_rows(3);
    set_table_cols(3);
    set_hovered_cell(null);
  };

  // Handle table row/column operations
  const handle_add_row_before = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const handle_add_row_after = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const handle_delete_row = () => {
    editor.chain().focus().deleteRow().run();
  };

  const handle_add_col_before = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const handle_add_col_after = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const handle_delete_col = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const handle_delete_table = () => {
    editor.chain().focus().deleteTable().run();
  };

  // Handle horizontal rule
  const handle_hr_insert = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  // Handle variable insert
  const handle_variable_insert = (variable_name: string) => {
    editor.chain().focus().insertVariable(variable_name).run();
    set_variables_menu_open(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          "cls_rte_toolbar",
          "flex flex-wrap items-center gap-0.5",
          "p-1.5 rounded-t-md",
          "bg-muted border-b border-border",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltip="Undo"
        >
          <LuUndo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltip="Redo"
        >
          <LuRedo2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Block Type Dropdown */}
        <Select value={get_current_block_type()} onValueChange={handle_block_type_change}>
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BLOCK_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value} className="text-xs">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ToolbarSeparator />

        {/* Font Family */}
        <Select value={get_current_font_family()} onValueChange={handle_font_family_change}>
          <SelectTrigger className="h-8 w-[120px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((font) => (
              <SelectItem
                key={font.value}
                value={font.value}
                className="text-xs"
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size */}
        <div className="flex items-center">
          <ToolbarButton
            onClick={() => handle_font_size_change(-FONT_SIZE_CONFIG.step)}
            tooltip="Decrease font size"
          >
            <LuMinus className="h-3 w-3" />
          </ToolbarButton>
          <span className="w-8 text-center text-xs tabular-nums">
            {get_current_font_size()}
          </span>
          <ToolbarButton
            onClick={() => handle_font_size_change(FONT_SIZE_CONFIG.step)}
            tooltip="Increase font size"
          >
            <LuPlus className="h-3 w-3" />
          </ToolbarButton>
        </div>

        <ToolbarSeparator />

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          is_active={editor.isActive("bold")}
          tooltip="Bold"
        >
          <LuBold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          is_active={editor.isActive("italic")}
          tooltip="Italic"
        >
          <LuItalic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          is_active={editor.isActive("underline")}
          tooltip="Underline"
        >
          <LuUnderline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          is_active={editor.isActive("strike")}
          tooltip="Strikethrough"
        >
          <LuStrikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          is_active={editor.isActive("subscript")}
          tooltip="Subscript"
        >
          <LuSubscript className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          is_active={editor.isActive("superscript")}
          tooltip="Superscript"
        >
          <LuSuperscript className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Link */}
        <Popover open={link_popover_open} onOpenChange={set_link_popover_open}>
          <PopoverTrigger asChild>
            <ToolbarButton is_active={editor.isActive("link")} tooltip="Link">
              <LuLink className="h-4 w-4" />
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
            <div className="flex flex-col gap-2">
              <Input
                value={link_url}
                onChange={(e) => set_link_url(e.target.value)}
                placeholder="https://example.com"
                className="h-8 text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handle_set_link} className="flex-1">
                  {editor.isActive("link") ? "Update" : "Add"} Link
                </Button>
                {editor.isActive("link") && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handle_remove_link}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          tooltip="Clear formatting"
        >
          <LuRemoveFormatting className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Text Color */}
        <Popover open={text_color_open} onOpenChange={set_text_color_open}>
          <PopoverTrigger asChild>
            <ToolbarButton tooltip="Text color">
              <div className="flex flex-col items-center">
                <LuPalette className="h-4 w-4" />
                <div
                  className="h-0.5 w-4 mt-0.5 rounded-full"
                  style={{ backgroundColor: text_color }}
                />
              </div>
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Sketch
              color={text_color}
              onChange={handle_text_color_change}
              presetColors={[
                "#000000", "#434343", "#666666", "#999999", "#cccccc", "#ffffff",
                "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#0000ff",
                "#9900ff", "#ff00ff", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3",
              ]}
            />
          </PopoverContent>
        </Popover>

        {/* Highlight Color */}
        <Popover open={highlight_color_open} onOpenChange={set_highlight_color_open}>
          <PopoverTrigger asChild>
            <ToolbarButton tooltip="Highlight color">
              <div className="flex flex-col items-center">
                <LuHighlighter className="h-4 w-4" />
                <div
                  className="h-0.5 w-4 mt-0.5 rounded-full"
                  style={{ backgroundColor: highlight_color }}
                />
              </div>
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Sketch
              color={highlight_color}
              onChange={handle_highlight_color_change}
              presetColors={[
                "#ffff00", "#00ff00", "#00ffff", "#ff00ff", "#ff0000", "#0000ff",
                "#fff2cc", "#d9ead3", "#cfe2f3", "#ead1dc", "#fce5cd", "#d0e0e3",
              ]}
            />
          </PopoverContent>
        </Popover>

        <ToolbarSeparator />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          is_active={editor.isActive({ textAlign: "left" })}
          tooltip="Align left"
        >
          <LuAlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          is_active={editor.isActive({ textAlign: "center" })}
          tooltip="Align center"
        >
          <LuAlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          is_active={editor.isActive({ textAlign: "right" })}
          tooltip="Align right"
        >
          <LuAlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          is_active={editor.isActive({ textAlign: "justify" })}
          tooltip="Justify"
        >
          <LuAlignJustify className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* List Types */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          is_active={editor.isActive("bulletList")}
          tooltip="Bullet list"
        >
          <LuList className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          is_active={editor.isActive("orderedList")}
          tooltip="Numbered list"
        >
          <LuListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          is_active={editor.isActive("taskList")}
          tooltip="Checklist"
        >
          <LuListChecks className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Indent/Outdent */}
        <ToolbarButton
          onClick={() => {
            if (editor.isActive("listItem")) {
              editor.chain().focus().liftListItem("listItem").run();
            } else if (editor.isActive("taskItem")) {
              editor.chain().focus().liftListItem("taskItem").run();
            }
          }}
          disabled={!editor.can().liftListItem("listItem") && !editor.can().liftListItem("taskItem")}
          tooltip="Decrease indent"
        >
          <LuIndentDecrease className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            if (editor.isActive("listItem")) {
              editor.chain().focus().sinkListItem("listItem").run();
            } else if (editor.isActive("taskItem")) {
              editor.chain().focus().sinkListItem("taskItem").run();
            }
          }}
          disabled={!editor.can().sinkListItem("listItem") && !editor.can().sinkListItem("taskItem")}
          tooltip="Increase indent"
        >
          <LuIndentIncrease className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Horizontal Rule */}
        <ToolbarButton
          onClick={handle_hr_insert}
          tooltip="Horizontal rule"
        >
          <RxDividerHorizontal className="h-4 w-4" />
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton
          onClick={() => image_input_ref.current?.click()}
          tooltip="Insert image"
        >
          <LuImage className="h-4 w-4" />
        </ToolbarButton>

        {/* Table Menu */}
        <Popover open={table_menu_open} onOpenChange={set_table_menu_open}>
          <PopoverTrigger asChild>
            <ToolbarButton
              is_active={editor.isActive("table")}
              tooltip="Table"
            >
              <LuTable className="h-4 w-4" />
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            {editor.isActive("table") ? (
              // Table editing controls when inside a table
              <div className="flex flex-col gap-2">
                <div className="text-xs font-medium mb-1">Table Operations</div>
                <div className="grid grid-cols-2 gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7"
                    onClick={handle_add_row_before}
                  >
                    <LuTableRowsSplit className="h-3 w-3 mr-1" />
                    Add row above
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7"
                    onClick={handle_add_row_after}
                  >
                    <LuTableRowsSplit className="h-3 w-3 mr-1" />
                    Add row below
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7"
                    onClick={handle_add_col_before}
                  >
                    <LuTableColumnsSplit className="h-3 w-3 mr-1" />
                    Add col left
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7"
                    onClick={handle_add_col_after}
                  >
                    <LuTableColumnsSplit className="h-3 w-3 mr-1" />
                    Add col right
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7 text-destructive hover:text-destructive"
                    onClick={handle_delete_row}
                  >
                    <LuTrash2 className="h-3 w-3 mr-1" />
                    Delete row
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7 text-destructive hover:text-destructive"
                    onClick={handle_delete_col}
                  >
                    <LuTrash2 className="h-3 w-3 mr-1" />
                    Delete col
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="justify-center text-xs h-7 mt-1"
                  onClick={handle_delete_table}
                >
                  <LuTrash2 className="h-3 w-3 mr-1" />
                  Delete table
                </Button>
              </div>
            ) : (
              // Table size picker when not in a table
              <div className="flex flex-col gap-2">
                <div className="text-xs font-medium mb-1">Insert Table</div>
                {/* Grid size picker */}
                <div className="grid gap-0.5">
                  {Array.from({ length: 6 }).map((_, row_idx) => (
                    <div key={row_idx} className="flex gap-0.5">
                      {Array.from({ length: 6 }).map((_, col_idx) => (
                        <div
                          key={col_idx}
                          className={cn(
                            "w-5 h-5 border rounded-sm cursor-pointer transition-colors",
                            hovered_cell && row_idx < hovered_cell.row && col_idx < hovered_cell.col
                              ? "bg-primary border-primary"
                              : "border-border hover:border-primary/50"
                          )}
                          onMouseEnter={() => set_hovered_cell({ row: row_idx + 1, col: col_idx + 1 })}
                          onMouseLeave={() => set_hovered_cell(null)}
                          onClick={() => handle_table_insert(row_idx + 1, col_idx + 1)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  {hovered_cell ? `${hovered_cell.col} x ${hovered_cell.row}` : "Select size"}
                </div>
                <div className="border-t pt-2 mt-1">
                  <div className="text-xs text-muted-foreground mb-2">Custom size</div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={table_cols}
                      onChange={(e) => set_table_cols(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                      className="h-7 w-14 text-xs"
                    />
                    <span className="text-xs">x</span>
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={table_rows}
                      onChange={(e) => set_table_rows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                      className="h-7 w-14 text-xs"
                    />
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handle_table_insert(table_rows, table_cols)}
                    >
                      <LuGrid3X3 className="h-3 w-3 mr-1" />
                      Insert
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <ToolbarSeparator />

        {/* Variables Menu */}
        {variables.length > 0 && (
          <Popover open={variables_menu_open} onOpenChange={set_variables_menu_open}>
            <PopoverTrigger asChild>
              <ToolbarButton tooltip="Insert variable">
                <LuVariable className="h-4 w-4" />
              </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandInput placeholder="Search variables..." className="h-8 text-xs" />
                <CommandList>
                  <CommandEmpty>No variables found.</CommandEmpty>
                  <CommandGroup>
                    {variables.map((variable) => (
                      <CommandItem
                        key={variable.name}
                        value={variable.name}
                        onSelect={() => handle_variable_insert(variable.name)}
                        className="text-xs"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{`{{${variable.name}}}`}</span>
                          {variable.description && (
                            <span className="text-muted-foreground text-[10px]">
                              {variable.description}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {/* File Attach */}
        <ToolbarButton
          onClick={() => file_input_ref.current?.click()}
          tooltip="Attach file"
        >
          <LuPaperclip className="h-4 w-4" />
        </ToolbarButton>

        {/* Hidden file inputs */}
        <input
          ref={file_input_ref}
          type="file"
          className="hidden"
          onChange={handle_file_attach}
        />
        <input
          ref={image_input_ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handle_image_insert}
        />
      </div>
    </TooltipProvider>
  );
};
