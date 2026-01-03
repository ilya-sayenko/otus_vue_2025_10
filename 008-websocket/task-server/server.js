import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import express from 'express';
import http from 'http';
import cors from 'cors';

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    status: String!
    createdAt: String!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!): Task!
    updateTaskStatus(id: ID!, status: String!): Task!
  }

  type Subscription {
    taskAdded: Task!
    taskUpdated: Task!
  }
`;

let tasks = [
  { id: '1', title: 'Изучить Vue 3', status: 'active', createdAt: new Date().toISOString() },
  { id: '2', title: 'Освоить GraphQL', status: 'completed', createdAt: new Date().toISOString() },
];

class SimplePubSub {

  constructor() {
    this.subscribers = {};
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
    };
  }
}

const pubsub = new SimplePubSub();

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (_, { title }) => {
      const task = {
        id: String(tasks.length + 1),
        title,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      tasks.push(task);

      pubsub.publish('TASK_ADDED', { taskAdded: task });

      return task;
    },

    updateTaskStatus: (_, { id, status }) => {
      const taskIndex = tasks.findIndex(t => t.id === id);
      if (taskIndex === -1) throw new Error('Task not found');

      tasks[taskIndex].status = status;
      const updatedTask = tasks[taskIndex];

      pubsub.publish('TASK_UPDATED', { taskUpdated: updatedTask });

      return updatedTask;
    },
  },

  Subscription: {
    taskAdded: {
      subscribe: () => ({
        [Symbol.asyncIterator]() {
          const channel = 'TASK_ADDED';
          const iterator = {
            async next() {
              return new Promise(resolve => {
                const unsubscribe = pubsub.subscribe(channel, (data) => {
                  resolve({ value: data, done: false });
                  unsubscribe();
                });
              });
            }
          };
          return iterator;
        }
      }),
    },
    taskUpdated: {
      subscribe: () => ({
        [Symbol.asyncIterator]() {
          const channel = 'TASK_UPDATED';
          const iterator = {
            async next() {
              return new Promise(resolve => {
                const unsubscribe = pubsub.subscribe(channel, (data) => {
                  resolve({ value: data, done: false });
                  unsubscribe();
                });
              });
            }
          };
          return iterator;
        }
      }),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Создаем WebSocket сервер
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Обработчик WebSocket соединений
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server),
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer().catch(console.error);