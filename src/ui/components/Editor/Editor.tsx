"use client";

import EditorJS from "@editorjs/editorjs";
import React, { memo, useEffect, useRef } from "react";
import { EDITOR_TOOLS } from "./editorTools";

import type { RefObject, Dispatch, SetStateAction } from "react";
import type { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  data: OutputData;
  onChange: Dispatch<SetStateAction<OutputData>>;
  editorBlockId: string;
  editorRef: RefObject<HTMLDivElement>;
}

function Editor({ data, onChange, editorBlockId, editorRef }: EditorProps) {
  const ref = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlockId,
        tools: EDITOR_TOOLS,
        async onChange(api, event) {
          const changedData = await api.saver.save();

          onChange(changedData);
        },
        async onReady() {
          await editor.blocks.render(data);
        },
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <h1>학생 피드백</h1>
      <div id={editorBlockId} ref={editorRef} />
    </>
  );
}

export default memo(Editor);
