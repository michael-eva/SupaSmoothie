import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dphyxcixoekljkivpnaj.supabase.co'
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase