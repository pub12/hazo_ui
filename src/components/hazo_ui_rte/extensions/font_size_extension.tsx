/**
 * Font Size Extension for Tiptap
 *
 * Custom extension that adds font-size support through the TextStyle mark.
 * Uses setFontSizeNum to avoid conflicts with other font size extensions.
 */

import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

export interface FontSizeOptions {
  types: string[];
  default_size: number;
  min_size: number;
  max_size: number;
  step: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSizeCustom: {
      /**
       * Set the font size (numeric)
       */
      setFontSizeNum: (size: number) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSizeNum: () => ReturnType;
    };
  }
}

export const FontSizeExtension = Extension.create<FontSizeOptions>({
  name: "fontSizeCustom",

  addOptions() {
    return {
      types: ["textStyle"],
      default_size: 16,
      min_size: 8,
      max_size: 72,
      step: 2,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              const size = element.style.fontSize?.replace(/['"px]/g, "");
              return size ? parseInt(size, 10) : null;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSizeNum:
        (size: number) =>
        ({ chain }) => {
          const clampedSize = Math.min(
            this.options.max_size,
            Math.max(this.options.min_size, size)
          );
          return chain().setMark("textStyle", { fontSize: clampedSize }).run();
        },
      unsetFontSizeNum:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
