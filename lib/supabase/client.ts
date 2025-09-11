import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для TypeScript
export type Profile = {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  city?: string
  phone?: string
  rating: number
  balance: number
  user_type: "client" | "mobilographer" | "admin"
  created_at: string
  updated_at: string
}

export type Media = {
  id: string
  title: string
  description?: string
  file_url?: string
  thumbnail_url?: string
  file_type?: string
  file_size?: number
  category_id?: string
  price: number
  is_free: boolean
  author_id?: string
  likes_count: number
  comments_count: number
  downloads_count: number
  created_at: string
  updated_at: string
}

export type Job = {
  id: string
  title: string
  description?: string
  budget?: number
  deadline?: string
  job_type?: string
  client_id?: string
  assigned_to?: string
  status: "active" | "in_progress" | "completed" | "cancelled"
  is_featured: boolean
  created_at: string
  updated_at: string
}

export type Transaction = {
  id: string
  user_id?: string
  amount: number
  currency: string
  transaction_type: "payment" | "withdrawal" | "refund"
  payment_method?: string
  payment_id?: string
  order_id?: string
  status: "pending" | "completed" | "failed" | "cancelled"
  description?: string
  created_at: string
  updated_at: string
}
