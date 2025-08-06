import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import api from "../utils/api";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import markdownItTaskLists from "markdown-it-task-lists";

const mdParser = new MarkdownIt().use(markdownItTaskLists, { enabled: true });
const socket = io("https://test2-4dn5.onrender.com");

export default function NoteEditor() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [collaborators, setCollaborators] = useState(0);
  const [lastEditor, setLastEditor] = useState(null);

  // Setup socket + fetch note
  useEffect(() => {
    socket.connect();
    socket.emit("join_note", id);

    socket.on("note_update", ({ content: newContent, editorId }) => {
      setContent(newContent);
      if (editorId !== socket.id) {
        setLastEditor(editorId);
      }
    });

    socket.on("active_users", (count) => {
      console.log("👥 Active users:", count);
      setCollaborators(count);
    });

    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        setContent(res.data.content);
        setLastUpdated(new Date(res.data.updatedAt).toLocaleTimeString());
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };

    fetchNote();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  // Handle task checkbox clicks in preview
  useEffect(() => {
    const preview = document.querySelector(".rc-md-preview");
    const handleCheckboxClick = (e) => {
      if (e.target.type === "checkbox") {
        const label = e.target.parentElement?.textContent?.trim();
        const lines = content.split("\n");

        const checkboxLineIndex = lines.findIndex((line) =>
          line.includes(label)
        );

        if (checkboxLineIndex !== -1) {
          const line = lines[checkboxLineIndex];
          const updatedLine = line.includes("[x]")
            ? line.replace("[x]", "[ ]")
            : line.replace("[ ]", "[x]");
          lines[checkboxLineIndex] = updatedLine;
          const updatedContent = lines.join("\n");
          setContent(updatedContent);
          socket.emit("note_update", {
            noteId: id,
            content: updatedContent,
            editorId: socket.id,
          });
        }
      }
    };

    preview?.addEventListener("click", handleCheckboxClick);
    return () => {
      preview?.removeEventListener("click", handleCheckboxClick);
    };
  }, [content, id]);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      api.put(`/notes/${id}`, { content });
      setLastUpdated(new Date().toLocaleTimeString());
    }, 5000);
    return () => clearInterval(interval);
  }, [content, id]);

  const handleEditorChange = ({ text }) => {
    setContent(text);
    socket.emit("note_update", { noteId: id, content: text, editorId: socket.id });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4 flex justify-between text-sm text-gray-600">
        <span>Last saved: {lastUpdated || "Loading..."}</span>
        <span className="text-blue-500">Active users: {collaborators}</span>
      </div>
      {lastEditor && (
        <div className="text-xs text-green-500 mb-2">
          Last update by: <span className="font-mono">{lastEditor}</span>
        </div>
      )}
      <MdEditor
        value={content}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
}
