export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string
          id: string
          notes: string | null
          patient_id: string
          status: string
          time: string
          type: string
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          patient_id: string
          status: string
          time: string
          type: string
          updated_at?: string
          user_id: string
          value?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string
          time?: string
          type?: string
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          birth_date: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      professionals: {
        Row: {
          id: string
          user_id: string
          name: string | null
          email: string | null
          phone: string | null
          professional_type: string | null
          specialty: string | null
          city: string | null
          start_work: string | null
          end_work: string | null
          days_week_work: string | null
          blog_hours_start: string | null
          blog_hours_end: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          state: string | null
          clinic_name: string | null
          plan: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          email?: string | null
          phone?: string | null
          professional_type?: string | null
          specialty?: string | null
          city?: string | null
          start_work?: string | null
          end_work?: string | null
          days_week_work?: string | null
          blog_hours_start?: string | null
          blog_hours_end?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          state?: string | null
          clinic_name?: string | null
          plan?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          professional_type?: string | null
          specialty?: string | null
          city?: string | null
          start_work?: string | null
          end_work?: string | null
          days_week_work?: string | null
          blog_hours_start?: string | null
          blog_hours_end?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          state?: string | null
          clinic_name?: string | null
          plan?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: string
          language: string
          timezone: string
          notifications_enabled: boolean
          sound_enabled: boolean
          email_notifications: boolean
          appointment_reminders: boolean
          reminder_time: number
          working_hours_start: string
          working_hours_end: string
          working_days: string[]
          default_appointment_duration: number
          currency: string
          date_format: string
          time_format: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: string
          language?: string
          timezone?: string
          notifications_enabled?: boolean
          sound_enabled?: boolean
          email_notifications?: boolean
          appointment_reminders?: boolean
          reminder_time?: number
          working_hours_start?: string
          working_hours_end?: string
          working_days?: string[]
          default_appointment_duration?: number
          currency?: string
          date_format?: string
          time_format?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: string
          language?: string
          timezone?: string
          notifications_enabled?: boolean
          sound_enabled?: boolean
          email_notifications?: boolean
          appointment_reminders?: boolean
          reminder_time?: number
          working_hours_start?: string
          working_hours_end?: string
          working_days?: string[]
          default_appointment_duration?: number
          currency?: string
          date_format?: string
          time_format?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      session_durations: {
        Row: {
          id: string
          user_id: string
          duration_minutes: number
          created_at: string
          active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          duration_minutes: number
          created_at?: string
          active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          duration_minutes?: number
          created_at?: string
          active?: boolean
        }
        Relationships: []
      }
      plans: {
        Row: {
          id: string
          user_id: string
          name: string
          value: number
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          value: number
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hash_password: {
        Args: { password: string }
        Returns: string
      }
    }
    Enums: {
      professional_type: "medico" | "dentista" | "fisioterapeuta" | "psicologo" | "nutricionista" | "outro"
      plan_type: "basic" | "pro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
    Constants: {
      public: {
        Enums: {
          professional_type: ["medico", "dentista", "fisioterapeuta", "psicologo", "nutricionista", "outro"]
          plan_type: ["basic", "pro"]
        }
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status: ["scheduled", "confirmed", "completed", "cancelled"],
      consent_type: ["data_collection", "health_data_processing"],
      user_role: ["admin", "doctor", "staff"],
      professional_type: ["psicologo", "psiquiatra", "fisioterapeuta", "nutricionista", "fonoaudiologo", "terapeuta", "outro"],
      plan_type: ["basic", "pro"],
    },
  },
} as const
