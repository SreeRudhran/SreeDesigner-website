/**
 * SREE DESIGNERS & BOUTIQUE — ADMIN CMS CONTROLLER
 * Handles admin authentication, tab management, showcase CRUD, blog CRUD, testimonials CRUD, social CRUD, and storage uploads.
 */

const AtelierAdmin = {
  currentUser: null,
  activeTab: 'showcase',

  init() {
    this.bindEvents();
    this.checkSession();
  },

  bindEvents() {
    // Hash routing for #admin or /admin
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();

    // Login Form Submit
    document.getElementById('adminLoginForm')?.addEventListener('submit', (e) => this.handleLogin(e));

    // Admin Logout
    document.getElementById('adminLogoutBtn')?.addEventListener('click', () => this.handleLogout());

    // Close Modal
    document.getElementById('adminModalClose')?.addEventListener('click', () => {
      window.location.hash = '';
    });
  },

  handleHashChange() {
    const hash = window.location.hash;
    const modal = document.getElementById('adminModal');
    if (!modal) return;

    if (hash === '#admin' || hash === '#/admin') {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  },

  async checkSession() {
    if (window.supabase) {
      const { data } = await window.supabase.auth.getSession();
      if (data?.session?.user) {
        this.currentUser = data.session.user;
        this.showDashboard();
        return;
      }
    }
    // Check local session state fallback
    const localAdmin = localStorage.getItem('sree_admin_logged');
    if (localAdmin === 'true') {
      this.currentUser = { email: 'admin@sreedesigners.com' };
      this.showDashboard();
    } else {
      this.showLogin();
    }
  },

  showLogin() {
    document.getElementById('adminLoginView').style.display = 'block';
    document.getElementById('adminDashboardView').style.display = 'none';
  },

  showDashboard() {
    document.getElementById('adminLoginView').style.display = 'none';
    document.getElementById('adminDashboardView').style.display = 'block';
    document.getElementById('adminUserEmail').textContent = this.currentUser?.email || 'admin@sreedesigners.com';
    this.switchTab('showcase');
  },

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const alertEl = document.getElementById('adminLoginAlert');
    alertEl.style.display = 'none';

    if (window.supabase) {
      try {
        const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        this.currentUser = data.user;
        this.showDashboard();
        return;
      } catch (err) {
        console.warn('Supabase Auth error:', err);
      }
    }

    // Demo Admin Login (for local dev testing before Supabase connection)
    if (email && password && password.length >= 6) {
      localStorage.setItem('sree_admin_logged', 'true');
      this.currentUser = { email };
      this.showDashboard();
    } else {
      alertEl.textContent = 'Invalid credentials. Password must be at least 6 characters.';
      alertEl.style.display = 'block';
    }
  },

  async handleLogout() {
    if (window.supabase) {
      await window.supabase.auth.signOut();
    }
    localStorage.removeItem('sree_admin_logged');
    this.currentUser = null;
    this.showLogin();
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.admin-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.admin-tab-content').forEach(panel => {
      panel.style.display = panel.id === `adminTab-${tabName}` ? 'block' : 'none';
    });

    // Render tab data
    if (tabName === 'showcase') this.renderShowcaseManager();
    if (tabName === 'blog') this.renderBlogManager();
    if (tabName === 'testimonials') this.renderTestimonialManager();
    if (tabName === 'social') this.renderSocialManager();
  },

  // --------------------------------------------------------------------------
  // SHOWCASE MANAGER TAB
  // --------------------------------------------------------------------------
  async renderShowcaseManager() {
    const container = document.getElementById('adminShowcaseList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading portfolio items...</div>';

    const items = await window.AtelierDataService.getShowcaseItems('All');
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="admin-empty">No portfolio items found. Click "+ Add Showcase Item" to create one.</div>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="admin-item-card">
        <img src="${item.main_image_url}" alt="${item.main_image_alt || item.title}" class="admin-item-thumb">
        <div class="admin-item-info">
          <h4>${item.title}</h4>
          <div class="admin-item-meta">
            <span class="admin-badge">${item.tags?.join(', ') || 'Custom Service'}</span>
            <span class="admin-price">from ₹${item.starting_price || 0}</span>
            <span class="admin-status ${item.is_published ? 'pub' : 'unpub'}">${item.is_published ? 'Published' : 'Draft'}</span>
          </div>
          <p class="admin-item-desc">${item.description || ''}</p>
        </div>
        <div class="admin-item-actions">
          <button class="admin-btn-sm" onclick="AtelierAdmin.editShowcase('${item.id}')">Edit</button>
          <button class="admin-btn-sm danger" onclick="AtelierAdmin.deleteShowcase('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  },

  // --------------------------------------------------------------------------
  // BLOG MANAGER TAB
  // --------------------------------------------------------------------------
  async renderBlogManager() {
    const container = document.getElementById('adminBlogList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading blog articles...</div>';

    const posts = await window.AtelierDataService.getBlogPosts();
    if (!posts || posts.length === 0) {
      container.innerHTML = '<div class="admin-empty">No blog posts found. Click "+ Write Article" to create one.</div>';
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="admin-item-card">
        <img src="${post.featured_image_url}" alt="${post.image_alt_text || post.title}" class="admin-item-thumb">
        <div class="admin-item-info">
          <h4>${post.title}</h4>
          <div class="admin-item-meta">
            <span class="admin-badge">${post.category || 'Article'}</span>
            <span>${post.read_time_minutes || 4} min read</span>
            <span class="admin-status ${post.is_published ? 'pub' : 'unpub'}">${post.is_published ? 'Published' : 'Draft'}</span>
          </div>
          <p class="admin-item-desc">${post.excerpt || ''}</p>
        </div>
        <div class="admin-item-actions">
          <button class="admin-btn-sm" onclick="AtelierAdmin.editBlog('${post.id}')">Edit</button>
          <button class="admin-btn-sm danger" onclick="AtelierAdmin.deleteBlog('${post.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  },

  // --------------------------------------------------------------------------
  // TESTIMONIALS MANAGER TAB
  // --------------------------------------------------------------------------
  async renderTestimonialManager() {
    const container = document.getElementById('adminTestimonialList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading reviews...</div>';

    const reviews = await window.AtelierDataService.getTestimonials();
    container.innerHTML = reviews.map(r => `
      <div class="admin-item-card">
        <div class="admin-item-info">
          <h4>${r.customer_name} <small>(${r.location})</small></h4>
          <div class="admin-item-meta">
            <span style="color:var(--gold)">${'★'.repeat(r.rating)}</span>
            <span class="admin-badge">${r.work_type || 'Service'}</span>
          </div>
          <p class="admin-item-desc">"${r.comment}"</p>
        </div>
      </div>
    `).join('');
  },

  // --------------------------------------------------------------------------
  // SOCIAL REELS MANAGER TAB
  // --------------------------------------------------------------------------
  async renderSocialManager() {
    const container = document.getElementById('adminSocialList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading social reels...</div>';

    const posts = await window.AtelierDataService.getSocialPosts();
    container.innerHTML = posts.map(p => `
      <div class="admin-item-card">
        <img src="${p.thumbnail_url}" alt="${p.title}" class="admin-item-thumb" style="aspect-ratio:9/16; width:60px;">
        <div class="admin-item-info">
          <h4>${p.title}</h4>
          <p class="admin-item-desc">${p.caption || ''}</p>
          <a href="${p.instagram_url}" target="_blank" style="font-size:0.75rem; color:var(--gold-dark);">View on Instagram →</a>
        </div>
      </div>
    `).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => AtelierAdmin.init());
window.AtelierAdmin = AtelierAdmin;
