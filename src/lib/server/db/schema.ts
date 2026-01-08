import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
//  quiz, questions, results, answers -> queiz have questions, results have answers, users have results, asnwers

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export const note = pgTable('note', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	content: text('content').notNull(),
	yt_url: text('yt_url').notNull(),

	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const quiz = pgTable('quiz', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const question = pgTable('question', {
	id: text('id').primaryKey(),
	quizId: text('quiz_id')
		.notNull()
		.references(() => quiz.id),
	question: text('question').notNull(),
	options: text('options').notNull(),
	answer_inx: integer('answer_inx').notNull(), // 0 based index
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const result = pgTable('result', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	quizId: text('quiz_id')
		.notNull()
		.references(() => quiz.id),
	correctAnswers: integer('correct_answers').notNull(),
	totalAnswers: integer('total_answers').notNull(),
	marks: integer('marks').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const answer = pgTable('answer', {
	id: text('id').primaryKey(),
	resultId: text('result_id')
		.notNull()
		.references(() => result.id),
	questionId: text('question_id')
		.notNull()
		.references(() => question.id),
	answer_inx: integer('answer_inx').notNull(), // 0 based index
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
