Vue.component('task-list', {
  template: `
		<div class="column">
			<div>
				<article class="media margin_bottom">
					<figure class="media-left">
						<span class="icon is-medium">
							<slot name="icon"></slot>
						</span>	
					</figure>
					<div class="media-content">
						<h1 class="title is-4">
							<slot name="title"></slot>
						</h1>
					</div>
				</article>
				<ul>
					<slot name="tasks"></slot>
					<slot name="input"></input></slot>
				</ul>
			</div>
		</div>`
})

Vue.component('task', {
  props: ['todo'],
  template: `
		<li class="box">
			<article class="media">
				<figure class="media-left" v-on:click="toggleComplete">
					<span class="icon">
						<i v-if="todo.checked" slot="icon" class="fa fa-check" aria-hidden="true"></i>
						<i v-else class="fa fa-times" aria-hidden="true"></i>
					</span>
				</figure>
				<div class="media-content">
					{{ todo.description }}
				</div>
				<div class="media-right">
					<span class="icon" v-on:click="deleteTask">
						<i class="fa fa-times-circle" aria-hidden="true"></i>
					</span>
				</div>
			</article>
		</li>
	`,
  methods: {
    deleteTask () {
      const index = app.tasks.indexOf(this.todo)
      if (index > -1) {
        app.tasks.splice(index, 1)
        app.saveTasksInStorage()
      }
    },
    toggleComplete () {
      this.todo.checked = !this.todo.checked
    }
  }
})

const app = new Vue({
  el: '#app',
  data: function () {
    return {
      newTodo: '',
      tasks: []
    }
  },
  mounted () {
    this.getTasksFromStorage()
  },
  computed: {
    completedTasks () {
      return this.tasks.filter(task => task.checked)
    },
    incompletedTasks () {
      return this.tasks.filter(task => !task.checked)
    }
  },
  methods: {
    addTask () {
      if (this.newTodo === '') return
      this.tasks.push({ description: this.newTodo, checked: false })
      this.newTodo = ''
      this.saveTasksInStorage()
      this.getTasksFromStorage()
    },
    saveTasksInStorage () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    getTasksFromStorage () {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    }
  }
})
