"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Plus,
  Hash,
  TrendingUp,
  Users,
  MessageSquare,
  X,
  Send,
  CornerDownLeft,
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  timestamp: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  userVote: "up" | "down" | null;
}

interface Comment {
  id: string;
  body: string;
  author: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Reply[];
  userVote: "up" | "down" | null;
}

interface Reply {
  id: string;
  body: string;
  author: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
}

const samplePosts: Post[] = [
  {
    id: "1",
    title: "The Future of AI in 2025",
    body: "What are your thoughts on the rapid advancement of AI technology?",
    author: "TechUser42",
    timestamp: "2 hours ago",
    tags: ["Tech", "AI"],
    upvotes: 15,
    downvotes: 2,
    userVote: null,
    comments: [
      {
        id: "1-1",
        body: "AI is definitely changing the landscape of technology.",
        author: "AIEnthusiast",
        timestamp: "1 hour ago",
        upvotes: 5,
        downvotes: 0,
        userVote: null,
        replies: [
          {
            id: "1-1-1",
            body: "Completely agree! The possibilities are endless.",
            author: "FutureExplorer",
            timestamp: "30 mins ago",
            upvotes: 2,
            downvotes: 0,
            userVote: null,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Must-read Books of 2025",
    body: "Share your favorite books from this year so far!",
    author: "BookWorm99",
    timestamp: "5 hours ago",
    tags: ["Books"],
    upvotes: 12,
    downvotes: 1,
    userVote: null,
    comments: [],
  },
  {
    id: "3",
    title: "Best Indie Games of the Year",
    body: "What are some hidden gems in indie gaming you’ve discovered?",
    author: "GamerX",
    timestamp: "1 day ago",
    tags: ["Gaming"],
    upvotes: 8,
    downvotes: 0,
    userVote: null,
    comments: [
      {
        id: "3-1",
        body: 'I recently played "Hollow Knight" and it’s amazing!',
        author: "IndieFan",
        timestamp: "12 hours ago",
        upvotes: 3,
        downvotes: 0,
        userVote: null,
        replies: [],
      },
    ],
  },
  {
    id: "4",
    title: "The Impact of Quantum Computing",
    body: "How do you think quantum computing will change the tech industry?",
    author: "QuantumGeek",
    timestamp: "3 days ago",
    tags: ["Tech", "Science"],
    upvotes: 20,
    downvotes: 3,
    userVote: null,
    comments: [],
  },
  {
    id: "5",
    title: "Favorite Sci-Fi Movies",
    body: "What are your top sci-fi movies of all time?",
    author: "MovieBuff",
    timestamp: "2 days ago",
    tags: ["Movies", "Science"],
    upvotes: 10,
    downvotes: 1,
    userVote: null,
    comments: [],
  },
  {
    id: "6",
    title: "Healthy Eating Tips",
    body: "Share your best tips for maintaining a healthy diet.",
    author: "HealthNut",
    timestamp: "4 hours ago",
    tags: ["Food"],
    upvotes: 7,
    downvotes: 0,
    userVote: null,
    comments: [],
  },
  {
    id: "7",
    title: "Travel Destinations for 2025",
    body: "Where are you planning to travel this year?",
    author: "Wanderlust",
    timestamp: "1 week ago",
    tags: ["Travel"],
    upvotes: 18,
    downvotes: 2,
    userVote: null,
    comments: [],
  },
  {
    id: "8",
    title: "The Art of Minimalism",
    body: "How has minimalism impacted your life?",
    author: "Minimalist",
    timestamp: "3 hours ago",
    tags: ["Art", "Design"],
    upvotes: 5,
    downvotes: 1,
    userVote: null,
    comments: [],
  },
  {
    id: "9",
    title: "Sports Events to Watch",
    body: "What sporting events are you most excited about this year?",
    author: "SportsFan",
    timestamp: "2 days ago",
    tags: ["Sports"],
    upvotes: 9,
    downvotes: 0,
    userVote: null,
    comments: [],
  },
  {
    id: "10",
    title: "Music Production Tips",
    body: "Share your best tips for music production.",
    author: "MusicMaker",
    timestamp: "1 day ago",
    tags: ["Music"],
    upvotes: 6,
    downvotes: 1,
    userVote: null,
    comments: [],
  },
  {
    id: "11",
    title: "AI in Art",
    body: "How is AI being used in art creation?",
    author: "ArtTech",
    timestamp: "5 hours ago",
    tags: ["AI", "Art"],
    upvotes: 11,
    downvotes: 0,
    userVote: null,
    comments: [],
  },
  {
    id: "12",
    title: "Gaming Tournaments",
    body: "What gaming tournaments are you following?",
    author: "GamerPro",
    timestamp: "3 days ago",
    tags: ["Gaming", "Sports"],
    upvotes: 14,
    downvotes: 2,
    userVote: null,
    comments: [],
  },
];

const allTags = [
  "Tech",
  "Books",
  "AI",
  "Design",
  "Gaming",
  "Science",
  "Music",
  "Movies",
  "Sports",
  "Travel",
  "Food",
  "Art",
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    tags: [] as string[],
  });
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  const filteredPosts =
    selectedTags.length > 0
      ? posts.filter((post) =>
          post.tags.some((tag) => selectedTags.includes(tag))
        )
      : posts;

  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as { [key: string]: number });

  const handleVote = (
    type: "post" | "comment" | "reply",
    id: string,
    commentId?: string,
    replyId?: string,
    isUpvote: boolean = true
  ) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (type === "post" && post.id === id) {
          const currentVote = post.userVote;
          let upvotes = post.upvotes;
          let downvotes = post.downvotes;
          let newVote: "up" | "down" | null = null;

          if (isUpvote) {
            if (currentVote === "up") {
              upvotes--;
              newVote = null;
            } else {
              upvotes++;
              if (currentVote === "down") downvotes--;
              newVote = "up";
            }
          } else {
            if (currentVote === "down") {
              downvotes--;
              newVote = null;
            } else {
              downvotes++;
              if (currentVote === "up") upvotes--;
              newVote = "down";
            }
          }
          return { ...post, upvotes, downvotes, userVote: newVote };
        } else if (
          type === "comment" &&
          commentId &&
          post.comments.some((c) => c.id === commentId)
        ) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                const currentVote = comment.userVote;
                let upvotes = comment.upvotes;
                let downvotes = comment.downvotes;
                let newVote: "up" | "down" | null = null;

                if (isUpvote) {
                  if (currentVote === "up") {
                    upvotes--;
                    newVote = null;
                  } else {
                    upvotes++;
                    if (currentVote === "down") downvotes--;
                    newVote = "up";
                  }
                } else {
                  if (currentVote === "down") {
                    downvotes--;
                    newVote = null;
                  } else {
                    downvotes++;
                    if (currentVote === "up") upvotes--;
                    newVote = "down";
                  }
                }
                return { ...comment, upvotes, downvotes, userVote: newVote };
              }
              return comment;
            }),
          };
        } else if (type === "reply" && commentId && replyId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                      const currentVote = reply.userVote;
                      let upvotes = reply.upvotes;
                      let downvotes = reply.downvotes;
                      let newVote: "up" | "down" | null = null;

                      if (isUpvote) {
                        if (currentVote === "up") {
                          upvotes--;
                          newVote = null;
                        } else {
                          upvotes++;
                          if (currentVote === "down") downvotes--;
                          newVote = "up";
                        }
                      } else {
                        if (currentVote === "down") {
                          downvotes--;
                          newVote = null;
                        } else {
                          downvotes++;
                          if (currentVote === "up") upvotes--;
                          newVote = "down";
                        }
                      }
                      return {
                        ...reply,
                        upvotes,
                        downvotes,
                        userVote: newVote,
                      };
                    }
                    return reply;
                  }),
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });
    });
  };

  const handleNewPost = () => {
    if (newPost.title && newPost.body) {
      const post: Post = {
        id: `post-${Date.now()}`,
        ...newPost,
        author: `User${Math.floor(Math.random() * 1000)}`,
        timestamp: "Just now",
        upvotes: 0,
        downvotes: 0,
        userVote: null,
        comments: [],
      };
      setPosts((prev) => [post, ...prev]);
      setNewPost({ title: "", body: "", tags: [] });
      setIsNewPostModalOpen(false);
      addToast("Post added successfully");
    }
  };

  // Add new comment (unchanged)
  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              {
                id: `comment-${Date.now()}`,
                body: newComment,
                author: `User${Math.floor(Math.random() * 1000)}`,
                timestamp: "Just now",
                upvotes: 0,
                downvotes: 0,
                userVote: null,
                replies: [],
              },
              ...post.comments,
            ],
          };
        }
        return post;
      });
    });
    setNewComment("");
    addToast("Comment added");
  };

  const handleAddReply = (postId: string, commentId: string) => {
    if (!newReply.trim()) return;

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [
                    {
                      id: `reply-${Date.now()}`,
                      body: newReply,
                      author: `User${Math.floor(Math.random() * 1000)}`,
                      timestamp: "Just now",
                      upvotes: 0,
                      downvotes: 0,
                      userVote: null,
                    },
                    ...comment.replies,
                  ],
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });
    });
    setNewReply("");
    addToast("Reply added");
  };

  const addToast = (message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#FBFAF8] text-[#111D4A]`}
    >
      <header className="fixed top-0 left-0 right-0 bg-[#111D4A] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <MessageSquare className="h-8 w-8 text-[#FBFAF8]" />
            <h1 className="text-2xl font-bold text-[#FBFAF8]">NicheForum</h1>
          </div>
          <div className="flex items-center space-x-4 animate-fade-in">
            <Users className="h-5 w-5 text-[#FBFAF8]" />
            <span className="text-sm text-[#FBFAF8]/70">2.5k online</span>
          </div>
        </div>
      </header>

      <div className="fixed top-16 left-0 right-0 bg-[#111D4A] border-b border-[#E87EA1]/20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#E87EA1] scrollbar-track-[#111D4A]">
          {allTags.map((tag, index) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer
                transition-all duration-200 ease-in-out animate-fade-in
                ${
                  selectedTags.includes(tag)
                    ? "bg-[#E87EA1] text-white"
                    : "bg-[#E87EA1]/60 text-white hover:bg-[#E87EA1]/90"
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Hash className="h-3 w-3 mr-1" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-white border rounded-xl shadow-md hover:shadow-lg hover:border-[#E87EA1] transition-all duration-200 p-6 animate-fade-in border-t-4 border-[#E87EA1]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#111D4A] hover:text-[#E87EA1] transition-colors duration-200 cursor-pointer">
                      {post.title}
                    </h2>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-[#111D4A]/70">
                        {post.author}
                      </span>
                      <span className="text-sm text-[#111D4A]/40">•</span>
                      <span className="text-sm text-[#111D4A]/70">
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs bg-[#E87EA1]/20 text-[#111D4A] hover:bg-[#E87EA1]/30 transition-colors duration-200 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-[#111D4A]/90">{post.body}</p>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() =>
                      handleVote("post", post.id, undefined, undefined, true)
                    }
                    className={`flex items-center space-x-1 transition-colors duration-200 cursor-pointer ${
                      post.userVote === "up"
                        ? "text-green-500"
                        : "text-[#111D4A]/50 hover:text-green-500"
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.upvotes}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleVote("post", post.id, undefined, undefined, false)
                    }
                    className={`flex items-center space-x-1 transition-colors duration-200 cursor-pointer ${
                      post.userVote === "down"
                        ? "text-red-500"
                        : "text-[#111D4A]/50 hover:text-red-500"
                    }`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{post.downvotes}</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveCommentId(
                        activeCommentId === post.id ? null : post.id
                      )
                    }
                    className="flex items-center space-x-1 text-[#111D4A]/50 hover:text-[#E87EA1] transition-colors duration-200 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                {activeCommentId === post.id && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-white border border-[#111D4A]/20 rounded-lg px-4 py-2 text-[#111D4A] placeholder-[#111D4A]/50 focus:outline-none focus:border-[#E87EA1] transition-all duration-200"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-4 py-2 bg-[#111D4A] text-white rounded-lg hover:bg-[#111D4A]/90 transition-all duration-200 hover:scale-105 cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>

                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="pl-4 border-l-2 border-[#E87EA1]/20 animate-fade-in"
                      >
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#111D4A]">
                              {comment.author}
                            </span>
                            <span className="text-xs text-[#111D4A]/50">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="mt-2 text-[#111D4A]/90">
                            {comment.body}
                          </p>
                          <div className="mt-2 flex items-center space-x-4">
                            <button
                              onClick={() =>
                                handleVote(
                                  "comment",
                                  post.id,
                                  comment.id,
                                  undefined,
                                  true
                                )
                              }
                              className={`flex items-center space-x-1 text-sm cursor-pointer ${
                                comment.userVote === "up"
                                  ? "text-green-500"
                                  : "text-[#111D4A]/50 hover:text-green-500"
                              }`}
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>{comment.upvotes}</span>
                            </button>
                            <button
                              onClick={() =>
                                handleVote(
                                  "comment",
                                  post.id,
                                  comment.id,
                                  undefined,
                                  false
                                )
                              }
                              className={`flex items-center space-x-1 text-sm cursor-pointer ${
                                comment.userVote === "down"
                                  ? "text-red-500"
                                  : "text-[#111D4A]/50 hover:text-red-500"
                              }`}
                            >
                              <ThumbsDown className="h-3 w-3" />
                              <span>{comment.downvotes}</span>
                            </button>
                            <button
                              onClick={() =>
                                setActiveCommentId(
                                  activeCommentId === comment.id
                                    ? null
                                    : comment.id
                                )
                              }
                              className="text-[#E87EA1] hover:text-[#111D4A] transition-colors duration-200 cursor-pointer"
                            >
                              <CornerDownLeft className="h-4 w-4" />
                            </button>
                          </div>

                          {activeCommentId === comment.id && (
                            <div className="mt-4 flex space-x-2 animate-fade-in">
                              <input
                                type="text"
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 bg-white border border-[#111D4A]/20 rounded-lg px-3 py-1 text-sm text-[#111D4A] placeholder-[#111D4A]/50 focus:outline-none focus:border-[#E87EA1] transition-all duration-200"
                              />
                              <button
                                onClick={() =>
                                  handleAddReply(post.id, comment.id)
                                }
                                className="px-3 py-1 bg-[#111D4A] text-white rounded-lg text-sm hover:bg-[#111D4A]/90 transition-all duration-200 hover:scale-105 cursor-pointer"
                              >
                                Reply
                              </button>
                            </div>
                          )}

                          {comment.replies.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="pl-4 border-l border-[#E87EA1]/20 animate-fade-in"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#111D4A]">
                                      {reply.author}
                                    </span>
                                    <span className="text-xs text-[#111D4A]/50">
                                      {reply.timestamp}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-[#111D4A]/90">
                                    {reply.body}
                                  </p>
                                  <div className="mt-2 flex items-center space-x-3">
                                    <button
                                      onClick={() =>
                                        handleVote(
                                          "reply",
                                          post.id,
                                          comment.id,
                                          reply.id,
                                          true
                                        )
                                      }
                                      className={`flex items-center space-x-1 text-xs cursor-pointer ${
                                        reply.userVote === "up"
                                          ? "text-green-500"
                                          : "text-[#111D4A]/50 hover:text-green-500"
                                      }`}
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                      <span>{reply.upvotes}</span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleVote(
                                          "reply",
                                          post.id,
                                          comment.id,
                                          reply.id,
                                          false
                                        )
                                      }
                                      className={`flex items-center space-x-1 text-xs cursor-pointer ${
                                        reply.userVote === "down"
                                          ? "text-red-500"
                                          : "text-[#111D4A]/50 hover:text-red-500"
                                      }`}
                                    >
                                      <ThumbsDown className="h-3 w-3" />
                                      <span>{reply.downvotes}</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="bg-[#111D4A] border border-[#E87EA1]/20 rounded-xl shadow-lg p-6 animate-fade-in">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-[#FBFAF8]" />
                <h2 className="text-lg font-semibold text-[#FBFAF8]">
                  Trending Tags
                </h2>
              </div>
              <div className="space-y-4">
                {allTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center justify-between animate-fade-in"
                  >
                    <div className="flex items-center space-x-1">
                      <Hash className="h-3 w-3 text-[#E87EA1]" />
                      <span className="text-[#FBFAF8] hover:text-[#E87EA1] transition-colors duration-200 cursor-pointer">
                        {tag}
                      </span>
                    </div>
                    <span className="text-sm text-[#FBFAF8]/50">
                      {tagCounts[tag] || 0} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsNewPostModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#111D4A] text-white rounded-full p-4 shadow-lg hover:bg-[#111D4A]/90 transition-all duration-200 hover:scale-105 animate-bounce cursor-pointer"
      >
        <Plus className="h-6 w-6" />
      </button>

      {isNewPostModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white border border-[#111D4A]/20 rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#111D4A]">
                Create New Post
              </h2>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-[#111D4A]/50 hover:text-[#111D4A] transition-colors duration-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 bg-white border border-[#111D4A]/20 rounded-lg mb-4 text-[#111D4A] placeholder-[#111D4A]/50 focus:outline-none focus:border-[#E87EA1] transition-all duration-200"
            />

            <textarea
              placeholder="What's on your mind?"
              value={newPost.body}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, body: e.target.value }))
              }
              className="w-full px-4 py-2 bg-white border border-[#111D4A]/20 rounded-lg mb-4 h-32 resize-none text-[#111D4A] placeholder-[#111D4A]/50 focus:outline-none focus:border-[#E87EA1] transition-all duration-200"
            />

            <div className="mb-4">
              <label className="block text-sm text-[#111D4A]/70 mb-2">
                Select Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setNewPost((prev) => ({
                        ...prev,
                        tags: prev.tags.includes(tag)
                          ? prev.tags.filter((t) => t !== tag)
                          : [...prev.tags, tag],
                      }))
                    }
                    className={`
                      px-3 py-1 rounded-full text-sm transition-all duration-200 animate-fade-in cursor-pointer
                      ${
                        newPost.tags.includes(tag)
                          ? "bg-[#E87EA1] text-white"
                          : "bg-[#E87EA1]/20 text-[#111D4A] hover:bg-[#E87EA1]/30"
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="px-4 py-2 rounded-lg text-[#111D4A] hover:bg-[#E87EA1]/20 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleNewPost}
                disabled={
                  !newPost.title || !newPost.body || newPost.tags.length === 0
                }
                className="px-4 py-2 rounded-lg bg-[#111D4A] text-white hover:bg-[#111D4A]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-[#E87EA1] text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in"
          >
            {toast.message}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thumb-[#E87EA1]::-webkit-scrollbar-thumb {
          background-color: #e87ea1;
          border-radius: 4px;
        }
        .scrollbar-track-[#111D4A]::-webkit-scrollbar-track {
          background-color: #111d4a;
        }
      `}</style>
    </div>
  );
}
