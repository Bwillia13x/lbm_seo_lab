-- Little Bow Meadows Operations Lab Database Schema
-- Run this in your Supabase SQL editor to set up all tables

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Module 1: Occupancy-Aware Capacity Manager
CREATE TABLE airbnb_occupancy(
  day DATE PRIMARY KEY,
  occupied BOOLEAN NOT NULL DEFAULT FALSE,
  imported_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE capacity_rules(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  weekday SMALLINT NOT NULL CHECK (weekday >= 0 AND weekday <= 6), -- 0=Sun…6=Sat
  base_pickups INT NOT NULL DEFAULT 12,   -- default pickups/day
  occupied_pickups INT NOT NULL DEFAULT 6 -- reduced cap if Airbnb occupied
);

-- Insert default capacity rules (adjust as needed)
INSERT INTO capacity_rules (weekday, base_pickups, occupied_pickups) VALUES
  (0, 8, 4),   -- Sunday
  (1, 12, 6),  -- Monday
  (2, 12, 6),  -- Tuesday
  (3, 12, 6),  -- Wednesday
  (4, 12, 6),  -- Thursday
  (5, 15, 8),  -- Friday
  (6, 15, 8);  -- Saturday

-- Module 2: Pickup Scheduler
CREATE TABLE pickup_windows(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  weekday SMALLINT NOT NULL CHECK (weekday >= 0 AND weekday <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_minutes INT NOT NULL DEFAULT 15,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE pickup_slots(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  day DATE NOT NULL,
  start_ts TIMESTAMPTZ NOT NULL,
  capacity INT NOT NULL,
  reserved INT NOT NULL DEFAULT 0,
  UNIQUE(day, start_ts)
);

-- Insert default pickup windows (adjust times as needed)
INSERT INTO pickup_windows (weekday, start_time, end_time, slot_minutes) VALUES
  (0, '14:00', '17:00', 15),  -- Sunday 2-5pm
  (1, '16:00', '18:00', 15),  -- Monday 4-6pm
  (2, '16:00', '18:00', 15),  -- Tuesday 4-6pm
  (3, '16:00', '18:00', 15),  -- Wednesday 4-6pm
  (4, '16:00', '18:00', 15),  -- Thursday 4-6pm
  (5, '15:00', '19:00', 15),  -- Friday 3-7pm
  (6, '10:00', '16:00', 15);  -- Saturday 10am-4pm

-- Module 3: Market Mode
CREATE TABLE market_events(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT,
  order_deadline TIMESTAMPTZ NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_products(
  event_id UUID REFERENCES market_events(id) ON DELETE CASCADE,
  product_id UUID NOT NULL, -- References your existing products
  limit_per_customer INT DEFAULT 5,
  PRIMARY KEY (event_id, product_id)
);

-- Module 4: Link & QR Campaign Builder
CREATE TABLE links(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  label TEXT NOT NULL,
  target_url TEXT NOT NULL,
  short_slug TEXT UNIQUE NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE link_hits(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  link_id UUID REFERENCES links(id) ON DELETE CASCADE,
  ts TIMESTAMPTZ DEFAULT NOW(),
  ip INET,
  ua TEXT,
  user_agent TEXT GENERATED ALWAYS AS (ua) STORED
);

-- Module 5: Local SEO Command Center
CREATE TABLE seo_checklist(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  category TEXT NOT NULL, -- 'primary_category', 'secondary_categories', 'hours', etc.
  item TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default GBP checklist items
INSERT INTO seo_checklist (category, item, completed) VALUES
  ('primary_category', 'Set primary business category', FALSE),
  ('secondary_categories', 'Add up to 9 secondary categories', FALSE),
  ('hours', 'Set accurate business hours', FALSE),
  ('products', 'List all products and services', FALSE),
  ('photos', 'Upload high-quality photos (10+ minimum)', FALSE),
  ('attributes', 'Add relevant business attributes', FALSE),
  ('description', 'Write compelling business description', FALSE),
  ('website', 'Add website URL', FALSE),
  ('phone', 'Add business phone number', FALSE),
  ('address', 'Verify business address', FALSE);

-- Module 6: Seasonality Planner
CREATE TABLE seasonality_rules(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  product_id UUID NOT NULL, -- References your existing products
  product_name TEXT NOT NULL,
  start_week INT NOT NULL CHECK (start_week >= 1 AND start_week <= 52),
  end_week INT NOT NULL CHECK (end_week >= 1 AND end_week <= 52),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE seasonal_tasks(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  task TEXT NOT NULL,
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Module 7: Ops Copilot (AI Light)
CREATE TABLE weekly_digest_templates(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

-- Insert default digest template
INSERT INTO weekly_digest_templates (name, template) VALUES
  ('Weekly Summary', 'This week''s highlights:\n• Revenue: $[revenue]\n• Orders: [order_count]\n• Top SKU: [top_sku]\n• Occupancy rate: [occupancy_rate]%\n• Next week occupancy: [next_week_occupancy]%');

-- Module 8: Margins & Fees Dashboard
CREATE TABLE margin_tracking(
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  date DATE NOT NULL,
  product_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  units_sold INT NOT NULL DEFAULT 0,
  revenue_cents BIGINT NOT NULL DEFAULT 0,
  cost_cents BIGINT NOT NULL DEFAULT 0,
  stripe_fees_cents BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE airbnb_occupancy ENABLE ROW LEVEL SECURITY;
ALTER TABLE capacity_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_hits ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasonality_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasonal_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_digest_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE margin_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your auth setup)
-- For now, allow all operations (you can restrict these later)
CREATE POLICY "Allow all operations on airbnb_occupancy" ON airbnb_occupancy FOR ALL USING (true);
CREATE POLICY "Allow all operations on capacity_rules" ON capacity_rules FOR ALL USING (true);
CREATE POLICY "Allow all operations on pickup_windows" ON pickup_windows FOR ALL USING (true);
CREATE POLICY "Allow all operations on pickup_slots" ON pickup_slots FOR ALL USING (true);
CREATE POLICY "Allow all operations on market_events" ON market_events FOR ALL USING (true);
CREATE POLICY "Allow all operations on event_products" ON event_products FOR ALL USING (true);
CREATE POLICY "Allow all operations on links" ON links FOR ALL USING (true);
CREATE POLICY "Allow all operations on link_hits" ON link_hits FOR ALL USING (true);
CREATE POLICY "Allow all operations on seo_checklist" ON seo_checklist FOR ALL USING (true);
CREATE POLICY "Allow all operations on seasonality_rules" ON seasonality_rules FOR ALL USING (true);
CREATE POLICY "Allow all operations on seasonal_tasks" ON seasonal_tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations on weekly_digest_templates" ON weekly_digest_templates FOR ALL USING (true);
CREATE POLICY "Allow all operations on margin_tracking" ON margin_tracking FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX idx_airbnb_occupancy_day ON airbnb_occupancy(day);
CREATE INDEX idx_capacity_rules_weekday ON capacity_rules(weekday);
CREATE INDEX idx_pickup_slots_day ON pickup_slots(day);
CREATE INDEX idx_pickup_slots_start_ts ON pickup_slots(start_ts);
CREATE INDEX idx_market_events_event_date ON market_events(event_date);
CREATE INDEX idx_market_events_active ON market_events(active);
CREATE INDEX idx_links_short_slug ON links(short_slug);
CREATE INDEX idx_links_active ON links(active);
CREATE INDEX idx_link_hits_link_id ON link_hits(link_id);
CREATE INDEX idx_link_hits_ts ON link_hits(ts);
CREATE INDEX idx_seasonal_tasks_completed ON seasonal_tasks(completed);
CREATE INDEX idx_margin_tracking_date ON margin_tracking(date);
CREATE INDEX idx_margin_tracking_product_id ON margin_tracking(product_id);
