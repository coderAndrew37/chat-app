export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Gender = "male" | "female" | "other";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          age: number;
          gender: Gender;
          city: string | null;
          avatar_url: string | null;
          bio: string | null;
          is_online: boolean;
          last_seen: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          age: number;
          gender: Gender;
          city?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          is_online?: boolean;
          last_seen?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          age?: number;
          gender?: Gender;
          city?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          is_online?: boolean;
          last_seen?: string;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          participant_one: string;
          participant_two: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          participant_one: string;
          participant_two: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          updated_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      gender: Gender;
    };
    CompositeTypes: Record<string, never>;
  };
}

// Convenience row types
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type ConversationRow =
  Database["public"]["Tables"]["conversations"]["Row"];
export type MessageRow = Database["public"]["Tables"]["messages"]["Row"];

// Extended types with joins
export interface ConversationWithProfile extends ConversationRow {
  other_user: ProfileRow;
  last_message: MessageRow | null;
  unread_count: number;
}

export interface MessageWithSender extends MessageRow {
  sender: Pick<ProfileRow, "id" | "name" | "avatar_url">;
}