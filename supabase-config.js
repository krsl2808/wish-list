// ============================================
// ☁️ SUPABASE CONNECTION
// ============================================

const SUPABASE_URL =
    "https://kpuwvtsduoyyhhzhraer.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_TVYOpjztPrJZDbpfymL34A_i5bR_cX4";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


console.log("☁️ Supabase connected!");