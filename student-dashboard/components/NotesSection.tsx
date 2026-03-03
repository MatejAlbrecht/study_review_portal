'use client'

import { useState, useEffect, useRef } from 'react'
import { Note } from '@prisma/client'
import { createNote, updateNote, deleteNote } from '@/actions/notes'
import { Plus, Trash2, Save } from 'lucide-react'

interface NotesSectionProps {
  initialNotes: Note[]
}

export default function NotesSection({ initialNotes }: NotesSectionProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [currentNote, setCurrentNote] = useState<Note | null>(notes[0] || null)
  const [title, setTitle] = useState(currentNote?.title || '')
  const [content, setContent] = useState(currentNote?.content || '')
  const [isSaving, setIsSaving] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title)
      setContent(currentNote.content)
    }
  }, [currentNote])

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    if (currentNote && (title !== currentNote.title || content !== currentNote.content)) {
      saveTimeoutRef.current = setTimeout(async () => {
        if (title && content) {
          setIsSaving(true)
          const result = await updateNote(currentNote.id, title, content)
          if (result.success && result.data) {
            setNotes(notes.map(n => n.id === currentNote.id ? result.data : n))
            setCurrentNote(result.data)
          }
          setIsSaving(false)
        }
      }, 1000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [title, content, currentNote])

  const handleCreateNote = async () => {
    const result = await createNote('New Note', '')
    if (result.success && result.data) {
      setNotes([result.data, ...notes])
      setCurrentNote(result.data)
    }
  }

  const handleDeleteNote = async (id: string) => {
    const result = await deleteNote(id)
    if (result.success) {
      const updatedNotes = notes.filter(n => n.id !== id)
      setNotes(updatedNotes)
      if (currentNote?.id === id) {
        setCurrentNote(updatedNotes[0] || null)
      }
    }
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Quick Notes</h2>
        <button
          onClick={handleCreateNote}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {notes.map((note) => (
          <button
            key={note.id}
            onClick={() => setCurrentNote(note)}
            className={'px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ' + 
              (currentNote?.id === note.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80')}
          >
            {note.title}
          </button>
        ))}
      </div>

      {currentNote ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md bg-background"
              placeholder="Note title"
            />
            <button
              onClick={() => handleDeleteNote(currentNote.id)}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background min-h-[200px] font-mono text-sm"
            placeholder="Start typing... (supports markdown)"
          />

          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Save className="h-4 w-4 animate-pulse" />
              Saving...
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No notes yet. Create one to get started!</p>
        </div>
      )}
    </div>
  )
}
