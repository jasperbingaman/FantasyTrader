// FantasyTrader - Supabase Configuration & Auth Helpers
// This file handles all authentication and database operations

const SUPABASE_URL = 'https://oasyyceulftunknbpgjs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hc3l5Y2V1bGZ0dW5rbmJwZ2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MDU2MjYsImV4cCI6MjA4Mzk4MTYyNn0.aikrlue_VK3n5GnvCCOR1HbxoQZRehD9Hf2yjk4XOKA';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// AUTH FUNCTIONS
// ============================================

/**
 * Sign up a new user with email and password
 * @param {string} email
 * @param {string} password
 * @param {object} metadata - Additional user data (firstName, lastName)
 * @returns {Promise<{user, error}>}
 */
async function signUp(email, password, metadata = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: metadata.firstName || '',
                    last_name: metadata.lastName || '',
                }
            }
        });

        if (error) throw error;

        // Create user profile in profiles table
        if (data.user) {
            await createUserProfile(data.user.id, {
                email,
                firstName: metadata.firstName,
                lastName: metadata.lastName
            });
        }

        return { user: data.user, error: null };
    } catch (error) {
        console.error('Sign up error:', error);
        return { user: null, error };
    }
}

/**
 * Sign in an existing user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, session, error}>}
 */
async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        return { user: data.user, session: data.session, error: null };
    } catch (error) {
        console.error('Sign in error:', error);
        return { user: null, session: null, error };
    }
}

/**
 * Sign out the current user
 * @returns {Promise<{error}>}
 */
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Sign out error:', error);
        return { error };
    }
}

/**
 * Get the current logged-in user
 * @returns {Promise<{user, error}>}
 */
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        return { user: null, error };
    }
}

/**
 * Get current session
 * @returns {Promise<{session, error}>}
 */
async function getSession() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return { session, error: null };
    } catch (error) {
        return { session: null, error };
    }
}

/**
 * Listen for auth state changes
 * @param {function} callback - Called when auth state changes
 */
function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

/**
 * Create a user profile in the profiles table
 * @param {string} userId
 * @param {object} profileData
 */
async function createUserProfile(userId, profileData) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                email: profileData.email,
                first_name: profileData.firstName,
                last_name: profileData.lastName,
                portfolio_cash: 100000, // Starting cash
                created_at: new Date().toISOString()
            });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Create profile error:', error);
        return { data: null, error };
    }
}

/**
 * Get user profile by ID
 * @param {string} userId
 */
async function getUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { profile: data, error: null };
    } catch (error) {
        console.error('Get profile error:', error);
        return { profile: null, error };
    }
}

/**
 * Update user profile
 * @param {string} userId
 * @param {object} updates
 */
async function updateUserProfile(userId, updates) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Update profile error:', error);
        return { data: null, error };
    }
}

// ============================================
// LEARNING PROGRESS FUNCTIONS
// ============================================

/**
 * Get user's learning progress
 * @param {string} userId
 */
async function getLearningProgress(userId) {
    try {
        const { data, error } = await supabase
            .from('learning_progress')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return { progress: data, error: null };
    } catch (error) {
        console.error('Get learning progress error:', error);
        return { progress: [], error };
    }
}

/**
 * Update learning progress for a specific course/module
 * @param {string} userId
 * @param {string} courseId
 * @param {object} progressData
 */
async function updateLearningProgress(userId, courseId, progressData) {
    try {
        const { data, error } = await supabase
            .from('learning_progress')
            .upsert({
                user_id: userId,
                course_id: courseId,
                modules_completed: progressData.modulesCompleted || 0,
                total_modules: progressData.totalModules || 0,
                percent_complete: progressData.percentComplete || 0,
                last_accessed: new Date().toISOString(),
                completed: progressData.completed || false
            }, {
                onConflict: 'user_id,course_id'
            });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Update learning progress error:', error);
        return { data: null, error };
    }
}

/**
 * Mark a course module as complete
 * @param {string} userId
 * @param {string} courseId
 * @param {string} moduleId
 */
async function completeModule(userId, courseId, moduleId) {
    try {
        const { data, error } = await supabase
            .from('module_completions')
            .insert({
                user_id: userId,
                course_id: courseId,
                module_id: moduleId,
                completed_at: new Date().toISOString()
            });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Complete module error:', error);
        return { data: null, error };
    }
}

