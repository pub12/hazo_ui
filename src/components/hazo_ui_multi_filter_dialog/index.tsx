"use client";

/**
 * Hazo UI Multi Filter Dialog Component
 * 
 * Reusable component for multi-field filtering with different input types.
 * Allows users to select multiple fields for filtering with appropriate input controls.
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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Filter, Trash2, Plus, Check as CheckIcon, ChevronsUpDown, Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { format } from "date-fns";

export interface FilterField {
  value: string;
  label: string;
  type: 'text' | 'number' | 'combobox' | 'boolean' | 'date';
  textConfig?: {
    minLength?: number;
    maxLength?: number;
  };
  numberConfig?: {
    min?: number;
    max?: number;
    allowDecimal?: boolean;
    decimalLength?: number;
  };
  comboboxOptions?: Array<{ label: string; value: string }>;
  booleanLabels?: {
    trueLabel?: string;
    falseLabel?: string;
  };
}

export interface FilterConfig {
  field: string;
  operator?: string; // For number fields: equals, not_equals, greater_than, less_than, greater_equal, less_equal
  value: any;
}

interface HazoUiMultiFilterDialogProps {
  availableFields: FilterField[];
  onFilterChange: (filterConfig: FilterConfig[]) => void;
  initialFilters?: FilterConfig[];
  title?: string;
  description?: string;
}

interface FilterFieldItemProps {
  filterConfig: FilterConfig;
  fieldConfig: FilterField;
  onValueChange: (value: any) => void;
  onOperatorChange?: (operator: string) => void;
  onDelete: () => void;
}

function FilterFieldItem({
  filterConfig,
  fieldConfig,
  onValueChange,
  onOperatorChange,
  onDelete,
}: FilterFieldItemProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const renderInput = () => {
    switch (fieldConfig.type) {
      case 'text':
        return (
          <Input
            type="text"
            value={filterConfig.value || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (fieldConfig.textConfig?.maxLength && value.length > fieldConfig.textConfig.maxLength) {
                return;
              }
              onValueChange(value);
            }}
            placeholder="Enter text..."
            minLength={fieldConfig.textConfig?.minLength}
            maxLength={fieldConfig.textConfig?.maxLength}
            className="cls_filter_text_input w-full min-w-0"
          />
        );

      case 'number':
        const numberOperators = [
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' },
          { value: 'greater_equal', label: 'Greater or Equal' },
          { value: 'less_equal', label: 'Less or Equal' },
        ];

        return (
          <div className="cls_number_filter_container flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
            <Select
              value={filterConfig.operator || 'equals'}
              onValueChange={(value) => onOperatorChange?.(value)}
            >
              <SelectTrigger className="cls_operator_select w-full sm:w-[140px] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {numberOperators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={filterConfig.value !== undefined && filterConfig.value !== null ? filterConfig.value : ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  onValueChange('');
                  return;
                }
                let numValue = fieldConfig.numberConfig?.allowDecimal
                  ? parseFloat(value)
                  : parseInt(value, 10);
                
                if (isNaN(numValue)) {
                  return;
                }

                // Apply decimal length restriction
                if (fieldConfig.numberConfig?.allowDecimal && fieldConfig.numberConfig?.decimalLength) {
                  const decimalPlaces = value.split('.')[1]?.length || 0;
                  if (decimalPlaces > fieldConfig.numberConfig.decimalLength) {
                    return;
                  }
                }

                // Apply min/max restrictions
                if (fieldConfig.numberConfig?.min !== undefined && numValue < fieldConfig.numberConfig.min) {
                  numValue = fieldConfig.numberConfig.min;
                }
                if (fieldConfig.numberConfig?.max !== undefined && numValue > fieldConfig.numberConfig.max) {
                  numValue = fieldConfig.numberConfig.max;
                }

                onValueChange(numValue);
              }}
              placeholder="Enter number..."
              min={fieldConfig.numberConfig?.min}
              max={fieldConfig.numberConfig?.max}
              step={fieldConfig.numberConfig?.allowDecimal ? 0.01 : 1}
              className="cls_filter_number_input flex-1 min-w-0"
            />
          </div>
        );

      case 'combobox':
        return (
          <Select
            value={filterConfig.value || ''}
            onValueChange={(value) => onValueChange(value)}
          >
            <SelectTrigger className="cls_filter_combobox_select w-full min-w-0">
              <SelectValue placeholder="Select option..." />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.comboboxOptions?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'boolean':
        const trueLabel = fieldConfig.booleanLabels?.trueLabel || 'On';
        const falseLabel = fieldConfig.booleanLabels?.falseLabel || 'Off';
        
        return (
          <Select
            value={filterConfig.value !== undefined && filterConfig.value !== null ? String(filterConfig.value) : ''}
            onValueChange={(value) => onValueChange(value === 'true')}
          >
            <SelectTrigger className="cls_filter_boolean_select w-full min-w-0">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">{trueLabel}</SelectItem>
              <SelectItem value="false">{falseLabel}</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'date':
        const dateOperators = [
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' },
          { value: 'greater_equal', label: 'Greater or Equal' },
          { value: 'less_equal', label: 'Less or Equal' },
        ];

        const selectedDate = filterConfig.value 
          ? (typeof filterConfig.value === 'string' ? new Date(filterConfig.value) : filterConfig.value)
          : undefined;

        return (
          <div className="cls_date_filter_container flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
            <Select
              value={filterConfig.operator || 'equals'}
              onValueChange={(value) => onOperatorChange?.(value)}
            >
              <SelectTrigger className="cls_operator_select w-full sm:w-[140px] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateOperators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "cls_date_picker_trigger w-full justify-start text-left font-normal min-w-0",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="cls_calendar_icon mr-2 h-4 w-4 shrink-0" />
                  <span className="cls_date_text truncate">
                    {selectedDate ? (
                      format(selectedDate, "MMM d, yyyy")
                    ) : (
                      "Pick a date"
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="cls_calendar_popover w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onValueChange(date);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cls_filter_field_item flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md bg-card">
      <span className="cls_field_label text-sm font-medium min-w-[120px] sm:min-w-[100px] truncate">{fieldConfig.label}</span>
      <div className="cls_field_input_container flex-1 min-w-0 w-full sm:w-auto">
        {renderInput()}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="cls_delete_btn h-8 w-8 p-0 text-destructive hover:text-destructive shrink-0"
        aria-label={`Remove ${fieldConfig.label} filter`}
      >
        <Trash2 className="cls_delete_icon h-4 w-4" />
      </Button>
    </div>
  );
}

export function HazoUiMultiFilterDialog({
  availableFields,
  onFilterChange,
  initialFilters = [],
  title = "Filter",
  description = "Add multiple fields to filter by. Select a field and set its filter value.",
}: HazoUiMultiFilterDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterFields, setFilterFields] = useState<FilterConfig[]>(initialFilters);
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);

  // Sync local state with initialFilters when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFilterFields(initialFilters);
    }
  }, [isOpen, initialFilters]);

  const handleAddField = (fieldValue: string) => {
    // Check if field is already added
    if (filterFields.some(ff => ff.field === fieldValue)) {
      return;
    }

    const fieldConfig = availableFields.find(af => af.value === fieldValue);
    if (!fieldConfig) {
      return;
    }

    let defaultValue: any = '';
    if (fieldConfig.type === 'boolean') {
      defaultValue = false;
    } else if (fieldConfig.type === 'number') {
      defaultValue = fieldConfig.numberConfig?.min || 0;
    } else if (fieldConfig.type === 'date') {
      defaultValue = new Date(); // Default to today
    }

    const newFilter: FilterConfig = {
      field: fieldValue,
      operator: (fieldConfig.type === 'number' || fieldConfig.type === 'date') ? 'equals' : undefined,
      value: defaultValue,
    };
    setFilterFields([...filterFields, newFilter]);
    setIsComboboxOpen(false);
  };

  const handleDeleteField = (fieldValue: string) => {
    setFilterFields(filterFields.filter(ff => ff.field !== fieldValue));
  };

  const handleValueChange = (fieldValue: string, value: any) => {
    setFilterFields(
      filterFields.map(ff =>
        ff.field === fieldValue ? { ...ff, value } : ff
      )
    );
  };

  const handleOperatorChange = (fieldValue: string, operator: string) => {
    setFilterFields(
      filterFields.map(ff =>
        ff.field === fieldValue ? { ...ff, operator } : ff
      )
    );
  };

  const handleApply = () => {
    // Call onFilterChange with the current filter configuration
    onFilterChange([...filterFields]);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFilterFields(initialFilters);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setFilterFields([]);
  };

  // Get available fields that haven't been added yet
  const availableFieldsToAdd = availableFields.filter(
    af => !filterFields.some(ff => ff.field === af.value)
  );

  // Get field config helper
  const getFieldConfig = (fieldValue: string): FilterField | undefined => {
    return availableFields.find(af => af.value === fieldValue);
  };

  // Check if there are active filters
  const hasActiveFilters = initialFilters.length > 0;

  // Format tooltip content showing active filters
  const tooltipContent = hasActiveFilters ? (
    <div className="cls_filter_tooltip_content space-y-1">
      <div className="cls_tooltip_title text-xs font-semibold mb-1">Active Filters:</div>
      {initialFilters.map((filterConfig) => {
        const fieldConfig = getFieldConfig(filterConfig.field);
        if (!fieldConfig) return null;
        
        let displayValue = String(filterConfig.value);
        if (fieldConfig.type === 'boolean') {
          displayValue = filterConfig.value
            ? (fieldConfig.booleanLabels?.trueLabel || 'On')
            : (fieldConfig.booleanLabels?.falseLabel || 'Off');
        } else if (fieldConfig.type === 'combobox') {
          const option = fieldConfig.comboboxOptions?.find(opt => opt.value === filterConfig.value);
          displayValue = option?.label || displayValue;
        } else if (fieldConfig.type === 'date') {
          const dateValue = filterConfig.value instanceof Date 
            ? filterConfig.value 
            : new Date(filterConfig.value);
          if (!isNaN(dateValue.getTime())) {
            displayValue = format(dateValue, "MMM d, yyyy");
          }
        }
        
        const operatorLabel = filterConfig.operator
          ? filterConfig.operator.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' '
          : '';
        
        return (
          <div key={filterConfig.field} className="cls_tooltip_item text-xs">
            {fieldConfig.label}: {operatorLabel}{displayValue}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="cls_filter_tooltip_content text-xs">No active filters</div>
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
                className="cls_filter_button"
                aria-label="Open filter dialog"
              >
                <Filter
                  className={cn(
                    "cls_filter_icon h-4 w-4 mr-2",
                    hasActiveFilters && "text-blue-600"
                  )}
                />
                Filter
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="cls_filter_dialog_content max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="cls_filter_dialog_body space-y-4 py-4">
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

          {/* Filter Fields List */}
          {filterFields.length > 0 ? (
            <div className="cls_filter_fields_list space-y-2">
              {filterFields.map((filterConfig) => {
                const fieldConfig = getFieldConfig(filterConfig.field);
                if (!fieldConfig) return null;

                return (
                  <FilterFieldItem
                    key={filterConfig.field}
                    filterConfig={filterConfig}
                    fieldConfig={fieldConfig}
                    onValueChange={(value) => handleValueChange(filterConfig.field, value)}
                    onOperatorChange={(operator) => handleOperatorChange(filterConfig.field, operator)}
                    onDelete={() => handleDeleteField(filterConfig.field)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="cls_empty_filter_fields text-center py-8 text-sm text-muted-foreground">
              No filter fields added. Click "Add field" to add filtering criteria.
            </div>
          )}
        </div>
        <DialogFooter>
          {filterFields.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="cls_clear_all_btn"
            >
              <X className="cls_clear_all_icon h-4 w-4 mr-2" />
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

