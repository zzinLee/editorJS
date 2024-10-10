"use client";

import { INIT_DATA, EDIT_DIV_ID } from "@/ui/components/Editor/const";
import Editor from "./Editor";

import { useCallback, useRef, useState } from "react";
import type { OutputData } from "@editorjs/editorjs";

export default function EditorWrapper() {
  const doc = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<OutputData>(INIT_DATA);

  const handleClickSaveButton = useCallback(() => {
    if (!doc.current) return;

    console.log(data);
    console.log(JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <Editor
        data={data}
        onChange={setData}
        editorBlockId={EDIT_DIV_ID}
        editorRef={doc}
      />
      <button onClick={handleClickSaveButton}>Save</button>
    </div>
  );
}
