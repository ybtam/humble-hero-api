CREATE TABLE `heros` (
	`humility_score` integer,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`superpowers` text,
	CONSTRAINT "humility_score_min" CHECK("heros"."humility_score" >= 1),
	CONSTRAINT "humility_score_max" CHECK("heros"."humility_score" <= 10)
);
