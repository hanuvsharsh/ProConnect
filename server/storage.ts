import { type User, type InsertUser, type Post, type InsertPost, type PostWithAuthor, type Like, type InsertLike, type Comment, type InsertComment, type CommentWithAuthor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  searchUsers(query: string): Promise<User[]>;
  
  // Post methods
  getAllPosts(userId?: string): Promise<PostWithAuthor[]>;
  getPostsByUserId(userId: string): Promise<PostWithAuthor[]>;
  createPost(post: InsertPost): Promise<Post>;
  deletePost(id: string): Promise<boolean>;
  
  // Like methods
  likePost(postId: string, userId: string): Promise<Like>;
  unlikePost(postId: string, userId: string): Promise<boolean>;
  getPostLikes(postId: string): Promise<Like[]>;
  isPostLikedByUser(postId: string, userId: string): Promise<boolean>;
  
  // Comment methods
  getPostComments(postId: string): Promise<CommentWithAuthor[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;
  private likes: Map<string, Like>;
  private comments: Map<string, Comment>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.likes = new Map();
    this.comments = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.firebaseUid === firebaseUid,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      title: insertUser.title || null,
      bio: insertUser.bio || null,
      location: insertUser.location || null,
      profileImage: insertUser.profileImage || null,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async searchUsers(query: string): Promise<User[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.users.values()).filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      (user.title && user.title.toLowerCase().includes(searchTerm))
    );
  }

  // Post methods
  async getAllPosts(userId?: string): Promise<PostWithAuthor[]> {
    const posts = Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
    
    const postsWithAuthors: PostWithAuthor[] = [];
    for (const post of posts) {
      const author = this.users.get(post.authorId);
      if (author) {
        const isLiked = userId ? await this.isPostLikedByUser(post.id, userId) : false;
        postsWithAuthors.push({ ...post, author, isLiked });
      }
    }
    
    return postsWithAuthors;
  }

  async getPostsByUserId(userId: string): Promise<PostWithAuthor[]> {
    const userPosts = Array.from(this.posts.values())
      .filter(post => post.authorId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    
    const author = this.users.get(userId);
    if (!author) return [];
    
    return userPosts.map(post => ({ ...post, author }));
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const post: Post = {
      ...insertPost,
      id,
      likeCount: 0,
      commentCount: 0,
      createdAt: new Date(),
    };
    this.posts.set(id, post);
    return post;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  // Like methods
  async likePost(postId: string, userId: string): Promise<Like> {
    const id = randomUUID();
    const like: Like = {
      id,
      postId,
      userId,
      createdAt: new Date(),
    };
    this.likes.set(id, like);
    
    // Update post like count
    const post = this.posts.get(postId);
    if (post) {
      post.likeCount = (post.likeCount || 0) + 1;
      this.posts.set(postId, post);
    }
    
    return like;
  }

  async unlikePost(postId: string, userId: string): Promise<boolean> {
    const like = Array.from(this.likes.values()).find(
      l => l.postId === postId && l.userId === userId
    );
    
    if (!like) return false;
    
    this.likes.delete(like.id);
    
    // Update post like count
    const post = this.posts.get(postId);
    if (post && post.likeCount && post.likeCount > 0) {
      post.likeCount = post.likeCount - 1;
      this.posts.set(postId, post);
    }
    
    return true;
  }

  async getPostLikes(postId: string): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(like => like.postId === postId);
  }

  async isPostLikedByUser(postId: string, userId: string): Promise<boolean> {
    return Array.from(this.likes.values()).some(
      like => like.postId === postId && like.userId === userId
    );
  }

  // Comment methods
  async getPostComments(postId: string): Promise<CommentWithAuthor[]> {
    const comments = Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
    
    const commentsWithAuthors: CommentWithAuthor[] = [];
    for (const comment of comments) {
      const author = this.users.get(comment.authorId);
      if (author) {
        commentsWithAuthors.push({ ...comment, author });
      }
    }
    
    return commentsWithAuthors;
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = {
      ...insertComment,
      id,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    
    // Update post comment count
    const post = this.posts.get(insertComment.postId);
    if (post) {
      post.commentCount = (post.commentCount || 0) + 1;
      this.posts.set(insertComment.postId, post);
    }
    
    return comment;
  }

  async deleteComment(id: string): Promise<boolean> {
    const comment = this.comments.get(id);
    if (!comment) return false;
    
    this.comments.delete(id);
    
    // Update post comment count
    const post = this.posts.get(comment.postId);
    if (post && post.commentCount && post.commentCount > 0) {
      post.commentCount = post.commentCount - 1;
      this.posts.set(comment.postId, post);
    }
    
    return true;
  }
}

export const storage = new MemStorage();
