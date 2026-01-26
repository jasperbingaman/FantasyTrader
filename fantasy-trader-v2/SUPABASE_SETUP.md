# FantasyTrader - Supabase Database Setup Guide

This guide will help you set up the necessary database tables in your Supabase project.

## Step 1: Access the SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar

## Step 2: Run the Database Schema

Copy and paste the following SQL into the SQL Editor and click **Run**:

```sql
-- ============================================
-- FANTASYTRADER DATABASE SCHEMA
-- ============================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE
-- Stores user profile information
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    portfolio_cash DECIMAL(12, 2) DEFAULT 100000.00,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. LEARNING PROGRESS TABLE
-- Tracks user progress through courses
-- ============================================
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id TEXT NOT NULL,
    modules_completed INTEGER DEFAULT 0,
    total_modules INTEGER DEFAULT 0,
    percent_complete DECIMAL(5, 2) DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

-- Policies for learning_progress
CREATE POLICY "Users can view own progress" ON learning_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON learning_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON learning_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 3. MODULE COMPLETIONS TABLE
-- Tracks individual module completions
-- ============================================
CREATE TABLE IF NOT EXISTS module_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id TEXT NOT NULL,
    module_id TEXT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id, module_id)
);

-- Enable Row Level Security
ALTER TABLE module_completions ENABLE ROW LEVEL SECURITY;

-- Policies for module_completions
CREATE POLICY "Users can view own completions" ON module_completions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions" ON module_completions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 4. LEAGUES TABLE (for future use with app.html)
-- ============================================
CREATE TABLE IF NOT EXISTS leagues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL, -- 8-digit join code
    creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    season_length INTEGER DEFAULT 12, -- weeks
    current_week INTEGER DEFAULT 1,
    volatility_mode TEXT DEFAULT 'standard', -- standard, top2000, volatile
    status TEXT DEFAULT 'draft', -- draft, active, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;

-- Policies for leagues
CREATE POLICY "Anyone can view leagues" ON leagues
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create leagues" ON leagues
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their leagues" ON leagues
    FOR UPDATE USING (auth.uid() = creator_id);

-- ============================================
-- 5. LEAGUE MEMBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS league_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    total_return DECIMAL(8, 4) DEFAULT 0,
    rank INTEGER,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(league_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;

-- Policies for league_members
CREATE POLICY "Members can view their leagues" ON league_members
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can join leagues" ON league_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 6. MATCHES TABLE
-- Weekly head-to-head matchups
-- ============================================
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE NOT NULL,
    week INTEGER NOT NULL,
    player1_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    player2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    player1_return DECIMAL(8, 4),
    player2_return DECIMAL(8, 4),
    winner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending', -- pending, active, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies for matches
CREATE POLICY "Players can view their matches" ON matches
    FOR SELECT USING (auth.uid() = player1_id OR auth.uid() = player2_id);

-- ============================================
-- 7. PORTFOLIOS TABLE (for future use)
-- ============================================
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    cash DECIMAL(12, 2) DEFAULT 100000.00,
    total_value DECIMAL(12, 2) DEFAULT 100000.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, league_id)
);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Policies for portfolios
CREATE POLICY "Users can view own portfolios" ON portfolios
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own portfolios" ON portfolios
    FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 8. HOLDINGS TABLE (for future use)
-- ============================================
CREATE TABLE IF NOT EXISTS holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
    symbol TEXT NOT NULL,
    shares DECIMAL(12, 6) NOT NULL,
    avg_cost DECIMAL(12, 4) NOT NULL,
    position TEXT, -- QB, RB, WR, etc.
    is_starting BOOLEAN DEFAULT FALSE,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(portfolio_id, symbol)
);

-- Enable Row Level Security
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;

-- Policies for holdings (through portfolio ownership)
CREATE POLICY "Users can view own holdings" ON holdings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios
            WHERE portfolios.id = holdings.portfolio_id
            AND portfolios.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own holdings" ON holdings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM portfolios
            WHERE portfolios.id = holdings.portfolio_id
            AND portfolios.user_id = auth.uid()
        )
    );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp trigger to profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_learning_progress_user ON learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_course ON learning_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_module_completions_user ON module_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_league_members_league ON league_members(league_id);
CREATE INDEX IF NOT EXISTS idx_league_members_user ON league_members(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_league_week ON matches(league_id, week);
CREATE INDEX IF NOT EXISTS idx_holdings_portfolio ON holdings(portfolio_id);
```

## Step 3: Configure Authentication

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Under **Email Auth**, you can:
   - **Disable email confirmations** for easier testing (not recommended for production)
   - Set up custom email templates
3. Optionally enable **OAuth providers** (Google, GitHub, etc.)

## Step 4: Test the Setup

1. Go to your FantasyTrader site (index.html)
2. Click "Get Started" to open the signup modal
3. Create a test account
4. Check the **Table Editor** in Supabase to see if the profile was created

## File Structure

After setup, your project should have:

```
fantasy-trader-v2/
├── index.html          # Main landing page with auth
├── education.html      # Learning center with progress tracking
├── features.html       # Features page
├── how-it-works.html   # How it works page
├── app.html            # (To be integrated with Wyatt's code)
├── js/
│   └── supabase.js     # Supabase configuration and helpers
├── images/
│   └── logo.png
└── SUPABASE_SETUP.md   # This file
```

## Environment Variables (for production)

When deploying to production, consider using environment variables for your Supabase credentials. The current setup has them hardcoded in `js/supabase.js` for simplicity.

## Troubleshooting

### "Failed to fetch" errors
- Check that your Supabase URL and anon key are correct
- Ensure CORS is properly configured in Supabase

### Users can't sign up
- Check the **Authentication** → **Users** tab for any error logs
- Verify email confirmation settings

### Progress not saving
- Ensure the `learning_progress` table was created
- Check RLS policies are in place
- Verify the user is authenticated

## Next Steps

1. **Integrate Wyatt's app.html** - Connect the trading interface to Supabase
2. **Add real-time features** - Use Supabase's realtime subscriptions for live matchups
3. **Set up email templates** - Customize the auth emails
4. **Add social login** - Enable Google/GitHub OAuth for easier signup
