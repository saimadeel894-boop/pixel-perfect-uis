/**
 * QAScreen Component
 * Q&A section for community questions and answers
 */

import { useState } from "react";
import { MessageCircle, Search, ThumbsUp, MessageSquare, Clock, ChevronRight, Plus } from "lucide-react";

interface Question {
  id: number;
  title: string;
  author: string;
  authorInitials: string;
  category: string;
  answers: number;
  likes: number;
  timeAgo: string;
  isAnswered: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    title: "What's the best protein timing for muscle growth?",
    author: "FitMike",
    authorInitials: "FM",
    category: "Nutrition",
    answers: 12,
    likes: 45,
    timeAgo: "2h ago",
    isAnswered: true,
  },
  {
    id: 2,
    title: "How do I prevent lower back pain during deadlifts?",
    author: "NewLifter23",
    authorInitials: "NL",
    category: "Form",
    answers: 8,
    likes: 32,
    timeAgo: "4h ago",
    isAnswered: true,
  },
  {
    id: 3,
    title: "Recommended rest time between sets?",
    author: "StrengthSeeker",
    authorInitials: "SS",
    category: "Training",
    answers: 3,
    likes: 18,
    timeAgo: "6h ago",
    isAnswered: false,
  },
  {
    id: 4,
    title: "Best exercises for shoulder mobility?",
    author: "FlexibleFit",
    authorInitials: "FF",
    category: "Mobility",
    answers: 0,
    likes: 5,
    timeAgo: "8h ago",
    isAnswered: false,
  },
];

const categories = ["All", "Nutrition", "Training", "Form", "Recovery", "Mobility"];

interface QAScreenProps {
  onClose: () => void;
}

export function QAScreen({ onClose }: QAScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = questions.filter(q => 
    (selectedCategory === "All" || q.category === selectedCategory) &&
    (searchQuery === "" || q.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md z-40 px-4 pt-8 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 rounded-xl">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-brand text-primary tracking-wide">Q&A</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 space-y-4 pb-24">
        {/* Questions List */}
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No questions found</p>
          </div>
        )}
      </main>

      {/* Ask Question FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

interface QuestionCardProps {
  question: Question;
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <button className="w-full text-left p-4 rounded-xl bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        {/* Author Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary">{question.authorInitials}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
            {question.title}
          </h3>
          
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 rounded bg-muted text-foreground font-medium">
              {question.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {question.timeAgo}
            </span>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ThumbsUp className="w-3 h-3" />
              {question.likes}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3" />
              {question.answers} {question.answers === 1 ? "answer" : "answers"}
            </span>
            {question.isAnswered && (
              <span className="text-xs text-green-500 font-medium">✓ Answered</span>
            )}
          </div>
        </div>
        
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </div>
    </button>
  );
}

export default QAScreen;
