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

-- =========================================
-- PRODUCTION HARDENING - HIGH IMPACT ITEMS
-- =========================================

-- 2.1 Atomic Slot Reservation (Prevents Overselling)
-- Add constraint to prevent overselling
ALTER TABLE pickup_slots
  ADD CONSTRAINT reserved_le_capacity CHECK (reserved <= capacity);

-- Create atomic reservation RPC function
CREATE OR REPLACE FUNCTION reserve_slot(p_slot UUID, p_qty INT DEFAULT 1)
RETURNS BOOLEAN LANGUAGE PLPGSQL AS $$
BEGIN
  UPDATE pickup_slots
  SET reserved = reserved + p_qty
  WHERE id = p_slot
    AND reserved + p_qty <= capacity;

  IF FOUND THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END $$;

-- Add expiration handling for failed checkouts
ALTER TABLE pickup_slots ADD COLUMN IF NOT EXISTS hold_expires_at TIMESTAMPTZ;
ALTER TABLE pickup_slots ADD COLUMN IF NOT EXISTS held_by_session TEXT;

-- Function to release expired holds
CREATE OR REPLACE FUNCTION release_expired_holds()
RETURNS INTEGER LANGUAGE PLPGSQL AS $$
DECLARE
  rows_affected INTEGER;
BEGIN
  UPDATE pickup_slots
  SET reserved = GREATEST(0, reserved - 1),
      hold_expires_at = NULL,
      held_by_session = NULL
  WHERE hold_expires_at < NOW()
    AND hold_expires_at IS NOT NULL;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected;
END $$;

-- 2.2 Auto-pause + Panic Switch + Manual Overrides
CREATE TABLE IF NOT EXISTS global_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  panic_mode BOOLEAN DEFAULT FALSE,
  auto_pause_threshold INT DEFAULT 8,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default settings
INSERT INTO global_settings (id, panic_mode, auto_pause_threshold)
VALUES (1, FALSE, 8)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS blackout_days (
  day DATE PRIMARY KEY,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

-- 2.3 Webhook Resilience & Reconciliation
CREATE TABLE IF NOT EXISTS stripe_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  raw_payload JSONB
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  stripe_session_id TEXT UNIQUE,
  customer_email TEXT,
  customer_name TEXT,
  pickup_slot_id UUID REFERENCES pickup_slots(id),
  status TEXT CHECK (status IN ('paid','ready','collected','canceled')) DEFAULT 'paid',
  collected_at TIMESTAMPTZ,
  total_cents BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  stripe_price_id TEXT,
  qty INT NOT NULL,
  unit_price_cents BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 Pick/Pack Workflow
-- Add notes field to pickup_slots for staff coordination
ALTER TABLE pickup_slots ADD COLUMN IF NOT EXISTS notes TEXT;

-- 2.5 Roles, Audit Logs & Safety
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('owner','staff')) DEFAULT 'staff',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor TEXT,
  action TEXT,
  entity TEXT,
  entity_id TEXT,
  old_values JSONB,
  new_values JSONB,
  meta JSONB,
  ip_address INET,
  user_agent TEXT,
  ts TIMESTAMPTZ DEFAULT NOW()
);

-- 3.1 Waitlist → Back-in-Stock Pings
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified_at TIMESTAMPTZ,
  UNIQUE(product_id, email)
);

-- Error Monitoring & Logging
CREATE TABLE IF NOT EXISTS error_reports (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  message TEXT NOT NULL,
  stack TEXT,
  url TEXT,
  user_agent TEXT,
  user_id UUID,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  tags JSONB DEFAULT '{}',
  context JSONB,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ
);

-- 8. Small Schema Touches
-- Add soft delete to key tables
ALTER TABLE pickup_slots ADD COLUMN IF NOT EXISTS soft_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE market_events ADD COLUMN IF NOT EXISTS soft_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE links ADD COLUMN IF NOT EXISTS soft_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE seasonal_tasks ADD COLUMN IF NOT EXISTS soft_deleted BOOLEAN DEFAULT FALSE;

-- Add attribution tracking
ALTER TABLE orders ADD COLUMN IF NOT EXISTS source_link_id UUID REFERENCES links(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'retail';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'stripe';

-- Enable RLS on new tables
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blackout_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies (restrictive by default)
CREATE POLICY "Allow read access to global_settings" ON global_settings FOR SELECT USING (true);
CREATE POLICY "Allow owner update to global_settings" ON global_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE email = auth.jwt() ->> 'email' AND role = 'owner')
);

CREATE POLICY "Allow read access to blackout_days" ON blackout_days FOR SELECT USING (true);
CREATE POLICY "Allow owner access to blackout_days" ON blackout_days FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE email = auth.jwt() ->> 'email' AND role = 'owner')
);

CREATE POLICY "Allow authenticated access to orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access to order_items" ON order_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated access to audit_log" ON audit_log FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow system access to audit_log" ON audit_log FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated access to user_roles" ON user_roles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow owner access to user_roles" ON user_roles FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE email = auth.jwt() ->> 'email' AND role = 'owner')
);

CREATE POLICY "Allow public read to waitlist" ON waitlist FOR SELECT USING (true);
CREATE POLICY "Allow public insert to waitlist" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update to waitlist" ON waitlist FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated access to error_reports" ON error_reports FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow system insert to error_reports" ON error_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow owner update to error_reports" ON error_reports FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE email = auth.jwt() ->> 'email' AND role = 'owner')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_airbnb_occupancy_day ON airbnb_occupancy(day);
CREATE INDEX IF NOT EXISTS idx_capacity_rules_weekday ON capacity_rules(weekday);
CREATE INDEX IF NOT EXISTS idx_pickup_slots_day ON pickup_slots(day);
CREATE INDEX IF NOT EXISTS idx_pickup_slots_start_ts ON pickup_slots(start_ts);
CREATE INDEX IF NOT EXISTS idx_pickup_slots_hold_expires ON pickup_slots(hold_expires_at) WHERE hold_expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_market_events_event_date ON market_events(event_date);
CREATE INDEX IF NOT EXISTS idx_market_events_active ON market_events(active);
CREATE INDEX IF NOT EXISTS idx_links_short_slug ON links(short_slug);
CREATE INDEX IF NOT EXISTS idx_links_active ON links(active);
CREATE INDEX IF NOT EXISTS idx_link_hits_link_id ON link_hits(link_id);
CREATE INDEX IF NOT EXISTS idx_link_hits_ts ON link_hits(ts);
CREATE INDEX IF NOT EXISTS idx_seasonal_tasks_completed ON seasonal_tasks(completed);
CREATE INDEX IF NOT EXISTS idx_margin_tracking_date ON margin_tracking(date);
CREATE INDEX IF NOT EXISTS idx_margin_tracking_product_id ON margin_tracking(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_pickup_slot_id ON orders(pickup_slot_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_audit_log_ts ON audit_log(ts DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_product_id ON waitlist(product_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_notified ON waitlist(notified_at) WHERE notified_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_error_reports_timestamp ON error_reports(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_error_reports_severity ON error_reports(severity);
CREATE INDEX IF NOT EXISTS idx_error_reports_resolved ON error_reports(resolved);
