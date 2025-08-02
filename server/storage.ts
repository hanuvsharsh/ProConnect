import { type User, type InsertUser, type Post, type InsertPost, type PostWithAuthor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Post methods
  getAllPosts(): Promise<PostWithAuthor[]>;
  getPostsByUserId(userId: string): Promise<PostWithAuthor[]>;
  createPost(post: InsertPost): Promise<Post>;
  deletePost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
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
    console.log('Searching for Firebase UID:', firebaseUid);
    console.log('All users in storage:', Array.from(this.users.values()).map(u => ({ id: u.id, email: u.email, firebaseUid: u.firebaseUid })));
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

  // Post methods
  async getAllPosts(): Promise<PostWithAuthor[]> {
    const posts = Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
    
    const postsWithAuthors: PostWithAuthor[] = [];
    for (const post of posts) {
      const author = this.users.get(post.authorId);
      if (author) {
        postsWithAuthors.push({ ...post, author });
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
}

export const storage = new MemStorage();
