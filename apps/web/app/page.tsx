"use client"; // Bắt buộc dòng này để chạy ở phía Client (React)

import { useEffect, useState } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu (Copy tạm từ logic BE hoặc dùng any để test nhanh)
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API từ Backend (Port 4000)
    axios.get("http://localhost:4000/notes")
      .then((response) => {
        setNotes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi gọi API:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <main style={{ padding: 50 }}>
      <h1>📒 Danh sách Ghi chú (Lấy từ MySQL)</h1>
      
      <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
        {notes.map((note) => (
          <div key={note.id} style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>Ngày tạo: {new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {notes.length === 0 && <p>Chưa có ghi chú nào.</p>}
    </main>
  );
}