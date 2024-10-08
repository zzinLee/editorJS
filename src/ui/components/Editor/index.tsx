"use client";

import { INIT_DATA, EDIT_DIV_ID } from "@/ui/components/Editor/const";
import Editor from "./Editor";
import { useCallback, useState, useRef } from "react";
import { OutputData } from "@editorjs/editorjs";

export default function EditorWrapper() {
  const [data, setData] = useState<OutputData>(INIT_DATA);
  const doc = useRef<HTMLDivElement>(null);

  const handleClickSaveButton = useCallback(() => {
    console.log(doc.current?.innerHTML);
  }, []);

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
