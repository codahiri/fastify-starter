import Fastify from 'fastify';
import fastifyMysql from '@fastify/mysql';
import greetingsController from './controller/greetings-controller.js';
import booksController from './controller/books-controller.js';

const fastify = Fastify({
    logger: true
});

// Database access
fastify.register(fastifyMysql, {
    host: 'localhost',
    user: 'admin',
    password: '654321',
    database: 'bookstore',
    promise: true,
})

// Controllers
fastify.register(greetingsController, { prefix: '/greetings' })
fastify.register(booksController, { prefix: '/books' })

try {
    fastify.listen({ port: 3002 })
} catch (error) {
    fastify.log.error(error);
    process.exit(1)
}
