"use client";

import EditorJS from "@editorjs/editorjs";
import React, { memo, useEffect, useRef, useState } from "react";
import { INIT_DATA, EDIT_DIV_ID } from "@/ui/components/Editor/const";
import { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./editorTools";

function Editor() {
  const [data, setData] = useState<OutputData>(INIT_DATA);
  const ref = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: EDIT_DIV_ID,
        tools: EDITOR_TOOLS,
        data: data,
        async onChange(api) {
          const data = await api.saver.save();
          setData(data);
        },
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, [data]);

  return (
    <>
      <h1>학생 피드백</h1>
      <div id={EDIT_DIV_ID} />
    </>
  );
}

export default memo(Editor);
