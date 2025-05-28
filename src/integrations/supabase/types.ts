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
          date: string
          duration: number | null
          duration_minutes: number
          id: string
          patient: string
          professional_id: string
          status: string
          time: string
        }
        Insert: {
          date: string
          duration?: number | null
          duration_minutes?: number
          id?: string
          patient: string
          professional_id: string
          status?: string
          time: string
        }
        Update: {
          date?: string
          duration?: number | null
          duration_minutes?: number
          id?: string
          patient?: string
          professional_id?: string
          status?: string
          time?: string
        }
        Relationships: []
      }
      attendances: {
        Row: {
          date: string
          duration: number | null
          duration_minutes: number
          id: number
          notes: string | null
          patient_id: number | null
          procedure_id: number | null
          professional_id: number | null
          status: string
          time: string
        }
        Insert: {
          date: string
          duration?: number | null
          duration_minutes?: number
          id?: number
          notes?: string | null
          patient_id?: number | null
          procedure_id?: number | null
          professional_id?: number | null
          status: string
          time: string
        }
        Update: {
          date?: string
          duration?: number | null
          duration_minutes?: number
          id?: number
          notes?: string | null
          patient_id?: number | null
          procedure_id?: number | null
          professional_id?: number | null
          status?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendances_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "procedures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_records: {
        Row: {
          amount: number
          attendance_id: number | null
          category: string
          created_at: string | null
          date: string
          description: string
          id: number
          status: string
        }
        Insert: {
          amount: number
          attendance_id?: number | null
          category: string
          created_at?: string | null
          date: string
          description: string
          id?: number
          status: string
        }
        Update: {
          amount?: number
          attendance_id?: number | null
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_records_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "attendances"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          category: string | null
          created_at: string | null
          id: number
          item_name: string
          quantity: number
          status: string | null
          unit_value: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: number
          item_name: string
          quantity: number
          status?: string | null
          unit_value?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: number
          item_name?: string
          quantity?: number
          status?: string | null
          unit_value?: number | null
        }
        Relationships: []
      }
      logs: {
        Row: {
          action: string
          created_at: string | null
          details: string | null
          id: number
          user_id: number | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: string | null
          id?: number
          user_id?: number | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: string | null
          id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          age: number | null
          birth_date: string | null
          cpf: string | null
          email: string | null
          id: number
          insurance: string | null
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          birth_date?: string | null
          cpf?: string | null
          email?: string | null
          id?: number
          insurance?: string | null
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          birth_date?: string | null
          cpf?: string | null
          email?: string | null
          id?: number
          insurance?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          can_delete: boolean | null
          can_read: boolean | null
          can_update: boolean | null
          can_write: boolean | null
          created_at: string | null
          id: number
          module: string
          user_id: number | null
        }
        Insert: {
          can_delete?: boolean | null
          can_read?: boolean | null
          can_update?: boolean | null
          can_write?: boolean | null
          created_at?: string | null
          id?: number
          module: string
          user_id?: number | null
        }
        Update: {
          can_delete?: boolean | null
          can_read?: boolean | null
          can_update?: boolean | null
          can_write?: boolean | null
          created_at?: string | null
          id?: number
          module?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      procedures: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      professionals: {
        Row: {
          email: string | null
          id: number
          name: string
          phone: string | null
          specialty: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          specialty?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          specialty?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          title: string
          type: string
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
          type: string
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
          type?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          amount: number
          created_at: string | null
          date: string
          description: string
          id: number
          patient_id: number | null
          professional_id: number | null
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          date: string
          description: string
          id?: number
          patient_id?: number | null
          professional_id?: number | null
          status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string
          id?: number
          patient_id?: number | null
          professional_id?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string | null
          date: string
          id: number
          notes: string | null
          patient_id: number | null
          procedure_id: number | null
          professional_id: number | null
          status: string
          time: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          notes?: string | null
          patient_id?: number | null
          procedure_id?: number | null
          professional_id?: number | null
          status: string
          time: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          notes?: string | null
          patient_id?: number | null
          procedure_id?: number | null
          professional_id?: number | null
          status?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "procedures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          password_hash: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
          password_hash: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password_hash?: string
          role?: string
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
      appointment_status: "scheduled" | "confirmed" | "completed" | "cancelled"
      consent_type: "data_collection" | "health_data_processing"
      user_role: "admin" | "doctor" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
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
    },
  },
} as const
