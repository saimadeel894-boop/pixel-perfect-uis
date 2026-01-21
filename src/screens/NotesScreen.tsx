/**
 * NotesScreen Component
 * Personal notes and workout logs
 */

import { useState } from "react";
import { FileText, Plus, Search, Calendar, Tag, MoreHorizontal, Trash2, Edit2 } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPinned?: boolean;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Workout Split Plan",
    content: "Push/Pull/Legs - 6 day split. Focus on progressive overload...",
    date: "Jan 18, 2024",
    tags: ["Training", "Plan"],
    isPinned: true,
  },
  {
    id: 2,
    title: "Nutrition Goals",
    content: "Daily targets: 2200 cal, 180g protein, 250g carbs, 70g fat...",
    date: "Jan 15, 2024",
    tags: ["Nutrition"],
  },
  {
    id: 3,
    title: "PR Records",
    content: "Bench: 100kg, Squat: 140kg, Deadlift: 180kg, OHP: 60kg...",
    date: "Jan 12, 2024",
    tags: ["Progress", "Strength"],
    isPinned: true,
  },
  {
    id: 4,
    title: "Mobility Routine",
    content: "Morning routine: 10 min dynamic stretching, foam rolling...",
    date: "Jan 10, 2024",
    tags: ["Mobility"],
  },
];

interface NotesScreenProps {
  onClose: () => void;
}

export function NotesScreen({ onClose }: NotesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === null || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const regularNotes = filteredNotes.filter(n => !n.isPinned);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-40 px-4 pt-8 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-xl">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-brand text-primary tracking-wide">Notes</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Tag Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedTag === null
                ? "bg-primary text-white"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 space-y-6 pb-24">
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
              📌 Pinned
            </h2>
            <div className="space-y-3">
              {pinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </section>
        )}

        {/* All Notes */}
        <section>
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            All Notes
          </h2>
          {regularNotes.length > 0 ? (
            <div className="space-y-3">
              {regularNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No notes found</p>
            </div>
          )}
        </section>
      </main>

      {/* Add Note FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

interface NoteCardProps {
  note: Note;
}

function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="p-4 rounded-xl bg-card">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-foreground flex-1">{note.title}</h3>
        <button className="p-1 hover:bg-muted rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {note.content}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {note.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] text-primary font-medium flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {note.date}
        </span>
      </div>
    </div>
  );
}

export default NotesScreen;
