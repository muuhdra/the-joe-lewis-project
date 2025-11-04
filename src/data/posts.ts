// src/data/posts.ts

// --- Types ---
export type Media = {
  kind: "image"
  url: string
  caption?: string
}

export type BlogPost = {
  slug: string
  title: string
  date: string        // ISO string, e.g. "2025-09-20"
  excerpt: string
  content: string     // plain text or HTML/Markdown (selon ton rendu)
  image: string
  category: "Blog"
  author: string
  readingTime: string
  media?: Media[]     // optional gallery of images
}

// --- Seed data (can be empty to start) ---
export const blogPosts: BlogPost[] = [
  // Example seed posts (you can delete these or keep them):
  // {
  //   slug: "morning-routine",
  //   title: "The Power of a Simple Morning Routine",
  //   date: "2025-09-20",
  //   excerpt: "How small habits can transform your day.",
  //   content: `
  // Start your day with intention. A calm 15 minutes of meditation,
  // stretching, and gratitude can set the tone for everything else.
  //
  // It’s not about doing a hundred things, it’s about consistency.
  //   `,
  //   image: "/image/posts/morning-routine.jpg",
  //   category: "Blog",
  //   author: "Joe Lewis",
  //   readingTime: "3 min",
  //   media: [
  //     { kind: "image", url: "/image/posts/morning-routine-1.jpg", caption: "Morning tea ritual" },
  //     { kind: "image", url: "/image/posts/morning-routine-2.jpg" }
  //   ]
  // }
]
