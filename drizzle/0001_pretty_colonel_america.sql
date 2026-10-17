CREATE TABLE `hotel_preview` (
	`id` text PRIMARY KEY NOT NULL,
	`ip_hash` text NOT NULL,
	`device_id` text NOT NULL,
	`user_id` text,
	`status` text NOT NULL,
	`size` text NOT NULL,
	`quality` text DEFAULT 'low' NOT NULL,
	`request_id` text,
	`scene_image_url` text,
	`error` text,
	`task_id` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_hotel_preview_ip` ON `hotel_preview` (`ip_hash`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_hotel_preview_device` ON `hotel_preview` (`device_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_hotel_preview_created` ON `hotel_preview` (`created_at`);