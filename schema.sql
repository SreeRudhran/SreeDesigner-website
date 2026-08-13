-- ============================================================================
-- SREE DESIGNERS & BOUTIQUE — SUPABASE DATABASE SCHEMA & RLS SECURITY POLICIES
-- Execute this entire script in your Supabase SQL Editor (SQL Editor -> New Query)
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SHOWCASE ITEMS (PORTFOLIO / WORK SHOWCASE)
CREATE TABLE IF NOT EXISTS public.showcase_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    starting_price NUMERIC(10,2) DEFAULT 0.00,
    main_image_url TEXT NOT NULL,
    main_image_alt TEXT NOT NULL DEFAULT 'Sree Designers Boutique Craftsmanship',
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SHOWCASE IMAGES (MULTI-IMAGE DETAIL / ZOOM GALLERY)
CREATE TABLE IF NOT EXISTS public.showcase_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    showcase_id UUID NOT NULL REFERENCES public.showcase_items(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL DEFAULT 'Blouse Embroidery Close-up Detail',
    caption TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. DYNAMIC TAGS / CATEGORIES
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SHOWCASE ITEM TAGS (JUNCTION TABLE)
CREATE TABLE IF NOT EXISTS public.showcase_item_tags (
    showcase_id UUID NOT NULL REFERENCES public.showcase_items(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (showcase_id, tag_id)
);

-- 6. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    location TEXT DEFAULT 'Coimbatore',
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    comment TEXT NOT NULL,
    image_url TEXT,
    image_alt TEXT DEFAULT 'Customer Review',
    work_type TEXT DEFAULT 'Bridal Blouse',
    is_published BOOLEAN NOT NULL DEFAULT true,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SOCIAL POSTS / INSTAGRAM REELS
CREATE TABLE IF NOT EXISTS public.social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    caption TEXT,
    instagram_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    thumbnail_alt TEXT DEFAULT 'Instagram Reel Thumbnail',
    media_type TEXT DEFAULT 'reel', -- 'reel', 'video', 'post'
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. BLOG POSTS (ARTICLES & FAQ SCHEMA)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL, -- HTML / Markdown
    featured_image_url TEXT NOT NULL,
    image_alt_text TEXT NOT NULL DEFAULT 'South Indian Fashion Blog',
    category TEXT DEFAULT 'Bridal Fashion',
    author_name TEXT DEFAULT 'Sree Designers Master Artisan',
    read_time_minutes INT DEFAULT 4,
    faq_items JSONB DEFAULT '[]'::jsonb, -- Array of {question: "", answer: ""} for FAQPage Schema
    seo_title TEXT,
    seo_description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE & SPEED
CREATE INDEX IF NOT EXISTS idx_showcase_published ON public.showcase_items(is_published, sort_order DESC);
CREATE INDEX IF NOT EXISTS idx_showcase_images_item ON public.showcase_images(showcase_id, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_published ON public.social_posts(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_published ON public.blog_posts(is_published, published_at DESC);

-- SEED DEFAULT DYNAMIC TAGS
INSERT INTO public.tags (name, slug) VALUES 
('Hand Embroidered Blouses', 'hand-embroidered-blouses'),
('Machine Embroidered Blouse', 'machine-embroidered-blouse'),
('Bridal Blouse & Maggam Work', 'bridal-blouse-maggam-work'),
('Kurtis & Chudidhar', 'kurtis-chudidhar'),
('Lehengas & Festive Couture', 'lehengas-festive-couture'),
('Frocks & Gowns', 'frocks-gowns'),
('Zardozi Work', 'zardozi-work')
ON CONFLICT (name) DO NOTHING;

-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS on all tables
ALTER TABLE public.showcase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_item_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Everyone can read published items)
CREATE POLICY "Public Read Showcase" ON public.showcase_items FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Images" ON public.showcase_images FOR SELECT USING (true);
CREATE POLICY "Public Read Tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Public Read Item Tags" ON public.showcase_item_tags FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Social" ON public.social_posts FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Blog" ON public.blog_posts FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

-- ADMIN ALL ACCESS POLICIES (Only authenticated Supabase admin users can INSERT, UPDATE, DELETE)
CREATE POLICY "Admin All Showcase" ON public.showcase_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Images" ON public.showcase_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Tags" ON public.tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Item Tags" ON public.showcase_item_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Social" ON public.social_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Blog" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- STORAGE BUCKET CONFIGURATION ('portfolio' bucket)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admin Storage Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Storage Update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Storage Delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
