CREATE TABLE `entry` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`description` varchar(255) NOT NULL,
	`book_id` int NOT NULL,
	`unit_id` int,
	`category_id` int NOT NULL,
	`amount` int NOT NULL,
	`receipt_number` varchar(255),
	`checked` boolean NOT NULL DEFAULT false,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `entry_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `entry` ADD CONSTRAINT `entry_book_id_book_id_fk` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `entry` ADD CONSTRAINT `entry_unit_id_unit_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `entry` ADD CONSTRAINT `entry_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;