// ============================================
// MATCH/LEAGUE FUNCTIONS (for future app.html integration)
// ============================================

/**
 * Get user's current matches
 * @param {string} userId
 */
async function getUserMatches(userId) {
    try {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .or(`player1_id.eq.${userId},player2_id.eq.${userId}`)
            .order('week', { ascending: false });

        if (error) throw error;
        return { matches: data, error: null };
    } catch (error) {
        console.error('Get matches error:', error);
        return { matches: [], error };
    }
}

/**
 * Get user's league standings
 * @param {string} leagueId
 */
async function getLeagueStandings(leagueId) {
    try {
        const { data, error } = await supabase
            .from('league_standings')
            .select(`
                *,
                profiles (first_name, last_name)
            `)
            .eq('league_id', leagueId)
            .order('rank', { ascending: true });

        if (error) throw error;
        return { standings: data, error: null };
    } catch (error) {
        console.error('Get standings error:', error);
        return { standings: [], error };
    }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

/**
 * Update navigation based on auth state
 * @param {object} user - Current user or null
 */
function updateNavigation(user) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Find the CTA button in nav
    const ctaBtn = navLinks.querySelector('.btn-primary');

    if (user) {
        // User is logged in
        if (ctaBtn) {
            ctaBtn.textContent = 'Dashboard';
            ctaBtn.href = 'app.html';
            ctaBtn.onclick = null;
        }

        // Add user menu or logout option if not exists
        if (!navLinks.querySelector('.user-menu')) {
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <span class="user-name">${user.user_metadata?.first_name || user.email}</span>
                <a href="#" class="btn-logout" onclick="handleLogout(event)">Logout</a>
            `;
            navLinks.appendChild(userMenu);
        }
    } else {
        // User is logged out
        if (ctaBtn) {
            ctaBtn.textContent = 'Get Started';
            ctaBtn.href = '#';
            ctaBtn.onclick = () => openAuth('signup');
        }

        // Remove user menu if exists
        const userMenu = navLinks.querySelector('.user-menu');
        if (userMenu) userMenu.remove();
    }
}

/**
 * Handle logout click
 */
async function handleLogout(event) {
    if (event) event.preventDefault();

    const { error } = await signOut();
    if (!error) {
        window.location.href = 'index.html';
    } else {
        alert('Error signing out. Please try again.');
    }
}

/**
 * Show loading state on a button
 * @param {HTMLElement} button
 * @param {boolean} isLoading
 */
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
    } else {
        button.textContent = button.dataset.originalText || button.textContent;
        button.disabled = false;
    }
}

/**
 * Display an error message
 * @param {string} message
 * @param {HTMLElement} container - Where to show the error
 */
function showError(message, container) {
    // Remove existing errors
    const existingError = container?.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: rgba(255, 68, 68, 0.1);
        border: 1px solid rgba(255, 68, 68, 0.3);
        color: #ff6666;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
    `;
    errorDiv.textContent = message;

    if (container) {
        container.prepend(errorDiv);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
}

/**
 * Display a success message
 * @param {string} message
 * @param {HTMLElement} container
 */
function showSuccess(message, container) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid rgba(0, 255, 136, 0.3);
        color: #00ff88;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
    `;
    successDiv.textContent = message;

    if (container) {
        container.prepend(successDiv);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => successDiv.remove(), 5000);
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

/**
 * Initialize auth state on page load
 */
async function initializeAuth() {
    const { session } = await getSession();

    if (session?.user) {
        updateNavigation(session.user);
    } else {
        updateNavigation(null);
    }

    // Listen for auth changes
    onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            updateNavigation(session.user);
        } else if (event === 'SIGNED_OUT') {
            updateNavigation(null);
        }
    });
}

// Export for use in other scripts (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        supabase,
        signUp,
        signIn,
        signOut,
        getCurrentUser,
        getSession,
        onAuthStateChange,
        createUserProfile,
        getUserProfile,
        updateUserProfile,
        getLearningProgress,
        updateLearningProgress,
        completeModule,
        getUserMatches,
        getLeagueStandings,
        updateNavigation,
        handleLogout,
        setButtonLoading,
        showError,
        showSuccess,
        initializeAuth
    };
}
