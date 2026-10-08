CREATE TABLE `category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_name_unique` UNIQUE(`name`),
	CONSTRAINT `category_color_unique` UNIQUE(`color`)
);
--> statement-breakpoint
CREATE TABLE `unit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `unit_id` PRIMARY KEY(`id`),
	CONSTRAINT `unit_name_unique` UNIQUE(`name`),
	CONSTRAINT `unit_color_unique` UNIQUE(`color`)
);
