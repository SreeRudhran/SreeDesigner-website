/**
 * SREE DESIGNERS & BOUTIQUE — ADMIN CMS CONTROLLER
 * Handles admin authentication, tab management, showcase CRUD, blog CRUD, testimonials CRUD, social CRUD, and storage uploads.
 */

const AtelierAdmin = {
  currentUser: null,
  activeTab: 'showcase',

  init() {
    this.bindEvents();
    this.handleHashChange();
  },

  bindEvents() {
    // Hash routing for #admin, #/admin, or /admin
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('popstate', () => this.handleHashChange());

    // Login Form Submit
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
      loginForm.onsubmit = (e) => this.handleLogin(e);
    }

    // Admin Logout
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
      logoutBtn.onclick = () => this.handleLogout();
    }

    // Close Modal
    const closeBtn = document.getElementById('adminModalClose');
    if (closeBtn) {
      closeBtn.onclick = () => {
        window.location.hash = '';
        const modal = document.getElementById('adminModal');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
      };
    }
  },

  handleHashChange() {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const modal = document.getElementById('adminModal');

    if (modal) {
      if (hash.includes('admin') || path.includes('admin')) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.checkSession();
      } else {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    } else {
      // Direct load on standalone admin.html page
      this.checkSession();
    }
  },

  async checkSession() {
    if (window.supabase) {
      try {
        const { data } = await window.supabase.auth.getSession();
        if (data?.session?.user) {
          this.currentUser = data.session.user;
          this.showDashboard();
          return;
        }
      } catch (err) {
        console.warn('Supabase session check:', err);
      }
    }
    // Check local session state fallback
    const localAdmin = localStorage.getItem('sree_admin_logged');
    if (localAdmin === 'true') {
      this.currentUser = { email: localStorage.getItem('sree_admin_email') || 'admin@sreedesigners.com' };
      this.showDashboard();
    } else {
      this.showLogin();
    }
  },

  showLogin() {
    const loginView = document.getElementById('adminLoginView');
    const dashView = document.getElementById('adminDashboardView');
    if (loginView) loginView.style.display = 'block';
    if (dashView) dashView.style.display = 'none';
  },

  showDashboard() {
    const loginView = document.getElementById('adminLoginView');
    const dashView = document.getElementById('adminDashboardView');
    if (loginView) loginView.style.display = 'none';
    if (dashView) dashView.style.display = 'flex';
    const emailEl = document.getElementById('adminUserEmail');
    if (emailEl) emailEl.textContent = this.currentUser?.email || 'admin@sreedesigners.com';
    this.switchTab('showcase');
  },

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail')?.value?.trim();
    const password = document.getElementById('adminPassword')?.value?.trim();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert('❌ Access Denied: ' + (data.error || 'Invalid Email or Password!'));
        return;
      }
      localStorage.setItem('sree_admin_token', data.token);
      localStorage.setItem('sree_admin_email', data.email || email);
      this.currentUser = { email: data.email || email };
      this.showDashboard();
    } catch (err) {
      alert('❌ Authentication error: ' + err.message);
    }
  },

  async handleLogout() {
    if (window.supabase) {
      try {
        await window.supabase.auth.signOut();
      } catch (err) {
        console.warn('Logout warning:', err);
      }
    }
    localStorage.removeItem('sree_admin_logged');
    localStorage.removeItem('sree_admin_email');
    this.currentUser = null;
    this.showLogin();
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.sidebar .nav-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.admin-tab-content').forEach(content => {
      if (content.id === `adminTab-${tabName}`) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });

    if (tabName === 'showcase') this.renderShowcaseManager();
    if (tabName === 'blog') this.renderBlogManager();
    if (tabName === 'testimonials') this.renderTestimonialsManager();
    if (tabName === 'social') this.renderSocialManager();
  },

  async renderShowcaseManager() {
    const container = document.getElementById('adminShowcaseList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading showcase items...</div>';

    // Wait up to 3s for AtelierDataService to be available
    let waited = 0;
    while (!window.AtelierDataService && waited < 3000) {
      await new Promise(r => setTimeout(r, 100));
      waited += 100;
    }

    if (!window.AtelierDataService) {
      container.innerHTML = '<p style="color:#dc2626; text-align:center; padding:20px;">⚠️ Data service failed to load. Please hard-refresh the page (Ctrl+Shift+R).</p>';
      return;
    }

    let items = [];
    try {
      items = await window.AtelierDataService.getShowcaseItems('All');
    } catch(e) {
      console.warn('getShowcaseItems error:', e);
    }

    if (!items || items.length === 0) {
      container.innerHTML = '<p style="color:var(--ink-soft); text-align:center; padding:20px;">No showcase items yet. Click "+ Add New Showcase Item" to publish your first product.</p>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="admin-item-card">
        <img src="${item.main_image_url || 'assets/images/service_bridal.png'}" alt="${item.title}" class="admin-item-thumb" onerror="this.src='assets/images/service_bridal.png'">
        <div class="admin-item-info">
          <h4>${item.title}</h4>
          <div class="admin-item-meta" style="margin-top:4px;">
            <span class="admin-badge">from ₹${item.starting_price || 2500}</span>
            <span style="font-size:0.8rem; color:var(--ink-soft); margin-left:8px;">Tag: ${Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || 'General')}</span>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <a href="product.html?id=${encodeURIComponent(item.id || item.slug)}" target="_blank" class="nav-cta" style="padding:6px 14px; font-size:0.75rem; text-decoration:none;">Preview</a>
          <button class="nav-cta" style="padding:6px 14px; font-size:0.75rem; background:#dc2626; border:none; cursor:pointer;" onclick="AtelierAdmin.deleteShowcase('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  },

  async deleteShowcase(id) {
    if (confirm('Are you sure you want to delete this showcase item?')) {
      await window.AtelierDataService.deleteShowcaseItem(id);
      this.renderShowcaseManager();
    }
  },

  async renderBlogManager() {
    const container = document.getElementById('adminBlogList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading articles...</div>';
    if (!window.AtelierDataService) { container.innerHTML = '<p style="color:var(--ink-soft); text-align:center; padding:20px;">Data service loading...</p>'; return; }

    let posts = [];
    try { posts = await window.AtelierDataService.getBlogPosts(); } catch(e) {}

    if (!posts || posts.length === 0) {
      container.innerHTML = '<p style="color:var(--ink-soft); text-align:center; padding:20px;">No blog articles yet. Click "+ Write New Article" to publish your first post.</p>';
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="admin-item-card">
        <img src="${post.featured_image_url || 'assets/images/service_bridal.png'}" alt="${post.title}" class="admin-item-thumb" onerror="this.src='assets/images/service_bridal.png'">
        <div class="admin-item-info">
          <h4>${post.title}</h4>
          <p class="admin-item-desc" style="font-size:0.82rem; color:var(--ink-soft);">${post.excerpt || ''}</p>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="nav-cta" style="padding:6px 14px; font-size:0.75rem; background:#dc2626; border:none; cursor:pointer;" onclick="AtelierAdmin.deleteBlog('${post.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  },

  async deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog article?')) {
      await window.AtelierDataService.deleteBlogPost(id);
      this.renderBlogManager();
    }
  },

  async renderTestimonialsManager() {
    const container = document.getElementById('adminTestimonialList');
    if (!container) return;
    container.innerHTML = '<div class="admin-loading">Loading testimonials...</div>';
    if (!window.AtelierDataService) { container.innerHTML = '<p style="color:var(--ink-soft); text-align:center; padding:20px;">Data service loading...</p>'; return; }

    let reviews = [];
    try { reviews = await window.AtelierDataService.getTestimonials(); } catch(e) {}
    container.innerHTML = reviews.map(r => `
      <div class="admin-item-card">
        <div class="admin-item-info">
          <h4>${r.customer_name || r.client_name} (${r.location || 'Studio Client'}) — ${'⭐'.repeat(r.rating || 5)}</h4>
          <p class="admin-item-desc" style="font-size:0.85rem; color:var(--ink-soft);">"${r.comment || r.quote}"</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="nav-cta" style="padding:6px 14px; font-size:0.75rem; background:#dc2626; border:none; cursor:pointer;" onclick="AtelierAdmin.deleteTestimonial('${r.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  },

  async deleteTestimonial(id) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await window.AtelierDataService.deleteTestimonial(id);
      this.renderTestimonialsManager();
    }
  },

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AtelierAdmin.init());
} else {
  AtelierAdmin.init();
}
window.AtelierAdmin = AtelierAdmin;
