<script setup>
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import { createClient } from 'graphql-ws'
import {ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {onMounted, reactive, ref} from "vue";

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  })
)

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

const state = reactive({
  tasks: []
})

const newTaskTitle = ref('')

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      status
      createdAt
    }
  }
`

const TASK_ADDED_SUBSCRIPTION = gql`
  subscription OnTaskAdded {
    taskAdded {
      id
      title
      status
      createdAt
    }
  }
`

const TASK_UPDATED_SUBSCRIPTION = gql`
  subscription OnTaskUpdated {
    taskUpdated {
      id
      title
      status
      createdAt
    }
  }
`

const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      status
      createdAt
    }
  }
`

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($updateTaskStatusId: ID!, $status: String!) {
  updateTaskStatus(id: $updateTaskStatusId, status: $status) {
    id
    title
    status
    createdAt
  }
}`

async function loadTasks() {
  const {data} = await apolloClient.query({
    query: GET_TASKS
  })
  state.tasks = data.tasks
}

function createTask() {
  apolloClient.mutate({
    mutation: CREATE_TASK,
    variables: { title: newTaskTitle.value }
  })
}

function updateTaskStatus(id, status) {
  apolloClient.mutate({
    mutation: UPDATE_TASK_STATUS,
    variables: {
      updateTaskStatusId: id,
      status: status
    }
  })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleString()
}

onMounted(async () => {
  await loadTasks()

  apolloClient.subscribe({
    query: TASK_ADDED_SUBSCRIPTION
  }).subscribe({
    next({ data }) {
      state.tasks = [...state.tasks, data.taskAdded]
    },
    error(err) {
      console.error('Subscription error:', err)
    }
  })

  apolloClient.subscribe({
    query: TASK_UPDATED_SUBSCRIPTION
  }).subscribe({
    next() {
       loadTasks()
    }
  })
})
</script>

<template>
  <div class="container">
    <h1>Task Manager with GraphQL & WebSocket</h1>

    <div class="form-section">
      <input
        v-model="newTaskTitle"
        @keyup.enter="createTask"
        placeholder="Enter task title"
        class="task-input"
      />
      <button @click="createTask" class="btn btn-primary">
        Add Task
      </button>
    </div>

    <div class="tasks-section">
      <h2>Tasks ({{ state.tasks.length }})</h2>
      <div v-if="state.tasks.length === 0" class="no-tasks">
        No tasks yet. Create your first task!
      </div>
      <ul class="tasks-list">
        <li v-for="task in state.tasks" :key="task.id" class="task-item">
          <span :class="['task-title', { completed: task.status === 'completed' }]">
            {{ task.title }}
          </span>
          <span class="task-status">{{ task.status }}</span>
          <span class="task-time">{{ formatTime(task.createdAt) }}</span>
          <button
            @click="updateTaskStatus(task.id, task.status === 'active' ? 'completed' : 'active')"
            class="btn btn-sm"
            :class="{ 'btn-success': task.status !== 'completed', 'btn-secondary': task.status === 'completed' }"
          >
            {{ task.status === 'active' ? 'Complete' : 'Activate' }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
