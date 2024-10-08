"use client";

import EditorJS from "@editorjs/editorjs";
import React, { memo, useEffect, useRef } from "react";
import { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./editorTools";

import type { Dispatch, SetStateAction, RefObject } from "react";

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
        data: data,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
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
