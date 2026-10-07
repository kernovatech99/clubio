CREATE TABLE `book` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `book_id` PRIMARY KEY(`id`),
	CONSTRAINT `book_name_unique` UNIQUE(`name`),
	CONSTRAINT `book_color_unique` UNIQUE(`color`)
);
