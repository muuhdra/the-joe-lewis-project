// data/travelPosts.ts
export type TravelPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  image: string
  category: "Travel"
  author: string
  readingTime: string
}

export const travelPosts: TravelPost[] = [
  {
    slug: "misty-ridge",
    title: "Misty Ridge at Sunrise",
    date: "2025-09-10",
    excerpt: "A breathtaking sunrise over the mountain ridge.",
    content: `
The ridge was covered in mist, and as the sun slowly rose,
the whole valley lit up in golden hues.

A memory etched forever in my heart.
    `,
    image: "/image/posts/misty-ridge.jpg",
    category: "Travel",
    author: "Joe Lewis",
    readingTime: "5 min"
  },
  {
    slug: "kayak-emerald-waters",
    title: "Kayak Through Emerald Waters",
    date: "2025-09-05",
    excerpt: "Paddling across crystal-clear lagoons.",
    content: `
Gliding silently across emerald waters,
I felt a connection with nature deeper than words.

The sound of the paddle, the warmth of the sun—pure freedom.
    `,
    image: "/image/posts/kayak.jpg",
    category: "Travel",
    author: "Joe Lewis",
    readingTime: "4 min"
  }
]
