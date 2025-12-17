"use client";

/**
 * Hazo UI Multi Sort Dialog Component
 * 
 * Reusable component for multi-field sorting with drag-and-drop reordering.
 * Allows users to select multiple fields for sorting, reorder them, and set ascending/descending direction.
 */

import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { ArrowUpDown, GripVertical, Trash2, Plus, Check as CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface SortField {
  value: string;
  label: string;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface HazoUiMultiSortDialogProps {
  availableFields: SortField[];
  onSortChange: (sortConfig: SortConfig[]) => void;
  initialSortFields?: SortConfig[];
  title?: string;
  description?: string;
}

interface SortableSortFieldItemProps {
  sortConfig: SortConfig;
  fieldLabel: string;
  onDirectionChange: (direction: 'asc' | 'desc') => void;
  onDelete: () => void;
}

function SortableSortFieldItem({
  sortConfig,
  fieldLabel,
  onDirectionChange,
  onDelete,
}: SortableSortFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortConfig.field });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cls_sortable_sort_field_item flex items-center gap-3 p-3 border rounded-md bg-card"
    >
      <div
        {...attributes}
        {...listeners}
        className="cls_drag_handle cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="cls_drag_icon h-4 w-4" />
      </div>
      <span className="cls_field_label flex-1 text-sm font-medium">{fieldLabel}</span>
      <div className="cls_direction_control flex items-center gap-2">
        <Label htmlFor={`switch-${sortConfig.field}`} className="cls_direction_label text-xs text-muted-foreground">
          {sortConfig.direction === 'asc' ? 'Ascending' : 'Descending'}
        </Label>
        <Switch
          id={`switch-${sortConfig.field}`}
          checked={sortConfig.direction === 'desc'}
          onCheckedChange={(checked) => onDirectionChange(checked ? 'desc' : 'asc')}
          aria-label={`Toggle sort direction for ${fieldLabel}`}
        />
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="cls_delete_btn h-8 w-8 p-0 text-destructive hover:text-destructive"
        aria-label={`Remove ${fieldLabel} from sort`}
      >
        <Trash2 className="cls_delete_icon h-4 w-4" />
      </Button>
    </div>
  );
}

export function HazoUiMultiSortDialog({
  availableFields,
  onSortChange,
  initialSortFields = [],
  title = "Sort",
  description = "Add multiple fields to sort by and reorder them. Use the switch to toggle between ascending and descending.",
}: HazoUiMultiSortDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortFields, setSortFields] = useState<SortConfig[]>(initialSortFields);
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sync local state with initialSortFields when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSortFields(initialSortFields);
    }
  }, [isOpen, initialSortFields]);

  const handleAddField = (fieldValue: string) => {
    // Check if field is already added
    if (sortFields.some(sf => sf.field === fieldValue)) {
      return;
    }

    const newField: SortConfig = {
      field: fieldValue,
      direction: 'asc',
    };
    setSortFields([...sortFields, newField]);
    setIsComboboxOpen(false);
  };

  const handleDeleteField = (fieldValue: string) => {
    setSortFields(sortFields.filter(sf => sf.field !== fieldValue));
  };

  const handleDirectionChange = (fieldValue: string, direction: 'asc' | 'desc') => {
    setSortFields(
      sortFields.map(sf =>
        sf.field === fieldValue ? { ...sf, direction } : sf
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = sortFields.findIndex(sf => sf.field === active.id);
    const newIndex = sortFields.findIndex(sf => sf.field === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setSortFields(arrayMove(sortFields, oldIndex, newIndex));
    }
  };

  const handleApply = () => {
    // Call onSortChange with the current sort configuration
    onSortChange([...sortFields]);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSortFields(initialSortFields);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setSortFields([]);
  };

  // Get available fields that haven't been added yet
  const availableFieldsToAdd = availableFields.filter(
    af => !sortFields.some(sf => sf.field === af.value)
  );

  // Get field label helper
  const getFieldLabel = (fieldValue: string): string => {
    return availableFields.find(af => af.value === fieldValue)?.label || fieldValue;
  };

  // Check if there are active sort fields
  const hasActiveSorts = initialSortFields.length > 0;

  // Format tooltip content showing active sort fields
  const tooltipContent = hasActiveSorts ? (
    <div className="cls_sort_tooltip_content space-y-1">
      <div className="cls_tooltip_title text-xs font-semibold mb-1">Active Sorts:</div>
      {initialSortFields.map((sortConfig, index) => (
        <div key={sortConfig.field} className="cls_tooltip_item text-xs">
          {index + 1}. {getFieldLabel(sortConfig.field)} ({sortConfig.direction === 'asc' ? 'Asc' : 'Desc'})
        </div>
      ))}
    </div>
  ) : (
    <div className="cls_sort_tooltip_content text-xs">No active sorts</div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="cls_sort_button"
                aria-label="Open sort dialog"
              >
                <ArrowUpDown 
                  className={cn(
                    "cls_sort_icon h-4 w-4 mr-2",
                    hasActiveSorts && "text-blue-600"
                  )} 
                />
                Sort
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="cls_sort_dialog_content max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="cls_sort_dialog_body space-y-4 py-4">
          {/* Add Field Combobox */}
          <div className="cls_add_field_section">
            <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isComboboxOpen}
                  className="cls_add_field_combobox w-full justify-between"
                >
                  <div className="cls_combobox_content flex items-center">
                    <Plus className="cls_plus_icon h-4 w-4 mr-2" />
                    <span>Add field</span>
                  </div>
                  <ChevronsUpDown className="cls_chevron_icon ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="cls_combobox_popover w-full p-0">
                <Command>
                  <CommandInput placeholder="Search fields..." className="cls_command_input" />
                  <CommandList>
                    {availableFieldsToAdd.length === 0 ? (
                      <CommandEmpty>No fields found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {availableFieldsToAdd.map((field) => (
                          <CommandItem
                            key={field.value}
                            value={field.label}
                            onSelect={() => handleAddField(field.value)}
                            className="cls_command_item"
                          >
                            <CheckIcon
                              className={cn(
                                "cls_check_icon mr-2 h-4 w-4",
                                false ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {field.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Sort Fields List */}
          {sortFields.length > 0 ? (
            <div className="cls_sort_fields_list space-y-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sortFields.map(sf => sf.field)}
                  strategy={verticalListSortingStrategy}
                >
                  {sortFields.map((sortConfig) => (
                    <SortableSortFieldItem
                      key={sortConfig.field}
                      sortConfig={sortConfig}
                      fieldLabel={getFieldLabel(sortConfig.field)}
                      onDirectionChange={(direction) =>
                        handleDirectionChange(sortConfig.field, direction)
                      }
                      onDelete={() => handleDeleteField(sortConfig.field)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          ) : (
            <div className="cls_empty_sort_fields text-center py-8 text-sm text-muted-foreground">
              No sort fields added. Click "Add field" to add sorting criteria.
            </div>
          )}
        </div>
        <DialogFooter>
          {sortFields.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="cls_clear_all_btn"
            >
              <Trash2 className="cls_clear_all_icon h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
          <Button
            onClick={handleApply}
            className="cls_apply_btn"
          >
            Apply
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="cls_cancel_btn"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

