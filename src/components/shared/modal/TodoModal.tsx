import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaPlus,
  FaTimes,
  FaTrash,
  FaCheck,
  FaFilter,
  FaListUl,
  FaSortAmountDown,
} from "react-icons/fa";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoModal: React.FC<Props> = ({ open, onClose, todos, setTodos }) => {
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortAsc, setSortAsc] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const addTodo = () => {
    const text = draft.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
    setDraft("");
  };

  const toggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const remove = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const markAll = (completed: boolean) => {
    setTodos((prev) => prev.map((t) => ({ ...t, completed })));
  };

  const filtered = useMemo(() => {
    let list = todos.filter((t) =>
      t.text.toLowerCase().includes(query.toLowerCase())
    );
    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    list = list.sort((a, b) => {
      const A = a.text.toLowerCase();
      const B = b.text.toLowerCase();
      return sortAsc ? A.localeCompare(B) : B.localeCompare(A);
    });
    return list;
  }, [todos, query, filter, sortAsc]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Overlay with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <FaListUl className="text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                To-Do Manager
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition"
              aria-label="Close"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Controls */}
          <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full outline-none text-sm"
                aria-label="Search tasks"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaFilter />
                <span>Filter:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${
                    filter === "all"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${
                    filter === "active"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${
                    filter === "completed"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Done
                </button>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 md:justify-end">
              <button
                onClick={() => setSortAsc((s) => !s)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                title="Toggle sort"
              >
                <FaSortAmountDown />
                {sortAsc ? "A → Z" : "Z → A"}
              </button>
            </div>
          </div>

          {/* Add */}
          <div className="px-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTodo();
                }}
                placeholder="Add a new task..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Add new task"
              />
              <button
                onClick={addTodo}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium text-sm"
              >
                <FaPlus className="inline mr-2" />
                Add
              </button>
            </div>
          </div>

          {/* List */}
          <div className="px-5 py-4 max-h-[55vh] overflow-y-auto space-y-2">
            {filtered.length > 0 ? (
              filtered.map((todo) => (
                <div
                  key={todo.id}
                  className="group flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200 hover:shadow-sm transition"
                >
                  <button
                    onClick={() => toggle(todo.id)}
                    className={`mr-3 flex items-center justify-center w-6 h-6 rounded border ${
                      todo.completed
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-white border-gray-300 text-gray-500"
                    }`}
                    aria-label={`Toggle ${todo.text}`}
                    title={todo.completed ? "Mark as active" : "Mark as done"}
                  >
                    {todo.completed ? <FaCheck /> : ""}
                  </button>

                  <div
                    className={`flex-1 text-sm ${
                      todo.completed
                        ? "line-through text-gray-500 italic"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </div>

                  <button
                    onClick={() => remove(todo.id)}
                    className="opacity-70 group-hover:opacity-100 text-red-500 hover:text-red-600 p-2 rounded-lg"
                    aria-label={`Delete ${todo.text}`}
                    title="Delete task"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">
                No tasks match your filters.
              </p>
            )}
          </div>

          {/* Footer actions */}
          <div className="px-5 py-4 border-t flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              {todos.filter((t) => !t.completed).length} active •{" "}
              {todos.filter((t) => t.completed).length} done •{" "}
              {todos.length} total
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => markAll(true)}
                className="px-3 py-2 rounded-lg border text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Mark all done
              </button>
              <button
                onClick={() => markAll(false)}
                className="px-3 py-2 rounded-lg border text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Mark all active
              </button>
              <button
                onClick={clearCompleted}
                className="px-3 py-2 rounded-lg border text-sm bg-white text-red-600 border-red-300 hover:bg-red-50"
              >
                Clear completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
