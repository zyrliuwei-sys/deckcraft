CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`visitor_id` text NOT NULL,
	`user_id` text,
	`event` text NOT NULL,
	`first_source` text DEFAULT '' NOT NULL,
	`first_referrer` text DEFAULT '' NOT NULL,
	`first_utm` text DEFAULT '' NOT NULL,
	`first_country` text DEFAULT '' NOT NULL,
	`build` text DEFAULT '' NOT NULL,
	`experiment` text DEFAULT '' NOT NULL,
	`payment_provider` text,
	`product_id` text,
	`path` text,
	`props` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_event_created` ON `event` (`created_at`,`event`);--> statement-breakpoint
CREATE INDEX `idx_event_visitor` ON `event` (`visitor_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_event_user` ON `event` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `traffic_daily` (
	`id` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`dim` text NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`visits` integer DEFAULT 0 NOT NULL,
	`page_views` integer DEFAULT 0 NOT NULL,
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_traffic_daily_dim_day` ON `traffic_daily` (`dim`,`day`);